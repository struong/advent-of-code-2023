export const gcd = (a: number, b: number): number => (a && b ? gcd(b, a % b) : a || b)
export const lcm = (a: number, b: number): number => a * (b / gcd(a, b))
