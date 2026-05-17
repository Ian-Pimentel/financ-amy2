export const getDecimalCount = (value: string) => {
    if (value.includes('.') || value.includes(',')) {
        return value.split(/[.,]/)[1]!.length;
    }
    return 0;
}