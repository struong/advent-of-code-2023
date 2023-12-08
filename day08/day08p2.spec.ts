import { Nodes } from "./day08p1"
import { ghostSteps } from "./day08p2"

describe('day 8 maps with ghosts', () => {
  test('RL should be 6', () => {
    const lines: string[] = `LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`
      .trim()
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
    expect(score).toBe(6)
  })
})
