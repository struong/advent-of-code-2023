import * as fs from 'fs'

const filePath = './day08/input.txt'

try {
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

  const score = steps('AAA', directions, network, 0)

  console.log(`Score: ${score}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}

export interface Nodes {
  left: string
  right: string
}

export function steps(startPos: string, direction: string, network: Map<string, Nodes>, currentCount: number): number {
  let currentPos = startPos
  let count = currentCount

  for (let i = 0; i < direction.length; i++) {
    if (currentPos === 'ZZZ') {
      return count
    } else {
      count++

      const nodes = network.get(currentPos)
      if (nodes) {
        if (direction[i] === 'R') {
          currentPos = nodes.right
        } else {
          currentPos = nodes.left
        }
      } else { 
        throw new Error(`No nodes found for ${currentPos}`)
      }
    }
  }

  if(currentPos !== 'ZZZ') {
    return steps(currentPos, direction, network, count)
  } 

  return count
}

// No tail recursion in TS :(
// export function steps(
//   currentPos: string,
//   directionAt: number,
//   originalDirection: string,
//   network: Map<string, Nodes>,
//   count: number
// ): number {
//   if (currentPos === 'ZZZ') {
//     return count
//   } else if (directionAt === originalDirection.length) {
//     // iterated through the original direction, so we repeat
//     return steps(currentPos, 0, originalDirection, network, count)
//   } else {
//     const nodes = network.get(currentPos)
//     if (nodes) {
//       if (originalDirection[directionAt] === 'R') {
//         return steps(nodes.right, directionAt + 1, originalDirection, network, count + 1)
//       } else {
//         return steps(nodes.left, directionAt + 1, originalDirection, network, count + 1)
//       }
//     }
//   }

//   return count
// }
