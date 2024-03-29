const acceptableTypes = ['primary', 'secondary', 'tertiary', 'danger', 'neutral', 'info']
const acceptableSizes = ['small', 'medium', 'large']
const acceptableVariants = ['filled', 'outlined', 'text', 'tonal', 'elevated']

export default {
    accessibilityText: String,
    disabled: {
        type: Boolean,
        default: false
    },
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
        validator: (value) => {
            if (typeof value !== 'string')
                return false
                value = value.toLowerCase()
    
            return acceptableSizes.includes(value)
        }
    },
    type: {
        type: String,
        default: 'primary',
        validator: (value) => {
            if (typeof value !== 'string')
                return false
            value = value.toLowerCase()
    
            return acceptableTypes.indexOf(value) !== -1
        }
    },
    variant: {
        type: String,
        default: 'filled',
        validator: (value) => {
            if (typeof value !== 'string')
                return false
            value = value.toLowerCase()
    
            return acceptableVariants.includes(value)
        }
    }
}
