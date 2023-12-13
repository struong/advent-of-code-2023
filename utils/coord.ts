export interface Coord { 
  x: number
  y: number
}

export function shortestPath(a: Coord, b: Coord): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

