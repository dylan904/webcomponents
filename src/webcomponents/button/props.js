const acceptableTypes = ['default', 'primary', 'danger', 'neutral', 'link'];
const acceptableSizes = ['small', 'medium', 'large'];

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
    
            return acceptableSizes.includes(value)
        }
    },
    type: {
        type: String,
        default: 'default',
        validator: (value) => {
            if (typeof value !== 'string')
                return false
    
            return acceptableTypes.indexOf(value) !== -1
        }
    }
}
