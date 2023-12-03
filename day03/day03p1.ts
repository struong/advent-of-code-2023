import * as fs from 'fs'

const filePath = './day03/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split('\n')

  // Test case
  // const lines: string[] = `467..114..
  //                          ...*......
  //                          ..35..633.
  //                          ......#...
  //                          617*......
  //                          .....+.58.
  //                          ..592.....
  //                          ......755.
  //                          ...$.*....
  //                          .664.598..`
  //   .split('\n')
  //   .map(line => line.trim())

  let sum = 0
  let row = 0

  class IndexRange {
    start: number
    end: number
    line: number
    value: string

    constructor(start: number, end: number, line: number, value: string) {
      this.start = start
      this.end = end
      this.line = line
      this.value = value
    }

    isTouching(other: IndexRange) {
      // is left
      if (this.line === other.line && this.start === other.end + 1) {
        return true
      }

      // is right
      if (this.line === other.line && this.end === other.start - 1) {
        return true
      }

      // is above
      if (this.line === other.line + 1 && this.start <= other.end && this.end >= other.start) {
        return true
      }

      // is below
      if (this.line === other.line - 1 && this.start <= other.end && this.end >= other.start) {
        return true
      }

      // is north east
      if (this.line === other.line + 1 && this.end === other.start - 1) {
        return true
      }

      // is north west
      if (this.line === other.line + 1 && this.start === other.end + 1) {
        return true
      }

      // is south east
      if (this.line === other.line - 1 && this.end === other.start - 1) {
        return true
      }

      // is south west
      if (this.line === other.line - 1 && this.start === other.end + 1) {
        return true
      }

      return false
    }
  }

  let numberRanges: IndexRange[] = []
  let symbolRanges: IndexRange[] = []

  for (const line of lines) {
    const numberMatches = Array.from(line.matchAll(/\d+/g))

    numberMatches.forEach((match) => {
      if (match.index !== undefined) {
        numberRanges.push(new IndexRange(match.index, match.index + match[0].length - 1, row, match[0]))
      }
    })

    const symbolMatches = Array.from(line.matchAll(/[^0-9.]/g))

    symbolMatches.forEach((match) => {
      if (match.index !== undefined) {
        symbolRanges.push(new IndexRange(match.index, match.index + match[0].length - 1, row, match[0]))
      }
    })

    row++
  }

  symbolRanges.map((symbolRange) => {
    numberRanges.map((numberRange) => {
      if (symbolRange.isTouching(numberRange)) {
        sum += parseInt(numberRange.value)
      }
    })
  })

  console.log(`score: ${sum}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
