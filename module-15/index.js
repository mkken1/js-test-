/**
 * createPromise — создаёт Promise с задержкой
 *
 * @param {boolean} shouldResolve - true для resolve, false для reject
 * @param {number} delay - задержка в миллисекундах
 * @returns {Promise} Promise, который resolve/reject через delay мс
 */
function createPromise(shouldResolve, delay) {
  return new Promise((resolve, reject) => {
    if (shouldResolve === true)
      setTimeout(resolve('Успех'), delay)
    else
      setTimeout(reject(new Error('Ошибка')), delay)
  })
}

module.exports = { createPromise };
