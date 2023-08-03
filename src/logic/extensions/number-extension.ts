/**
 * @param x the first specified number.
 * @param y the second specified number.
 * @return true if the specified numbers have the same parity (they are
 *         both even or both odd), false otherwise.
 */
export function haveSameParity(x: number, y: number){ return (x + y) % 2 === 0 }