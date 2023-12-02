import * as fs from 'fs'

const filePath = './day01/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split('\n')

  // Test case
  //   const lines: string[] = `1abc2
  //                         pqr3stu8vwx
  //                         a1b2c3d4e5f
  //                         treb7uchet`
  //     .trim()
  //     .split('\n')

  let sum: number = 0

  for (const line of lines) {
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
