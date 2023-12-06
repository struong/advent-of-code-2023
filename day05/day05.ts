import * as fs from 'fs'

const filePath = './day05/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split(/\n\s*\n/)

  // Test case
  // const lines: string[] = `seeds: 79 14 55 13

  // seed-to-soil map:
  // 50 98 2
  // 52 50 48

  // soil-to-fertilizer map:
  // 0 15 37
  // 37 52 2
  // 39 0 15

  // fertilizer-to-water map:
  // 49 53 8
  // 0 11 42
  // 42 0 7
  // 57 7 4

  // water-to-light map:
  // 88 18 7
  // 18 25 70

  // light-to-temperature map:
  // 45 77 23
  // 81 45 19
  // 68 64 13

  // temperature-to-humidity map:
  // 0 69 1
  // 1 0 69

  // humidity-to-location map:
  // 60 56 37
  // 56 93 4`
  //   .trim()
  //   .split(/\n\s*\n/)

  const seedsSection = lines[0]
  const seeds = seedsSection.split('seeds:')[1].trim().split(' ').map(Number)
  const mapSections = lines.slice(1)

  let locations: number[] = []

  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
    let location = seeds[seedIndex]

    for(const mapSection of mapSections) {
      location = transform(mapSection.split(':')[1], location)
    }

    locations.push(location)
  }

  console.log(Math.min(...locations))
} catch (error) {
  console.error(`Error reading file: ${error}`)
}

function transform(section: string, location: number): number {
  const lines = section.split('\r\n').filter((x) => x !== '')

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i]
      .split(' ')
      .filter((x) => x !== '')
      .map((x) => parseInt(x))

    const destination = Number(parts[0])
    const source = Number(parts[1])
    const length = Number(parts[2])

    if (source <= location && source + length > location) {
      location = destination + location - source
      break
    }
  }

  return location
}
