import * as fs from 'fs'
import { bfs, findStartingPoint } from './day10functions'

const filePath = './day10/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData
    .split('\n')
    .filter((x) => x !== '')
    .map((x) => x.trim())

  const startingPoint = findStartingPoint(lines)
  const score = bfs(lines, startingPoint)
  console.log(`Score: ${score.size() / 2}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
