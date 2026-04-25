/**
 * Модуль 26: CORS — связка фронтенда и бэкенда
 *
 * Задание: Настройка CORS для кросс-доменных запросов.
 */

const http = require("http");

/**
 * addCorsHeaders — добавляет CORS-заголовки к ответу
 *
 * @param {http.ServerResponse} res - объект ответа
 */
function addCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

/**
 * handlePreflight — обрабатывает OPTIONS (preflight) запрос
 *
 * @param {http.IncomingMessage} req - объект запроса
 * @param {http.ServerResponse} res - объект ответа
 * @returns {boolean} - true если это был OPTIONS и он обработан
 */
function handlePreflight(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
}

/**
 * getBody — читает JSON из запроса (вспомогательная)
 */
function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * createServer — создаёт HTTP-сервер с CORS
 *
 * Эндпоинты:
 * - OPTIONS * — preflight (204)
 * - GET /api/message → { message: "Hello from API" }
 * - POST /api/echo → возвращает полученный body
 * - Остальное → 404
 *
 * @returns {http.Server}
 */
function createServer() {
  server = http.createServer((req, res) => {
    addCorsHeaders(res);

    if (req.method === "OPTIONS") {
      handlePreflight(req, res);
      return;
    }

    if (req.method === "GET" && req.url === "/api/message") {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Hello from API" }));
      return;
    }

    if (req.method === "POST" && req.url === "/api/echo") {
      getBody(req).then((body) => {
        res.statusCode = 200;
        res.end(JSON.stringify(body));
      });
      return;
    }

    res.statusCode = 404;
    res.end("Not Found");
  });

  return server;
}

module.exports = { addCorsHeaders, handlePreflight, createServer, getBody };
