import * as fs from 'fs'
import { extrapolateBackwardsHistory } from './day09p1'

const filePath = './day09/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData
    .split('\n')
    .filter((x) => x !== '')
    .map((x) => x.trim())

  let score = 0

  for (const line of lines) {
    const input = line.split(' ').map((x) => parseInt(x))

    score += extrapolateBackwardsHistory(input)
  }

  console.log(`Score: ${score}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}

export function extrapolateHistory(input: number[]): number {
  let rows: number[][] = []
  rows.push(input)

  let currentRow = input
  while (!shouldStop(currentRow)) {
    const next = nextRow(currentRow)
    rows.push(next)
    currentRow = next
  }

  rows = rows.reverse()

  for (let i = 1; i < rows.length; i++) {
    rows[i] = nextSequence(rows[i], rows[i - 1])
  }

  let lastElement = rows[rows.length - 1][rows[rows.length - 1].length - 1]
  return lastElement
}

export function shouldStop(input: number[]): boolean {
  return input.every((x) => x === 0)
}

export function nextRow(input: number[]): number[] {
  let result: number[] = []
  for (let i = 0; i < input.length - 1; i++) {
    const diff = input[i + 1] - input[i]
    result.push(diff)
  }
  return result
}

export function nextSequence(row1: number[], row2: number[]): number[] {
  let result: number[] = row1

  const next = row2[row2.length - 1] + row1[row1.length - 1]

  result.push(next)
  return result
}
