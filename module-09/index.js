const { value } = require("happy-dom/lib/PropertySymbol.js");

/**
 * createMultiplier — создаёт функцию-множитель (замыкание)
 *
 * @param {number} factor - на что умножать
 * @returns {Function} функция, которая принимает число и умножает его на factor
 *
 * Примеры:
 * const double = createMultiplier(2);
 * double(5) → 10
 * const triple = createMultiplier(3);
 * triple(4) → 12
 */
function createMultiplier(factor) {
  return (multiplyNumber) =>
    factor*multiplyNumber
}

/**
 * mergeObjects — объединяет два объекта с помощью spread оператора
 *
 * @param {Object} obj1 - первый объект
 * @param {Object} obj2 - второй объект (его свойства приоритетнее)
 * @returns {Object} новый объект с объединёнными свойствами
 */
function mergeObjects(obj1, obj2) {
  return {...obj1, ...obj2}
}

/**
 * createCounter — создаёт объект-счётчик с методами
 *
 * @param {number} initial - начальное значение (по умолчанию 0)
 * @returns {Object} объект со свойством value и методами increment, decrement, reset
 */
function createCounter(initial = 0) {
  return {
    startValue: initial,
    value: initial,

    increment: function() {
      this.value += 1
      return this.value
    },

    decrement: function() {
      this.value -= 1
      return this.value
    },

    reset: function() {
      this.value = this.startValue
      return this.value
    }
  }
}

module.exports = { createMultiplier, mergeObjects, createCounter };
