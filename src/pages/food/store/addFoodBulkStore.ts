import { FoodInsertItemCombined } from "@/lib/models/Food";
import { supabase } from "@/lib/supabase/supabase/supabase";
import { Tables, TablesInsert } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { addFood } from "@/lib/supabase/services/supabaseFoodService";
import { onBeforeMount, ref, watch } from "vue";
//import { v4 as uuidv4 } from "uuid";
import { TimeShelf } from "@/lib/models/TimeShelfs/TimeShelf";
import { ShelfFoodItem } from "@/lib/models/TimeShelfs/TimeShelf";
import { useDictionaryStore } from "@/stores/dictionaryStore";

export const useAddFoodBulkStore = defineStore("addFoodBulkStore", () => {
    const dictionaryStore = useDictionaryStore();
    const toast = useToast();
    const foodTypes = ref<FoodInsertItemCombined[]>([]);
    const selectedFoodItems = ref<ShelfFoodItem[]>([]);
    const meals = ref([] as Tables<"food_combos">[]);
    const currentTimeShelfId = ref<string>("1");
    const time = ref(new Date(Date.now()));
    const timeShelfs = ref<TimeShelf[]>([{ id: "1", startTime: "00:00", endTime: "04:59", name: "Noc/Świt" }]);
    const query = ref("");

    onBeforeMount(async () => {
        timeShelfs.value = await loadTimeShelfs();
        await createFoodListFromFoodTypes();
        await fetchMeals();
    });

    const createFoodListFromFoodTypes = async () => {
        const types = await dictionaryStore.getFoodTypes();

        types.forEach((item) => {
            foodTypes.value.push(item as unknown as FoodInsertItemCombined);
        });

        foodTypes.value = i as unknown as FoodInsertItemCombined[];
    };

    const loadTimeShelfs = async () => {
        const shelfs = [
            {
                id: "1",
                startTime: "00:00",
                endTime: "04:59",
                name: "Noc/Świt"
            },
            {
                id: "2",
                startTime: "05:00",
                endTime: "09:59",
                name: "Rano"
            },
            {
                id: "3",
                startTime: "10:00",
                endTime: "13:59",
                name: "Południe"
            },
            {
                id: "4",
                startTime: "14:00",
                endTime: "17:59",
                name: "Popołudnie"
            },
            {
                id: "5",
                startTime: "18:00",
                endTime: "21:59",
                name: "Wieczór"
            },
            {
                id: "6",
                startTime: "22:00",
                endTime: "23:59",
                name: "Noc"
            }
        ] as TimeShelf[];
        return shelfs;
    };

    const fetchMeals = async () => {
        const { data, error } = await supabase.from("food_combos").select("*");
        if (error) {
            toast.add({ severity: "error", summary: "Error", detail: JSON.stringify(error) });
        } else {
            if (data) {
                meals.value = data;
            }
        }
    };

    const changeItemShelf = (id: number, shelfId: string) => {
        const item = selectedFoodItems.value.find((i) => i.id == id);
        if (item) {
            item.shelfId = shelfId;
        }
    };

    const helperTime = (startTime: string, endTime: string) => {
        const startHours = Number(startTime.split(":")[0]);
        const endHours = Number(endTime.split(":")[0]);
        const middleHours = Math.floor((startHours + endHours) / 2);

        return `${String(middleHours).padStart(2, "0")}:${"00"}`;
    };

    const getTimeOfIntake = (shelfId: string) => {
        const shelf = timeShelfs.value.find((s) => s.id == shelfId);
        if (!shelf) {
            throw new Error("blad z konwersja czasu");
        }
        return helperTime(shelf.startTime, shelf.endTime);
    };

    const getIntakeAccuracy = (shelfId: string) => {
        const shelf = timeShelfs.value.find((s) => s.id == shelfId);
        if (!shelf) {
            throw new Error("blad z konwersja czasu");
        }
        const startHours = Number(shelf.startTime.split(":")[0]);
        const endHours = Number(shelf.endTime.split(":")[0]);
        const middleHours = Math.ceil((endHours - startHours) / 2);
        return middleHours;
    };

    async function addToDatabase() {
        if (selectedFoodItems.value.length != 0) {
            //const uuid = uuidv4();
            const foodsToAdd = [] as TablesInsert<"food">[];
            selectedFoodItems.value.forEach((food) => {
                foodsToAdd.push({
                    food_amount: food.multiplier * food.option.value,
                    food_id: food.id,
                    intake_time_accuracy: getIntakeAccuracy(food.shelfId),
                    time_of_intake: new Date(time.value.toDateString() + " " + getTimeOfIntake(food.shelfId)).toISOString()
                });
            });
            await addFood(foodsToAdd);
            clearFoods();
            showSuccess();
        }
    }

    function clearFoods() {
        selectedFoodItems.value = [];
    }

    const showSuccess = () => {
        toast.add({ severity: "success", summary: "Succes", detail: "Succesfully added food", life: 3000 });
    };

    watch(query, () => {
        sortFoods();
    });

    const getItemsInShelf = (shelfId: string): ShelfFoodItem[] => {
        const items = selectedFoodItems.value.filter((item) => item.shelfId == shelfId);
        return items;
    };

    const getItemsInCurrentShelf = (): ShelfFoodItem[] => {
        const items = getItemsInShelf(currentTimeShelfId.value);
        return items;
    };

    function selectItem(item: FoodInsertItemCombined) {
        const food = { ...item, shelfId: currentTimeShelfId.value, multiplier: 1, option: { name: "Standard", value: 100 }, food_id: item.id } as unknown as ShelfFoodItem;
        selectedFoodItems.value.push(food);
    }

    const checkForAlreadyAdded = (id: number) => {
        return selectedFoodItems.value.some((i) => i.id == id && i.shelfId == currentTimeShelfId.value);
    };

    function sortFoods() {
        if (query.value !== "") {
            foodTypes.value.sort((a, b) => {
                const includesA = a.name?.toLowerCase().includes(query.value.toLowerCase());
                const includesB = b.name?.toLowerCase().includes(query.value.toLowerCase());

                // Sort based on whether the substring is included
                if (includesA && !includesB) return -1;
                if (!includesA && includesB) return 1;
                return 0; // If both include or both don't include, maintain the order
            });
        } else {
            foodTypes.value.sort((a, b) => a.id - b.id);
        }
    }

    function deselectItem(item: FoodInsertItemCombined) {
        const index = selectedFoodItems.value.findIndex((i) => i.id === item.id);
        if (index != -1) {
            selectedFoodItems.value.splice(index, 1)[0];
        }
    }

    return {
        query,
        foodTypes,
        currentTimeShelfId,
        timeShelfs,
        meals,
        time,
        selectItem,
        clearFoods,
        deselectItem,
        getItemsInShelf,
        getItemsInCurrentShelf,
        addToDatabase,
        changeItemShelf,
        checkForAlreadyAdded
    };
});
