/**
 * Capitalize the specified text.
 *
 * @param text the specified text.
 * @return the capitalized version of the specified text.
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.substring(1)
}

/**
 * Format the specified text in `kebab-case`.
 *
 * @param text the specified text.
 * @return the specified text formatted in `kebab-case`.
 */
export function kebabCase(text: string): string {
  return text.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}