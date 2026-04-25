/**
 * Модуль 19: События (Events)
 *
 * Задание: Напишите три функции для работы с событиями.
 */

/**
 * onClick — добавляет обработчик клика
 *
 * @param {string} selector - CSS-селектор
 * @param {Function} callback - функция-обработчик, получает event
 * @returns {boolean} - true если успешно, false если элемент не найден
 */
function onClick(selector, callback) {
  const element = document.querySelector(`${selector}`);
  if (!element) {
    return false;
  }

  element.addEventListener("click", callback);
  return true;
}

/**
 * onInput — добавляет обработчик ввода
 *
 * @param {string} selector - CSS-селектор
 * @param {Function} callback - функция-обработчик, получает value (строку)
 * @returns {boolean} - true если успешно, false если элемент не найден
 */
function onInput(selector, callback) {
  const element = document.querySelector(`${selector}`);
  if (!element) {
    return false;
  }

  element.addEventListener("input", (event) => {
    callback(event.target.value);
  });
  return true;
}

/**
 * onSubmit — добавляет обработчик отправки формы
 *
 * @param {string} selector - CSS-селектор формы
 * @param {Function} callback - функция-обработчик, получает event
 * @returns {boolean} - true если успешно, false если форма не найдена
 */
function onSubmit(selector, callback) {
  const form = document.querySelector(`${selector}`);
  if (!form) {
    return false;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    callback(event);
  });
  return true;
}

// Экспорт для Node.js (тесты) и браузера
if (typeof module !== "undefined" && module.exports) {
  module.exports = { onClick, onInput, onSubmit };
}
if (typeof window !== "undefined") {
  window.onClick = onClick;
  window.onInput = onInput;
  window.onSubmit = onSubmit;
}
