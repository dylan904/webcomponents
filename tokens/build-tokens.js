import { registerTransforms } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

const typographyMap = {
  "fontFamily": "font",
  "fontWeight": "weight",
  "lineHeight": "line-height",
  "fontSize": "size",
  "letterSpacing": "tracking",
  "textCase": "text-transform",
  "textDecoration": "text-decoration"
}

const ignoredTokenKeys = [
  'fontSize'
]

registerTransforms(StyleDictionary)

StyleDictionary.registerFormat({
    name: 'custom/kebab-css',
    formatter: ({ dictionary }) => {
      let darkTokens = ''
      let css = ':root {\n\t' + dictionary.allTokens.filter(token => {
        return !dictionary.tokens[token.path[0]].attributes?.ignore || token.path.length > 2
      }).map(token => {
        const attributes = token.attributes
        const origin = attributes.origin

        if (origin?.includes('type')) {
          console.log('checktoken', token)
        }

        let root
        if (origin?.includes('palette'))
          root = 'ref-palette'
        else if (origin?.includes('component') || attributes.category === 'icon')
          root = null
        else if (token.type === 'color') 
          root = 'sys-color'
        else
          root = 'sys'
        
        const ignoredAtRoot = dictionary.tokens[token.path[0]].attributes?.ignore
        const tokenPath = ignoredAtRoot ? token.path.slice(1) : token.path
        if (ignoredTokenKeys.includes(tokenPath[0]))
          return ''

        if (token.type === 'typography') {
          const mappedTypograpy = mapTypography(token.value)
          if (!root) {
            root = origin.includes('typography') || origin.includes('typeface') || origin.includes('typescale') ? 'sys-typescale' : null
          }
          
          return Object.entries(mappedTypograpy).map(([key, value]) => {
            const fullTokenPath = root ? [ 'md', root, ...tokenPath, key] : ['md', ...tokenPath, key]
            console.log('typography', fullTokenPath, value)
            return generateToken(fullTokenPath, value, extractTheme(token))
          }).join('\n\t')
        }

        if (attributes.type?.includes(attributes.category)) {
          tokenPath.shift()
        }

        const fullTokenPath = root ? [ 'md', root, ...tokenPath] : ['md', ...tokenPath]

        if (token.attributes.theme?.dark) {
          darkTokens += '\t' + generateToken(fullTokenPath, 'var(--' + fullTokenPath.join('-') + '-dark)') + '\n'
        }

        return generateTokens(fullTokenPath, token.value, token, dictionary)
      }).join('\n\t') + '\n}'

      console.log('darkTokens', darkTokens)

      // remove empty lines
      const lines = css.split('\n')
      const filteredLines = lines.filter(line => line.trim() !== '')
      return filteredLines.join('\n') + '\n\n[data-theme="dark"] {\n' + darkTokens + '}\n\n@media (prefers-color-scheme: dark) {\n\t:root {\n' + darkTokens.replaceAll('\t', '\t\t') + '\t}\n}'
    }
})

function extractTheme(token, origin) {
  const themeRegex = /^(light|dark)\//
  const match = (origin || token.attributes.origin).match(themeRegex)
  return token.type.toLowerCase() === 'color' && match ? match[1] : null
}

function generateToken(fullTokenPath, value) {
  const propertyName = fullTokenPath.join('-')
  return `--${propertyName}: ${value};`
}

function generateTokens(fullTokenPath, value, token, dictionary) {
  const propertyName = fullTokenPath.join('-')

  if (token.attributes.theme) {
    let rules = `--${propertyName}: ${value};`
    for (const [theme, themeValue] of Object.entries(token.attributes.theme)) {
      console.log('loopit', `--${propertyName}-${theme}: ${themeValue};`)
      rules += `\n\t--${propertyName}-${theme}: ${themeValue};`
    }
    return rules
  }

  const varValue = value.light ? value.light.value : value

  if (token.type.toLowerCase() === 'color' && !token.attributes.origin.includes('palette')) {
      const extractedTokenRef = token.original.value.match(/{(.*)}/)[1].split('.')
      const referencedName = getValue(dictionary.tokens, extractedTokenRef).path.join('-')
      const newValue = referencedName ? `var(--md-sys-color-${referencedName})` : varValue
      return `--${propertyName}: ${newValue};`
  }

  return `--${propertyName}: ${varValue};`
}

StyleDictionary.registerParser({
  pattern: /\.json$/,
  parse: ({ contents }) => {
    const tokens = JSON.parse(contents)
    const processedTokens = removeTopLayerAndAnnotate(tokens)

    return processedTokens
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
            "buildPath": "src/assets/css/",
            "transformGroup": "custom/css", // Use your custom transform group here
            "files": [{
                "destination": "_variables-new.css",
                "format": "custom/kebab-css"
            }]
        }
    }
})

BDSStyleDictionary.buildAllPlatforms()

function removeTopLayerAndAnnotate(data) {
  let result = {}  // Initialize the result as an empty object
  
  // Function to recursively process objects and add attributes
  function process(subData, origin) {
    const newObject = {}

    Object.entries(subData).forEach(([key, value]) => {
      if (origin.startsWith('$')) {
        return // Skip keys that start with '$'
      }
      //console.log('looping', key)

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if ('value' in value) {
          const theme = extractTheme(value, origin)
          
          if (theme) {
            if (!newObject[key]) {
              newObject[key] = {}
            }
            newObject[key] = { ...value, attributes: { origin, theme: {[theme]: value.value} } }
          } else {
            // Process the final object containing a 'value' key
            newObject[key] = { ...value, attributes: { origin } }
          }

          if (key === 'container-color')
            console.log('themeit', theme, key, value, newObject[key])

        } else {
          // Recursive call for nested objects
          if (newObject[key]) {
            // If the key already exists, merge the results
            newObject[key] = {...newObject[key], ...process(value, origin)}
          } else {
            newObject[key] = process(value, origin)
          }
        }
      } else {
        // Handle non-object or terminal values
        newObject[key] = value
      }
    })

    return newObject
  }

  function deepMerge(target, source) {
    // Iterate over all properties in the source object
    Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (source[key]?.attributes?.theme && target[key]?.attributes?.theme) {
            target[key].attributes.theme = { ...target[key].attributes.theme, ...source[key].attributes.theme }
            if (target[key].attributes.theme.light) {
              //console.log('setvalue', key, target[key].attributes.theme.light, target[key].value)
              target[key].value = target[key].attributes.theme.light
              return
            }
          }

            // Ensure the target value is an object to merge into
            if (!target[key]) target[key] = {}
            // Recursively merge the current property
            deepMerge(target[key], source[key])
        } else {
            // Assign the source value to the target
            target[key] = source[key]
        }
    })
    return target
}

  // Process each top-level key and integrate it into the result
  Object.entries(data).forEach(([topKey, contents]) => {
    //console.log('reprocess')
    const processedContents = process(contents, topKey)
    deepMerge(result, processedContents)
  })

  return result
}

function mapTypography(styleObject) {
  const mappedObject = {}

  for (const [key, value] of Object.entries(styleObject)) {
    const newKey = typographyMap[key] // Find the new key from the map

    if (newKey) {
      mappedObject[newKey] = value // Assign the original value to the new key
    } else {
      // If no mapping is found, you could choose to keep the original or discard it
      mappedObject[key] = value // Keeping the original key-value pair
    }
  }

  return mappedObject
}

function getValue(obj, props) {
  let result = obj
  for (let prop of props) {
    if (result[prop] === undefined) {
      return undefined // Return undefined if the property doesn't exist
    }
    result = result[prop]
  }
  return result
}
