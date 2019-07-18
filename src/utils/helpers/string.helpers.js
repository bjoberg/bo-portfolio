/**
 * Get a word with the first letter capitalized
 * @param {string} word to capitalize the first letter
 */
export default function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
