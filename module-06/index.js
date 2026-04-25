/**
 * Модуль 6: Методы массивов (push, pop, shift, unshift)
 *
 * Задание: Создайте две функции для ротации массива:
 * - rotateLeft(arr) — сдвигает влево (первый → в конец)
 * - rotateRight(arr) — сдвигает вправо (последний → в начало)
 */

/**
 * Сдвигает массив влево: первый элемент перемещается в конец.
 * @param {Array} arr - исходный массив (изменяется)
 * @returns {*} перемещённый элемент или undefined для пустого массива
 */
function rotateLeft(arr) {
  if (arr == [])
    return undefined
  const firstElement = arr.shift()
  arr.push(firstElement)

  return firstElement
}

/**
 * Сдвигает массив вправо: последний элемент перемещается в начало.
 * @param {Array} arr - исходный массив (изменяется)
 * @returns {*} перемещённый элемент или undefined для пустого массива
 */
function rotateRight(arr) {
  if (arr == [])
    return undefined
  const lastElement = arr.pop()
  arr.unshift(lastElement)

  return lastElement
}

module.exports = { rotateLeft, rotateRight };
