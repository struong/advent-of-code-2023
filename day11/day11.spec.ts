import { Coord } from '../utils/coord'
import { expandUniverse, findEmptyColumns, findEmptyRows, mapExpandedGalaxy, sumShortestPaths } from './day11functions'

describe('Day 10 Pipes', () => {
  const input = `...#......
  .......#..
  #.........
  ..........
  ......#...
  .#........
  .........#
  ..........
  .......#..
  #...#.....`
    .trim()
    .split('\n')
    .map((x) => x.trim())

  it('should find the empty rows', () => {
    const result = findEmptyRows(input)
    expect(result).toEqual([3, 7])
  })

  it('should find the empty columns', () => {
    const result = findEmptyColumns(input)
    expect(result).toEqual([2, 5, 8])
  })

  it('should expand the universe', () => {
    const result = expandUniverse(input).map((x) => x.trim())

    const expected = `....#........
    .........#...
    #............
    .............
    .............
    ........#....
    .#...........
    ............#
    .............
    .............
    .........#...
    #....#.......`
      .trim()
      .split('\n')
      .map((x) => x.trim())

    expect(result).toEqual(expected)
  })

  it('should map an extended galaxy number', () => {
    const result = mapExpandedGalaxy(input)

    const expected = new Map<number, Coord>()

    expected.set(1, { x: 0, y: 4 })
    expected.set(2, { x: 1, y: 9 })
    expected.set(3, { x: 2, y: 0 })
    expected.set(4, { x: 5, y: 8 })
    expected.set(5, { x: 6, y: 1 })
    expected.set(6, { x: 7, y: 12 })
    expected.set(7, { x: 10, y: 9 })
    expected.set(8, { x: 11, y: 0 })
    expected.set(9, { x: 11, y: 5 })

    expect(result).toEqual(expected)
  })

  it('should sum the shortest paths', () => {
    const result = sumShortestPaths(input)
    expect(result).toEqual(374)
  })

  it('should sum the shortest paths for x10', () => {
    const result = sumShortestPaths(input, 9)
    expect(result).toEqual(1030)
  })

  it('should sum the shortest paths for x100', () => {
    const result = sumShortestPaths(input, 99)
    expect(result).toEqual(8410)
  })
})
