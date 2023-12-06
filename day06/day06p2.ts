import * as fs from 'fs'

const filePath = './day06/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  // const lines: string[] = fileData.split('\n')
  
  // Test case
  const lines: string[] = `Time:      44707080
                          Distance:  283113411341491`
    .trim()
    .split('\n')

  const time = lines[0]
    .split('Time:')[1]
    .trim()
    .split(' ')
    .filter((x) => x !== '')
    .map(Number)[0]
  const distance = lines[1]
    .split('Distance:')[1]
    .trim()
    .split(' ')
    .filter((x) => x !== '')
    .map(Number)[0] 

    let wins = 0
    for (let t = 0; t < time; t++) {
      if (t * (time - t) > distance) {
        wins++
      }
    }

    console.log(`Wins: ${wins}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
