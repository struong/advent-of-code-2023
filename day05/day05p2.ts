import * as fs from 'fs'

const filePath = './day05/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split(/\n\s*\n/)

  const seedsSection = lines[0]
  const rangeOfSeeds = seedsSection.split('seeds:')[1].trim().split(' ').map(Number)
  const mapSections = lines.slice(1)

  let minLocation: number = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < rangeOfSeeds.length - 1; i = i + 2) {    
    const length = rangeOfSeeds[i + 1]
    const seed = rangeOfSeeds[i]

    minLocation = Math.min(minLocation, transformRange(seed, length, mapSections))
  }
  console.log(minLocation)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}

function transformRange(start: number, range: number, mapSections: string[]): number {
  let minLocation: number = Number.MAX_SAFE_INTEGER


  let transformResult: TransformResult[][] = []

  for (let i = 0; i < mapSections.length; i++) {
    transformResult.push(transform(mapSections[i].split(':')[1]))
  }

  // for every seed
  for (let i = start; i < start + range; i++) {

    let location = i

    // for every map section
    for (let j = 0; j < transformResult.length; j++) {
      for (let k = 0; k < transformResult[j].length; k++) {
        const destination = transformResult[j][k].destination
        const source = transformResult[j][k].source
        const length = transformResult[j][k].length

        if (source <= location && source + length > location) {
          location = destination + location - source
          break
        }
      }
    }

    minLocation = Math.min(minLocation, location)
  }

  return minLocation
}

interface TransformResult {
  destination: number
  source: number
  length: number
}

function transform(section: string): TransformResult[] {
  const lines = section.split('\r\n').filter((x) => x !== '')

  let transformResult: TransformResult[] = []

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i]
      .split(' ')
      .filter((x) => x !== '')
      .map((x) => parseInt(x))

    const destination = Number(parts[0])
    const source = Number(parts[1])
    const length = Number(parts[2])

    transformResult.push({ destination, source, length })
  }

  return transformResult
}
