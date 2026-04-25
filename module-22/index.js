/**
 * Модуль 22: Продвинутый Fetch — ошибки и параллельные запросы
 *
 * Задание: Напишите функции для безопасной работы с API.
 */

const { response } = require("express");

/**
 * fetchWithError — fetch с проверкой статуса
 *
 * @param {string} url - URL для запроса
 * @returns {Promise<any>} - JSON-данные
 * @throws {Error} - если response.ok === false, выбрасывает Error("HTTP {status}")
 */
async function fetchWithError(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return response.json();
}

/**
 * fetchAll — параллельная загрузка нескольких URL
 *
 * @param {string[]} urls - массив URL-адресов
 * @returns {Promise<any[]>} - массив JSON-данных
 * @throws {Error} - если любой запрос упал
 */
async function fetchAll(urls) {
  try {
    const responses = await Promise.all(
      urls.map(async (url) => await fetchWithError(url)),
    );
    return responses;
  } catch (error) {
    throw error;
  }
}

/**
 * fetchSafe — загрузка с обработкой частичных ошибок
 *
 * @param {string[]} urls - массив URL-адресов
 * @returns {Promise<{succeeded: any[], failed: Array<{url: string, error: string}>}>}
 */
async function fetchSafe(urls) {
  const results = await Promise.allSettled(
    urls.map((url) => fetchWithError(url)),
  );

  const succeeded = [];
  const failed = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const url = urls[i];

    if (result.status === "fulfilled") {
      succeeded.push(result.value);
    } else {
      failed.push({
        url,
        error:
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason),
      });
    }
  }

  return { succeeded, failed };
}

// Экспорт
module.exports = { fetchWithError, fetchAll, fetchSafe };
