import { FoodInsertItemCombined } from "../Food";
import { SelectOption } from "@/components/global/Select.vue";

export interface TimeShelf {
    id: string;
    startTime: string;
    endTime: string;
    name: string;
}

export type ShelfFoodItem = FoodInsertItemCombined & {
    shelfId: string;
    option: SelectOption;
    multiplier: number;
};
