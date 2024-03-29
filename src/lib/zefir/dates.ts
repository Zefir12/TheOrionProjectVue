import { Tables } from "../supabase/supabase/supabaseSchemas/supaDatabase";

export function getMinMaxDates(dateStrings: Tables<"weight">[]): { minDate: Date | null; maxDate: Date | null } {
    const dateObjects: Date[] = dateStrings.map((dateString) => new Date(dateString.created_at as string));
    // Filter out invalid dates (NaN)
    const validDates = dateObjects.filter((date) => !isNaN(date.getTime()));

    if (validDates.length === 0) {
        return { minDate: null, maxDate: null };
    }

    const minDate = new Date(Math.min(...validDates.map((date) => date.getTime())));
    const maxDate = new Date(Math.max(...validDates.map((date) => date.getTime())));

    return { minDate, maxDate };
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function getAllDatesInRange(minDate: Date, maxDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(minDate);

    while (currentDate <= addDays(maxDate, 1)) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}