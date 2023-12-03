import * as fs from 'fs'

const filePath = './day02/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split('\n')

  // Test case
  // const lines: string[] = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  //                     Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  //                     Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  //                     Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  //                     Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
  //   .split('\n')
  //   .map(line => line.trim())

  let score = 0

  for (const line of lines) {
    let parts = line.split(':');
    const index = (parts[0].split(' ')[1])
    const cubes = parts[1].split(/[,;]/).map(cube => cube.trim());

    let maxRed = 1
    let maxGreen = 1
    let maxBlue = 1

    for (const cube of cubes) {
      const cubesDrawn = parseInt(cube.split(' ')[0])
      if (cube.includes('red')) {
        maxRed = Math.max(maxRed, cubesDrawn)
      } else if (cube.includes('green')) {
        maxGreen = Math.max(maxGreen, cubesDrawn)
      } else if (cube.includes('blue')) {
        maxBlue = Math.max(maxBlue, cubesDrawn)
      }
    }

    score += maxRed * maxGreen * maxBlue
  }

  console.log(`score: ${score}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
