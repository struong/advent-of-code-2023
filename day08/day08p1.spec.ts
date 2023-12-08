import { Nodes, steps } from "./day08p1"

describe('day 8 maps', () => {
  test('RL should be 2', () => {
    const lines: string[] = `RL

  AAA = (BBB, CCC)
  BBB = (DDD, EEE)
  CCC = (ZZZ, GGG)
  DDD = (DDD, DDD)
  EEE = (EEE, EEE)
  GGG = (GGG, GGG)
  ZZZ = (ZZZ, ZZZ)`
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

    const score = steps('AAA', directions, network, 0)
    expect(score).toBe(2)
  })

  test('LLR should be 6', () => {
    const lines: string[] = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`
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

    const score = steps('AAA', directions, network, 0)
    expect(score).toBe(6)
  })
})
