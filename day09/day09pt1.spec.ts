import { nextRow, nextSequence, shouldStop, extrapolateHistory } from "./day09p1"

describe('Day 9 OASIS', () => {
  it('should calculate the next row', () => {
    const input = '0 3 6 9 12 15'.split(' ').map((x) => parseInt(x))
    const result = nextRow(input)
    expect(result).toStrictEqual([3, 3, 3, 3, 3])
  })

  it('should calculate the next sequence from another row', () => {
    const row1 = [0, 3, 6, 9, 12, 15]
    const row2 = [3, 3, 3, 3, 3]
    const result = nextSequence(row1, row2)
    expect(result).toStrictEqual([0, 3, 6, 9, 12, 15, 18])
  })

  it('should calculate the next sequence from another row from 0s', () => {
    const row1 = [3, 3, 3, 3, 3]
    const row2 = [0, 0, 0, 0]
    const result = nextSequence(row1, row2)
    expect(result).toStrictEqual([3, 3, 3, 3, 3, 3])
  })

  it('should stop at zero', () => {
    const input = [0, 3, 6, 9, 12, 15]
    expect(shouldStop(input)).toBe(false)

    const input2 = [0, 0, 0, 0]
    expect(shouldStop(input2)).toBe(true)
  })

  it('should extrapolate and find the history', () => {
    const input = [0, 3, 6, 9, 12, 15]
    expect(extrapolateHistory(input)).toBe(18)

    const input2 = [1, 3, 6, 10, 15, 21]
    expect(extrapolateHistory(input2)).toBe(28)

    const input3 = [10, 13, 16, 21, 30, 45]
    expect(extrapolateHistory(input3)).toBe(68)
  })
})

