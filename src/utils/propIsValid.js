export default function isValid(value, acceptableValues) {
    if (typeof value !== 'string')
        return false

    value = value.toLowerCase()
    return acceptableValues.includes(value)
}
