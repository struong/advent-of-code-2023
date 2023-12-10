import { Deque } from "@datastructures-js/deque"

export interface Point {
  x: number
  y: number
}

export class PointsSet {
  points: Point[] = []

  add(point: Point) {
    if (!this.has(point)) {
      this.points.push(point)
    }
  }

  has(point: Point): boolean {
    return this.points.some((p) => p.x === point.x && p.y === point.y)
  }

  size(): number {
    return this.points.length
  }
}

export function findStartingPoint(input: string[]): Point {
  for (let i = 0; i < input.length; i++) {
    {
      if (input[i].includes('S')) {
        return { x: i, y: input[i].indexOf('S') }
      }
    }
  }

  return { x: 0, y: 0 }
}

export function bfs(input: string[], startingPoint: Point): PointsSet {
  let visited: PointsSet = new PointsSet()
  const deque = Deque.fromArray<Point>([])

  deque.pushBack(startingPoint)
  visited.add(startingPoint)

  while (deque.size() > 0) {
    let currentPoint = deque.popFront()

    let currentChar = input[currentPoint.x][currentPoint.y]

    // Find up neighbor
    if (
      (currentChar === 'S' || currentChar === '|' || currentChar === 'L' || currentChar === 'J')
    ) {
      const upNeighbor = input[currentPoint.x - 1][currentPoint.y]
      const upPoint: Point = { x: currentPoint.x - 1, y: currentPoint.y }
      if (!visited.has(upPoint)) {
        if (upNeighbor === '|' || upNeighbor === '7' || upNeighbor === 'F') {
          visited.add(upPoint)
          deque.pushBack(upPoint)
        }
      }
    }

    // Find down neighbour
    if (
      (currentChar === 'S' || currentChar === '|' || currentChar === '7' || currentChar === 'F')
    ) {
      const downNeighbor = input[currentPoint.x + 1][currentPoint.y]
      const downPoint: Point = { x: currentPoint.x + 1, y: currentPoint.y }
      if (!visited.has(downPoint)) {
        if (downNeighbor === '|' || downNeighbor === 'L' || downNeighbor === 'J') {
          visited.add(downPoint)
          deque.pushBack(downPoint)
        }
      }
    }

    // Find left neighbour
    if (
      (currentChar === 'S' || currentChar === '-' || currentChar === 'J' || currentChar === '7')
    ) {
      const leftNeighbor = input[currentPoint.x][currentPoint.y - 1]
      const leftPoint: Point = { x: currentPoint.x, y: currentPoint.y - 1 }
      if (!visited.has(leftPoint)) {
        if (leftNeighbor === '-' || leftNeighbor === 'L' || leftNeighbor === 'F') {
          visited.add(leftPoint)
          deque.pushBack(leftPoint)
        }
      }
    }

    // Find right neighbour
    if (
      (currentChar === 'S' || currentChar === '-' || currentChar === 'F' || currentChar === 'L')
    ) {
      const rightNeighbor = input[currentPoint.x][currentPoint.y + 1]
      const rightPoint: Point = { x: currentPoint.x, y: currentPoint.y + 1 }
      if (!visited.has(rightPoint)) {
        if (rightNeighbor === '-' || rightNeighbor === 'J' || rightNeighbor === '7') {
          visited.add(rightPoint)
          deque.pushBack(rightPoint)
        }
      }
    }
  }
  
  return visited
}