import * as fs from 'fs'

const filePath = './day01/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split('\n')

  // Test case
  // const lines: string[] = `two1nine
  //   eightwothree
  //   abcone2threexyz
  //   xtwone3four
  //   4nineeightseven2
  //   zoneight234
  //   7pqrstsixteen`
  //   .trim()
  //   .split('\n')

  let sum: number = 0

  const numberWordsToDigits = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven: 's7n',
    eight: 'e8t',
    nine: 'n9e',
  }

  for (const originalLine of lines) {
    let line = originalLine
    for (const word of Object.keys(numberWordsToDigits)) {
      const regex = new RegExp(word, 'g');
      line = line.replace(regex, numberWordsToDigits[word])
    }

    const firstMatch = /\d/
    const lastNumberRegex = /\d(?=[^\d]*$)/

    const firstNumber = line.match(firstMatch)
    const lastNumber = line.match(lastNumberRegex)

    if (firstNumber && lastNumber) {
      console.log(`firstNumber: ${firstNumber}`)
      console.log(`lastNumber: ${lastNumber}`)

      sum += parseInt(firstNumber[0] + lastNumber[0])
    } else {
      console.log(`No match for line: ${line}`)
    }
  }

  console.log(`Sum: ${sum}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
