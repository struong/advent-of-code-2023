import * as fs from 'fs'

const filePath = './day04/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split('\n')

  // Test case
  // const lines: string[] = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  //                         Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  //                         Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  //                         Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  //                         Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  //                         Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
  //   .trim()
  //   .split('\n')

  // Card ID -> Card copies
  let cards = new Map()

  for (let i = 0; i < lines.length; i++) {
    const currentValue = cards.get(i)
    if (currentValue !== undefined) {
      cards.set(i, currentValue + 1)
    } else {
      cards.set(i, 1)
    }

    const parts = lines[i].split('|')
    const leftPart: string = parts[0].split(':')[1]
    const rightPart: string = parts[1]

    const leftNumbers: number[] | undefined = leftPart.match(/\d+/g)?.map(Number)
    const rightNumbers: number[] | undefined = rightPart.match(/\d+/g)?.map(Number)

    if (leftNumbers && rightNumbers) {
      const intersection = leftNumbers.filter((value) => rightNumbers.includes(value))

      // for each card
      for (let values = 0; values < cards.get(i); values++) {
        // for each point
        for (let j = 1; j <= intersection.length; j++) {
          const currentValue = cards.get(i + j)
          if (currentValue !== undefined) {
            cards.set(i + j, currentValue + 1)
          } else {
            cards.set(i + j, 1)
          }
        }
      }
    } else {
      console.error(`No match for line: ${lines[i]}`)
    }
  }

  const sum = [...cards.values()].reduce((a, b) => a + b, 0)
  console.log(`Score: ${sum}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
