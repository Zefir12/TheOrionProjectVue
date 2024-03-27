export function getGap(value: string | undefined) {
    if (!value) {
        return "var(--zefir-spacing-md)";
    }
    if (["xs", "sm", "md", "lg", "xl"].includes(value)) {
        return `var(--zefir-spacing-${value})`;
    }
    return value;
}
