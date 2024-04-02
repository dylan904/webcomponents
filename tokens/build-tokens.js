import { registerTransforms } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

registerTransforms(StyleDictionary)

StyleDictionary.registerFormat({
    name: 'custom/kebab-css',
    formatter: ({ dictionary }) => {
      return ':root {\n\t' + dictionary.allTokens.filter(token => {
        return !dictionary.tokens[token.path[0]].attributes?.ignore || token.path.length > 2
      }).map(token => {
        let root = token.attributes?.root
        if (!root) {
          root = token.path[0] === 'palette' ? 'ref' : null;
        }

        const ignoredAtRoot = dictionary.tokens[token.path[0]].attributes?.ignore
        const tokenPath = ignoredAtRoot ? token.path.slice(1) : token.path
        const fullTokenPath = root ? [ 'md', root, ...tokenPath] : ['md', ...tokenPath]
        const propertyName = fullTokenPath.join('-')
        return `--${propertyName}: ${token.value};`
      }).join('\n\t') + '\n}'
    }
})

StyleDictionary.registerTransform({
    name: 'name/cti/kebab',
    type: 'name',
    transformer: prop => prop.path.join('-')
})

StyleDictionary.registerTransformGroup({
    name: 'custom/css',
    transforms: ['attribute/cti', 'name/cti/kebab', 'color/css', 'size/px', 'ts/size/px', 'color/hex']
})


const BDSStyleDictionary = StyleDictionary.extend({
    "source": [
        "tokens/studio.json"
    ],
    "platforms": {
        "css": {
            "buildPath": "tokens/build/css/",
            "transformGroup": "custom/css", // Use your custom transform group here
            "files": [{
                "destination": "_variables.css",
                "format": "custom/kebab-css"
            }]
        }
    }
})

BDSStyleDictionary.buildAllPlatforms()
