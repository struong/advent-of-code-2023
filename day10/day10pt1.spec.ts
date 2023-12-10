import { Point, PointsSet, bfs, findStartingPoint } from './day10functions'

describe('Day 10 Pipes', () => {
  it('find S', () => {
    const input = `.....
.S-7.
.|.|.
.L-J.
.....`
      .trim()
      .split('\n')

    const startingPoint: Point = findStartingPoint(input)

    expect(startingPoint).toEqual({ x: 1, y: 1 })
  })

  it('bfs - flood fill', () => {
    const input = `..F7.
    .FJ|.
    SJ.L7
    |F--J
    LJ...`
      .trim()
      .split('\n')
      .map((line) => line.trim())
    const startingPoint: Point = findStartingPoint(input)

    const result = bfs(input, startingPoint)
    expect(result.size() / 2).toBe(8)
  })
})
