export default function isValid(value: string, acceptableValues: string[]): boolean {
    if (typeof value !== 'string')
        return false;

    value = value.toLowerCase();
    return acceptableValues.includes(value);
}