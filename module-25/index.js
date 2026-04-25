/**
 * Модуль 25: POST-запросы и тело запроса
 *
 * Задание: Чтение body и CRUD API для пользователей.
 */

const { error } = require("console");
const { returnValue } = require("happy-dom/lib/PropertySymbol");
const http = require("http");

/**
 * getBody — читает и парсит JSON из запроса
 *
 * @param {http.IncomingMessage} req - объект запроса
 * @returns {Promise<any>} - распарсенный JSON
 */
function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

/**
 * createServer — создаёт HTTP-сервер с CRUD API
 *
 * Эндпоинты:
 * - GET /api/users — список пользователей
 * - POST /api/users — создать (body: { name }) → 201
 * - DELETE /api/users/:id — удалить → 204 или 404
 * - Остальное → 404
 *
 * @returns {http.Server}
 */
function createServer() {
  const users = [];
  let nextId = 1;

  const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && req.url === "/api/users") {
      res.end(JSON.stringify(users));
      return;
    }

    if (req.method === "POST" && req.url === "/api/users") {
      try {
        const body = await getBody(req);
        const { name } = body;

        if (!name) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Name is required" }));
          return;
        }

        const user = { id: nextId++, name };
        users.push(user);

        res.statusCode = 201;
        res.end(JSON.stringify(user));
        return;
      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
      }
    }

    if (req.method === "DELETE") {
      const url = new URL(req.url, "http://localhost");
      const match = url.pathname.match(/^\/api\/users\/(\d+)$/);

      if (match) {
        const id = Number(match[1]);
        const index = users.findIndex((u) => u.id === id);

        if (index === -1) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: "User not found" }));
          return;
        }

        users.splice(index, 1);
        res.statusCode = 204;
        res.end();
        return;
      }
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  });

  return server;
}

module.exports = { getBody, createServer };
