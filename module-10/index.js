/**
 * getUnique — возвращает массив уникальных элементов
 *
 * @param {Array} arr - исходный массив
 * @returns {Array} массив без дубликатов
 */
function getUnique(arr) {
  const unique = new Set(arr)
  return [...unique]
}

/**
 * countItems — подсчитывает количество каждого элемента
 *
 * @param {Array} arr - исходный массив
 * @returns {Map} Map, где ключ — элемент, значение — количество
 */
function countItems(arr) {
  const map = new Map()

  for (n of arr)
    map.set(n, (map.get(n) || 0) + 1)

  return map
}

module.exports = { getUnique, countItems };
