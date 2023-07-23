/**
 * Capitalize the specified text.
 *
 * @param text the specified text.
 * @return the capitalized version of the specified text.
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.substring(1)
}