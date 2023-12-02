import * as fs from 'fs'

const filePath = './day01/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  // const lines: string[] = fileData.split('\n')

  // Test case
  const lines: string[] = `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`
    .trim()
    .split('\n')

  let sum: number = 0

  const numberWordsToDigits = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  }

  for (const line of lines) {
    const numberRegex = /\d|one|two|three|four|five|six|seven|eight|nine/g

    // Find all matches
    const allMatches = line.match(numberRegex)

    if (allMatches) {
      const firstAsDigit: string = numberWordsToDigits[allMatches[0]] || allMatches[0]
      const lastAsDigit: string =
        numberWordsToDigits[allMatches[allMatches.length - 1]] || allMatches[allMatches.length - 1]

      console.log(`values: (${firstAsDigit}, ${lastAsDigit})`)

      sum += parseInt(firstAsDigit + lastAsDigit)
    } else {
      console.log(`No match for line: ${line}`)
    }
  }

  console.log(`Sum: ${sum}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
