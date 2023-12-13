import * as fs from 'fs'
import { sumShortestPaths } from './day11functions'

const filePath = './day11/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData
    .split('\n')
    .filter((x) => x !== '')
    .map((x) => x.trim())

    const sum1 = sumShortestPaths(lines)
    console.log(`Sum of shortest paths for part 1: ${sum1}`)

    const sum2 = sumShortestPaths(lines, 999999)
    console.log(`Sum of shortest paths for part 2: ${sum2}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
