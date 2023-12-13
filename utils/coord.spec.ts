import { shortestPath } from './coord'

describe('Coord', () => {
  it('should calculate the shortest path (galaxy 5 and 9)', () => {
    const a = { x: 6, y: 1 }
    const b = { x: 11, y: 5 }
    const result = shortestPath(a, b)

    expect(result).toEqual(9)
  })

  it('should calculate the shortest path (galaxy 1 and 7)', () => {
    const a = { x: 0, y: 4 }
    const b = { x: 10, y: 9 }
    const result = shortestPath(a, b)

    expect(result).toEqual(15)
  })

  it('should calculate the shortest path (galaxy 3 and 6)', () => {
    const a = { x: 2, y: 0 }
    const b = { x: 7, y: 12 }
    const result = shortestPath(a, b)

    expect(result).toEqual(17)
  })

  it('should calculate the shortest path (galaxy 8 and 9)', () => {
    const a = { x: 11, y: 0 }
    const b = { x: 11, y: 5 }
    const result = shortestPath(a, b)

    expect(result).toEqual(5)
  })
})
