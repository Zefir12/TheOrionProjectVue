import { Tables, TablesInsert } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { addFood, deleteFoodsByIds, getFoodsForEditDispaly, updateFood } from "@/lib/supabase/services/supabaseFoodService";
import { onBeforeMount, ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { TimeShelf } from "@/lib/models/TimeShelfs/TimeShelf";
import { useDictionaryStore } from "@/stores/dictionaryStore";
import { FoodAsItemToAdd, MealAsItemToAdd, MealOrFoodItem, Serving } from "@/lib/models/Food";
import { SelectOption } from "@/components/global/Select.vue";
import { FoodHelpers } from "@/common/helpers";

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
    const currentDayLoadedIds = ref<number[]>([]);

    const mealOrFoodItemList = ref<MealOrFoodItem[]>([]);

    const internalIdCounter = ref(0);

    onBeforeMount(async () => {
        timeShelfs.value = await loadTimeShelfs();
        await fetchMealsAndFoods();
        await loadDay();
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

    const loadDay = async () => {
        const baseDate = new Date(time.value);

        // Set to current day at 00:00 (UTC)
        const startDate = new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate() - 1, 24, 0, 0, 0));

        // Set next day at 00:00 (UTC)
        const endDate = new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate(), 24, 0, 0, 0));
        const data = await getFoodsForEditDispaly(startDate, endDate);
        for (const item of data) {
            currentDayLoadedIds.value.push(item.id);
            const foodItem = foodTypes.value.find((f) => f.id == item.food_id) as Tables<"food_types">;

            const intakeDate = new Date(item.time_of_intake as string);
            const intakeHours = intakeDate.getHours();
            const intakeMinutes = intakeDate.getMinutes();
            const intakeTotalMinutes = intakeHours * 60 + intakeMinutes;

            // Find the shelf this intake time falls into
            const matchedShelf = timeShelfs.value.find((shelf) => {
                const [startH, startM] = shelf.startTime.split(":").map(Number);
                const [endH, endM] = shelf.endTime.split(":").map(Number);
                const startMinutes = startH * 60 + startM;
                const endMinutes = endH * 60 + endM;
                return intakeTotalMinutes >= startMinutes && intakeTotalMinutes <= endMinutes;
            });

            const shelfId = matchedShelf?.id || "1"; // fallback to default shelf if no match
            const servings = FoodHelpers.Unstringify(foodItem.servings);
            foodsToAdd.value.push({
                trueId: item.id,
                id: item.food_id,
                internalId: internalIdCounter.value,
                name: foodItem.name as string,
                option: servings ? (servings[1] as Serving) : { name: "Gram", value: 1 },
                shelfId: shelfId,
                multiplier: item.food_amount,
                type: "food",
                servings: servings
            });
            internalIdCounter.value++;
        }
    };
    watch(time, () => {
        clearFoods();
        loadDay();
    });

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

    const getFoodMetadata = (id: number): string => {
        const food = foodTypes.value.find((f) => f.id == id);
        return food?.tags as string;
    };

    const helperTime = (startTime: string, endTime: string) => {
        const startHours = Number(startTime.split(":")[0]);
        const endHours = Number(endTime.split(":")[0]) + 1;
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
        const itemsToInsert: TablesInsert<"food">[] = [];
        const itemsToUpdate: { id: number; updates: Partial<TablesInsert<"food">> }[] = [];

        // Process individual foods
        foodsToAdd.value.forEach((food) => {
            const intakeTime = new Date(time.value.toDateString() + " " + getTimeOfIntake(food.shelfId)).toISOString();
            const commonData = {
                food_amount: food.multiplier * food.option.value,
                food_id: food.id,
                intake_time_accuracy: getIntakeAccuracy(food.shelfId),
                time_of_intake: intakeTime
            };

            if (food.trueId) {
                itemsToUpdate.push({
                    id: food.trueId,
                    updates: commonData
                });
            } else {
                itemsToInsert.push(commonData);
            }
        });

        // Process meals (assuming meals are always new entries)
        mealsToAdd.value.forEach((meal) => {
            const uuid = uuidv4();
            meal.foods.forEach((food) => {
                itemsToInsert.push({
                    food_amount: food.multiplier * food.option.value * meal.multiplier,
                    food_id: food.id,
                    intake_time_accuracy: getIntakeAccuracy(meal.shelfId),
                    time_of_intake: new Date(time.value.toDateString() + " " + getTimeOfIntake(meal.shelfId)).toISOString(),
                    meal_id: uuid
                });
            });
        });

        console.log("Inserting:", itemsToInsert);
        console.log("Updating:", itemsToUpdate);

        // Perform inserts
        await addFood(itemsToInsert);

        // Perform updates
        await Promise.all(itemsToUpdate.map((item) => updateFood(item.id, item.updates)));

        // Get a list of all still-present trueIds (those that were edited or unchanged)
        const remainingIds = foodsToAdd.value.filter((f) => f.trueId).map((f) => f.trueId);

        // Find which IDs were removed
        const deletedIds = currentDayLoadedIds.value.filter((id) => !remainingIds.includes(id));
        console.log("Deletigng:", deletedIds);
        await deleteFoodsByIds(deletedIds);
        showSuccess();
        clearFoods();
        loadDay();
    }

    function clearFoods() {
        currentDayLoadedIds.value = [];
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

    const getTotalsInCurrentShelf = () => {
        const items = getItemsInCurrentShelf();
        let totalKcal = 0;
        let totalCarbs = 0;
        let totalProtein = 0;

        items.forEach((item) => {
            if (item.type === "meal") {
                // item is MealAsItemToAdd, safe to access item.foods
                item.foods.forEach((food) => {
                    const nutrition = foodTypes.value.find((ft) => ft.id === food.id);
                    if (nutrition) {
                        const factor = food.multiplier * (food.option.value / 100);
                        totalKcal += nutrition.kcal * factor;
                        totalProtein += nutrition.protein * factor;
                        totalCarbs += nutrition.carbs * factor;
                    }
                });
            } else if (item.type === "food") {
                // item is FoodAsItemToAdd
                const nutrition = foodTypes.value.find((ft) => ft.id === item.id);
                if (nutrition) {
                    const factor = item.multiplier * (item.option.value / 100);
                    totalKcal += nutrition.kcal * factor;
                    totalProtein += nutrition.protein * factor;
                    totalCarbs += nutrition.carbs * factor;
                }
            }
        });

        return {
            totalKcal: Math.round(totalKcal * 10) / 10,
            totalProtein: Math.round(totalProtein * 10) / 10,
            totalCarbs: Math.round(totalCarbs * 10) / 10
        };
    };

    function selectItem(item: MealOrFoodItem) {
        if (item.type == "food") {
            const food = foodTypes.value.find((f) => f.id == item.id);
            if (food) {
                const servings = FoodHelpers.Unstringify(food.servings);
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
            const foods = meal.content as unknown as { id: number; amount: number; option: SelectOption }[];
            const foodDatas = foods.map((fi) => {
                const food = foodTypes.value.find((f) => f.id == fi.id);
                if (!food) return;
                const servings = FoodHelpers.Unstringify(food.servings);
                const serving = servings.find((s) => s.value == fi.option.value);
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
                foods: foodDatas,
                multiplier: 1
            } as MealAsItemToAdd;
            mealsToAdd.value.push(mealItem);
            internalIdCounter.value++;
        }
    }

    function deselectItem(item: FoodAsItemToAdd | MealAsItemToAdd) {
        if (item.type == "food") {
            const index = foodsToAdd.value.findIndex((i) => i.internalId === item.internalId);
            if (index != -1) {
                foodsToAdd.value.splice(index, 1);
            }
        } else if (item.type == "meal") {
            const index = mealsToAdd.value.findIndex((i) => i.internalId === item.internalId);
            if (index != -1) {
                mealsToAdd.value.splice(index, 1);
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
        getTotalsInCurrentShelf,
        getFoodMetadata,
        getItemsInCurrentShelf,
        addToDatabase,
        changeItemShelf,
        getItemsForQueryList,
        foodsToAdd,
        mealsToAdd
        // checkForAlreadyAdded
    };
});
