import * as fs from 'fs'

const filePath = './day05/input.txt'

const parseNumbers = (str: string) =>
  str
    .split(' ')
    .filter((x) => x !== '')
    .map((x) => parseInt(x))
const groupNumbers = (numbers: number[], grouping: number): number[][] =>
  Array.from({ length: numbers.length / grouping }, (_, i) => numbers.slice(i * grouping, i * grouping + grouping))
const input = fs
  .readFileSync(filePath, { encoding: 'utf8' })
  .replaceAll(/\r\n(\d)/g, ' $1')
  .split('\r\n')
  .filter((x) => x !== '')
  .map((x) => parseNumbers(x.split(':')[1]))
const seeds = input[0]
const almanac = input.slice(1).map((x) => groupNumbers(x, 3))

function getSeedLocation(step: number): number {
  for (const almanacEntry of almanac) {
    for (const [destination, source, length] of almanacEntry) {
      console.log(`step: ${step}, destination: ${destination}, source: ${source}, length: ${length}`)
      if (source <= step && source + length > step) {
        console.log('***new step', destination + step - source)
        step = destination + step - source
        break
      }
    }
  }

  return step
}

console.log('Part 1', Math.min(...seeds.map((x) => getSeedLocation(x))))
