import propIsValid from '../../utils/propIsValid.ts';

enum ButtonType {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    Danger = 'danger',
    Neutral = 'neutral',
    Info = 'info',
}

enum ButtonSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

enum ButtonVariant {
    Filled = 'filled',
    Outlined = 'outlined',
    Text = 'text',
    Tonal = 'tonal',
    Elevated = 'elevated',
}

enum IconPosition {
    Leading = 'leading',
    Trailing = 'trailing',
}

const propSpecs = {
    accessibilityText: String,
    disabled: Boolean,
    faIcon: Array as () => Array<string>,
    icon: String,
    iconPosition: {
        type: String as () => IconPosition,
        default: IconPosition.Leading,
        validator: (value: any) => propIsValid(value, Object.values(IconPosition)),
    },
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: 'Button',
    },
    size: {
        type: String as () => ButtonSize,
        default: ButtonSize.Medium,
        validator: (value: any) => propIsValid(value, Object.values(ButtonSize)),
    },
    type: {
        type: String as () => ButtonType,
        default: ButtonType.Primary,
        validator: (value: any) => propIsValid(value, Object.values(ButtonType)),
    },
    variant: {
        type: String as () => ButtonVariant,
        default: ButtonVariant.Filled,
        validator: (value: any) => propIsValid(value, Object.values(ButtonVariant)),
    },
};

export default propSpecs;