import * as sass from 'sass'
import { glob } from 'glob';
import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

const srcDir = './src/webcomponents'
const files = await glob(`${srcDir}/**/css/*.scss`)

files.forEach(async (file) => {
    const outputFilePath = file.replace(/\.scss$/, '.css').replace('/css/', '/css/build/')
    try {
      await mkdir(dirname(outputFilePath), { recursive: true })
      const result = sass.compile(file)
      await writeFile(outputFilePath, result.css)
      console.log(`Compiled ${file} to ${outputFilePath}`)
    } catch (error) {
      console.error('Error processing file:', file, error)
    }
})
