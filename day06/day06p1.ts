import * as fs from 'fs'

const filePath = './day06/input.txt'

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split('\n')

  // Test case
  // const lines: string[] = `Time:      7  15   30
  //                          Distance:  9  40  200`
  //   .trim()
  //   .split('\n')

  class Race {
    constructor(
      public time: number,
      public distance: number
    ) {}
  }

  const times = lines[0]
    .split('Time:')[1]
    .trim()
    .split(' ')
    .filter((x) => x !== '')
    .map(Number)
  const distances = lines[1]
    .split('Distance:')[1]
    .trim()
    .split(' ')
    .filter((x) => x !== '')
    .map(Number)

  const races: Race[] = times.map((time, index) => new Race(time, distances[index]))

  let score = 1
  for (let i = 0; i < races.length; i++) {
    const race = races[i]
    let wins = 0
    for (let t = 0; t < race.time; t++) {
      if (t * (race.time - t) > race.distance) {
        wins++
      }
    }

    console.log(`Wins: ${wins}`)
    score = wins * score
  }

  console.log(`Score: ${score}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}
