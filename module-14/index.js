/**
 * executeInOrder — выполняет три функции последовательно с задержками
 *
 * @param {Function} first - выполняется через 0 мс
 * @param {Function} second - выполняется через 100 мс
 * @param {Function} third - выполняется через 200 мс
 * @returns {Object} объект с методом cancel() для отмены таймеров
 */
function executeInOrder(first, second, third) {
  const arr = [
    setTimeout(first, 0),
    setTimeout(second, 100),
    setTimeout(third, 200)
  ]

  return {
    cancel: () => {
      arr.forEach((callback) => clearTimeout(callback))
    }
  }
}

module.exports = { executeInOrder };
