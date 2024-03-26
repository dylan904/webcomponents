import { LitElement } from 'lit'

class LitBeelineElement extends LitElement {
    // Default attribute prop to false
    // static get properties() {
    //     const props = {};
    //     Object.entries(super.properties || {}).forEach(([propName, propConfig]) => {
    //         // Set the attribute option to false if it's not explicitly set
    //         props[propName] = typeof propConfig === 'object' ? { attribute: false, ...propConfig } : { attribute: false };
    //     });
    //     return props;
    // }
      
    $emit(name, value) {
        this.dispatchEvent(new CustomEvent(name, {
            detail: { value },
            bubbles: true, // Allows the event to bubble up through the DOM
            composed: true // Allows the event to cross Shadow DOM boundary
        }));
    }

    $nextTick(callback) {
        if (typeof callback !== 'function') {
          throw new Error('The callback provided is not a function.');
        }
        
        this.updateComplete.then(() => {
          queueMicrotask(callback)
        });
    }

    // get inheritedClassData() {
    //     return this.class.split(' ').reduce((accumulator, currentValue) => {
    //         const formattedValue = currentValue.trim();
    //         if (formattedValue)
    //             accumulator[formattedValue] = true; 
    //         return accumulator;
    //     }, {});
    // }

    processClasses(classes) {
        if (classes instanceof Array) {
            return classes
            .filter(value => value.length) // Filter out blank values
            .join(' ');
        }
        else if (typeof classes === 'object') {
            return Object.entries(classes)
              .filter(([, condition]) => condition) // Keep only classes with truthy conditions
              .map(([className]) => className) // Extract the class names
              .join(' '); // Join them into a single string
        }
        else if (typeof classes === 'string') {
            return classes
        }
        else {
            console.warn('Invalid classes provided: ', classes)
        }
    }

    constructor() {
        super()

        const propSpecs = this.constructor.properties;
        if (propSpecs) {
            // Loop through the properties and set the default values
            Object.keys(propSpecs).forEach((key, value) => {
                const propDef = propSpecs[key]
                if ('default' in propDef) {
                    console.log('try set default', {key, propDef, value: this[key]})
                    this[key] = typeof propDef.default === 'function' ? propDef.default() : propDef.default
                }
                if (!value) {
                    this.removeAttribute(key);
                }
            })
        }
    }
}

window.LitBeelineElement = LitBeelineElement

// window.customElements.define('lit-beeline-element', LitBeelineElement)
