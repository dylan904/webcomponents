import propIsValid from '../../utils/propIsValid'

const validTypes = ['primary', 'secondary', 'tertiary', 'danger', 'neutral', 'info']
const validSizes = ['small', 'medium', 'large']
const validVariants = ['filled', 'outlined', 'text', 'tonal', 'elevated']

export default {
    accessibilityText: String,
    disabled: Boolean,
    faIcon: Array,
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: 'Button'
    },
    size: {
        type: String,
        default: 'medium',
        validator: (value) => propIsValid(value, validSizes)
    },
    type: {
        type: String,
        default: 'primary',
        validator: (value) => propIsValid(value, validTypes)
    },
    variant: {
        type: String,
        default: 'filled',
        validator: (value) => propIsValid(value, validVariants)
    }
}
