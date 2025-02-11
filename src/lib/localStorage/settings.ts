const setItem = (name: string, item: unknown): void => {
    if (typeof globalThis.window === "undefined") return;
    globalThis.localStorage.setItem(name, JSON.stringify(item));
};
const getItem = (name: string): string | null => {
    if (typeof globalThis.window === "undefined") return null;
    return globalThis.localStorage.getItem(name);
};

const removeItem = (name: string): void => {
    if (typeof globalThis.window === "undefined") return;
    globalThis.localStorage.removeItem(name);
};

export interface FitbitAuthCodes {
    state: string;
    codeVerifier: string;
    codeChallenge: string;
}

export const setFitbitAuthCodes = (data: FitbitAuthCodes): void => {
    setItem("fitbitAuthCodes", data);
};

export const clearFitbitAuthCodes = (): void => {
    removeItem("fitbitAuthCodes");
};

export const getFitbitAuthCodes = (): FitbitAuthCodes | null => {
    const data = getItem("fitbitAuthCodes");
    if (!data) return null;
    return JSON.parse(data) as FitbitAuthCodes;
};

export const setFitbitTokenData = (data: string): void => {
    setItem("fitbitTokenData", data);
};

export const getFitbitTokenData = (): string => {
    return getItem("fitbitTokenData") as string;
};

export const getSidebarVisible = (): boolean => {
    const data = getItem("sidebarVisible");
    return data === "true";
};

export const setSidebarVisible = (value: boolean): void => {
    setItem("sidebarVisible", value);
};

export const getPage = (): string | null => {
    const data = getItem("page");
    if (data) return JSON.parse(data);
    else {
        return null;
    }
};
