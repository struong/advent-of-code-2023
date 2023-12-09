import { nextRow, nextSequence, shouldStop, extrapolateHistory, beforeSequence, extrapolateBackwardsHistory } from './day09p1'

describe('Day 9 reverse OASIS', () => {
  it('should calculate the next row', () => {
    const input = '10 13 16 21 30 45'.split(' ').map((x) => parseInt(x))
    const result = nextRow(input)
    expect(result).toStrictEqual([3, 3, 5, 9, 15])
  })

  it('should calculate the sequence before from another row', () => {
    const row1 = [10, 13, 16, 21, 30, 45]
    const row2 = [5, 3, 3, 5, 9, 15]
    const result = beforeSequence(row1, row2)
    expect(result).toStrictEqual([5, 10, 13, 16, 21, 30, 45])
  })

  it('should calculate the next sequence from another row from 0s', () => {
    const row1 = [2, 2, 2]
    const row2 = [0, 0]
    const result = beforeSequence(row1, row2)
    expect(result).toStrictEqual([2, 2, 2, 2])
  })

  it('should extrapolate and find the backwards history', () => {
    const input = [0, 3, 6, 9, 12, 15]
    expect(extrapolateBackwardsHistory(input)).toBe(-3)

    const input2 = [1, 3, 6, 10, 15, 21]
    expect(extrapolateBackwardsHistory(input2)).toBe(0)

    const input3 = [10, 13, 16, 21, 30, 45]
    expect(extrapolateBackwardsHistory(input3)).toBe(5)
  })
})
