import { Tables, TablesInsert } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { addFood } from "@/lib/supabase/services/supabaseFoodService";
import { onBeforeMount, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { TimeShelf } from "@/lib/models/TimeShelfs/TimeShelf";
import { useDictionaryStore } from "@/stores/dictionaryStore";
import { FoodAsItemToAdd, MealAsItemToAdd, MealOrFoodItem, Serving } from "@/lib/models/Food";
import { SelectOption } from "@/components/global/Select.vue";

export const useAddFoodBulkStore = defineStore("addFoodBulkStore", () => {
    const dictionaryStore = useDictionaryStore();
    const toast = useToast();
    const meals = ref([] as Tables<"food_combos">[]);
    const currentTimeShelfId = ref<string>("1");
    const time = ref(new Date(Date.now()));
    const timeShelfs = ref<TimeShelf[]>([{ id: "1", startTime: "00:00", endTime: "04:59", name: "Noc/Świt" }]);
    const query = ref("");

    const foodTypes = ref<Tables<"food_types">[]>([]);
    const mealTypes = ref<Tables<"food_combos">[]>([]);

    const foodsToAdd = ref<FoodAsItemToAdd[]>([]);
    const mealsToAdd = ref<MealAsItemToAdd[]>([]);

    const mealOrFoodItemList = ref<MealOrFoodItem[]>([]);

    const internalIdCounter = ref(0);

    onBeforeMount(async () => {
        timeShelfs.value = await loadTimeShelfs();
        await fetchMealsAndFoods();
    });

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

    const fetchMealsAndFoods = async () => {
        foodTypes.value = await dictionaryStore.getFoodTypes();
        mealTypes.value = await dictionaryStore.getMealTypes();

        foodTypes.value.forEach((f) => {
            mealOrFoodItemList.value.push({ id: f.id, name: f.name as string, type: "food" });
        });
        mealTypes.value.forEach((m) => {
            mealOrFoodItemList.value.push({ id: m.id, name: m.name as string, type: "meal" });
        });
    };

    const changeItemShelf = (id: number, type: "food" | "meal", shelfId: string) => {
        if (type == "food") {
            const food = foodsToAdd.value.find((f) => f.internalId == id);
            if (!food) return;
            food.shelfId = shelfId;
        } else if (type == "meal") {
            const meal = mealsToAdd.value.find((f) => f.internalId == id);
            if (!meal) return;
            meal.shelfId = shelfId;
        }
    };

    const getItemsForQueryList = () => {
        return mealOrFoodItemList.value;
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
        if (foodsToAdd.value.length != 0 || mealsToAdd.value.length != 0) {
            const items = [] as TablesInsert<"food">[];
            foodsToAdd.value.forEach((food) => {
                items.push({
                    food_amount: food.multiplier * food.option.value,
                    food_id: food.id,
                    intake_time_accuracy: getIntakeAccuracy(food.shelfId),
                    time_of_intake: new Date(time.value.toDateString() + " " + getTimeOfIntake(food.shelfId)).toISOString()
                });
            });
            mealsToAdd.value.forEach((meal) => {
                const uuid = uuidv4();
                meal.foods.forEach((food) => {
                    items.push({
                        food_amount: food.multiplier * food.option.value,
                        food_id: food.id,
                        intake_time_accuracy: getIntakeAccuracy(meal.shelfId),
                        time_of_intake: new Date(time.value.toDateString() + " " + getTimeOfIntake(meal.shelfId)).toISOString(),
                        meal_id: uuid
                    });
                });
            });
            console.log(items);
            await addFood(items);
            clearFoods();
            showSuccess();
        }
    }

    function clearFoods() {
        foodsToAdd.value = [];
        mealsToAdd.value = [];
    }

    const showSuccess = () => {
        toast.add({ severity: "success", summary: "Succes", detail: "Succesfully added food", life: 3000 });
    };

    // watch(query, () => {
    //     sortFoods();
    // });

    const getItemsInShelf = (shelfId: string): (FoodAsItemToAdd | MealAsItemToAdd)[] => {
        const foods = foodsToAdd.value.filter((item) => item.shelfId == shelfId);
        const meals = mealsToAdd.value.filter((item) => item.shelfId == shelfId);
        return [foods, meals].flat(1);
    };

    const getItemsInCurrentShelf = (): (FoodAsItemToAdd | MealAsItemToAdd)[] => {
        const items = getItemsInShelf(currentTimeShelfId.value);
        return items;
    };

    function unstringify(data: string | null): SelectOption[] {
        if (data) {
            return JSON.parse(data);
        }
        return [
            { name: "Standard", value: 100 },
            { name: "Gram", value: 1 }
        ];
    }

    function selectItem(item: MealOrFoodItem) {
        if (item.type == "food") {
            const food = foodTypes.value.find((f) => f.id == item.id);
            if (food) {
                const servings = unstringify(food.servings);
                const foodItem = {
                    id: food.id,
                    internalId: internalIdCounter.value,
                    name: food.name as string,
                    option: servings[0] as Serving,
                    shelfId: currentTimeShelfId.value,
                    multiplier: 1,
                    type: "food",
                    servings: servings
                } as FoodAsItemToAdd;
                foodsToAdd.value.push(foodItem);
                internalIdCounter.value++;
            }
        } else if (item.type == "meal") {
            const meal = mealTypes.value.find((m) => m.id == item.id);
            if (!meal) return;
            const foods = meal.content as { id: number; amount: number; option: number }[];
            const foodDatas = foods.map((fi) => {
                const food = foodTypes.value.find((f) => f.id == fi.id);
                if (!food) return;
                const servings = unstringify(food.servings);
                const serving = servings.find((s) => s.value == fi.option);
                return {
                    id: food.id,
                    internalId: 0,
                    name: food.name as string,
                    option: serving as Serving,
                    shelfId: currentTimeShelfId.value,
                    multiplier: fi.amount,
                    type: "food",
                    servings: servings
                } as FoodAsItemToAdd;
            });
            const mealItem = {
                id: meal.id,
                internalId: internalIdCounter.value,
                name: meal.name as string,
                shelfId: currentTimeShelfId.value,
                type: "meal",
                foods: foodDatas
            } as MealAsItemToAdd;
            mealsToAdd.value.push(mealItem);
            internalIdCounter.value++;
        }
    }

    // const checkForAlreadyAdded = (id: number) => {
    //     return selectedFoodItems.value.some((i) => i.id == id && i.shelfId == currentTimeShelfId.value);
    // };

    // function sortFoods() {
    //     if (query.value !== "") {
    //         foodTypes.value.sort((a, b) => {
    //             const includesA = a.name?.toLowerCase().includes(query.value.toLowerCase());
    //             const includesB = b.name?.toLowerCase().includes(query.value.toLowerCase());

    //             // Sort based on whether the substring is included
    //             if (includesA && !includesB) return -1;
    //             if (!includesA && includesB) return 1;
    //             return 0; // If both include or both don't include, maintain the order
    //         });
    //     } else {
    //         foodTypes.value.sort((a, b) => a.id - b.id);
    //     }
    // }

    function deselectItem(item: FoodAsItemToAdd | MealAsItemToAdd) {
        if (item.type == "food") {
            const index = foodsToAdd.value.findIndex((i) => i.internalId === item.internalId);
            if (index != -1) {
                foodsToAdd.value.splice(index, 1)[0];
            }
        } else if (item.type == "meal") {
            const index = mealsToAdd.value.findIndex((i) => i.internalId === item.internalId);
            if (index != -1) {
                mealsToAdd.value.splice(index, 1)[0];
            }
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
        getItemsForQueryList,
        foodsToAdd,
        mealsToAdd
        // checkForAlreadyAdded
    };
});
