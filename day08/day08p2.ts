import * as fs from 'fs'
import { Nodes } from './day08p1'
import { lcm } from '../utils/algorithms'

function solve() {
  const filePath = './day08/input.txt'

  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData
    .split('\n')
    .filter((x) => x !== '')
    .map((x) => x.trim())

  const directions = lines[0]

  let network = new Map<string, Nodes>()

  for (const line of lines.slice(1)) {
    const parts = line.split(' = ')
    const key = parts[0]

    let nodesMatch = parts[1].match(/\((.*), (.*)\)/)

    if (nodesMatch) {
      const node: Nodes = {
        left: nodesMatch[1],
        right: nodesMatch[2],
      }

      network.set(key, node)
    }
  }

  const score = ghostSteps(directions, network)

  console.log(`Score: ${score}`)
}

export function ghostSteps(directions: string, network: Map<string, Nodes>): number {
  let results: number[] = []
  const startingPosition = startingPositions(network)

  for (const position of startingPosition) {
    let currentPosition = position

    let count = 0

    while (currentPosition[2] !== 'Z') {
      const direction = directions[count % directions.length]
      const nodes = network.get(currentPosition)
      if (nodes) {
        if (direction === 'R') {
          currentPosition = nodes.right
        } else {
          currentPosition = nodes.left
        }
      } else {
        throw new Error(`No nodes found for ${currentPosition}`)
      }

      count++
    }

    results.push(count)
  }

  return [...new Set(results)].reduce(lcm)
}

export function startingPositions(network: Map<string, Nodes>): string[] {
  return [...network.keys()].filter((x) => x[2] === 'A')
}

solve()