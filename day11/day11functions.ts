import { Coord, shortestPath } from '../utils/coord'

export function sumShortestPaths(input: string[], expansionFactor = 1): number {
  const expandedGalaxy = mapExpandedGalaxy(input, expansionFactor)
  let sum = 0
  let values = Array.from(expandedGalaxy.values())

  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      sum += shortestPath(values[i], values[j])
    }
  }

  return sum
}

export function mapExpandedGalaxy(input: string[], expansionFactor = 1): Map<number, Coord> {
  let map = new Map<number, Coord>()
  let counter = 1
  // const expandedUniverse = expandUniverse(input, expansionFactor)

  const emptyRows = findEmptyRows(input)
  const emptyColumns = findEmptyColumns(input)

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === '#') {
        const leftColumns = emptyRows.filter((x) => x < i).length
        const aboveRows = emptyColumns.filter((x) => x < j).length
        const x = i + leftColumns * expansionFactor
        const y = j + aboveRows * expansionFactor
        map.set(counter, { x: x, y: y })
        counter++
      }
    }
  }

  return map
}

export function findEmptyColumns(input: string[]) {
  let transposed = input[0].split('').map((_, i) => input.map((row) => row[i]).join(''))
  return findEmptyRows(transposed)
}

export function findEmptyRows(lines: string[]): number[] {
  let emptyRows: number[] = []

  for (let i = 0; i < lines.length; i++) {
    if (hasNoGalaxies(lines[i])) emptyRows.push(i)
  }

  return emptyRows
}

function hasNoGalaxies(input): boolean {
  return input.split('').every((char) => char === '.')
}

export function expandUniverse(input: string[], expansionFactor = 1) {
  let newInput = [...input]
  let emptyRows = findEmptyRows(input)

  for (let i = 0; i < emptyRows.length; i++) {
    const emptyRowPos = emptyRows[i]
    for (let j = 0; j < expansionFactor; j++) {
      newInput.splice(emptyRowPos + i * expansionFactor, 0, input[emptyRowPos])
    }
  }

  let emptyColumns = findEmptyColumns(newInput)

  for (let i = 0; i < emptyColumns.length; i++) {
    const emptyColumnPos = emptyColumns[i]
    for (let j = 0; j < expansionFactor; j++) {
      newInput = newInput.map(
        (row) =>
          row.slice(0, emptyColumnPos + i * expansionFactor) + '.' + row.slice(emptyColumnPos + i * expansionFactor)
      )
    }
  }

  return newInput
}
