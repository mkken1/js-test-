/**
 * Модуль 27: TODO-приложение — Backend
 *
 * Задание: Создайте сервер с TODO API.
 */

const http = require("http");

/**
 * getBody — читает JSON из запроса
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
 * createServer — создаёт HTTP-сервер с TODO API
 *
 * Эндпоинты:
 * - GET    /api/todos     — список задач
 * - POST   /api/todos     — создать { title } → 201
 * - PATCH  /api/todos/:id — переключить completed → 200
 * - DELETE /api/todos/:id — удалить → 204
 * - OPTIONS *             — preflight → 204
 * - Остальное             → 404
 *
 * Все ответы с CORS-заголовками.
 *
 * @returns {http.Server}
 */
function createServer() {
  const todos = [];
  let nextId = 1;

  server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS",
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.url === "/api/todos") {
      if (req.method === "GET") {
        res.statusCode = 200;
        res.end(JSON.stringify(todos));
      } else if (req.method === "POST") {
        const body = await getBody(req);
        const id = nextId++;
        todos.push({ id, title: body.title, completed: false });
        res.statusCode = 201;
        res.end(JSON.stringify({ id, title: body.title, completed: false }));
      } else {
        res.statusCode = 404;
        res.end();
      }
    } else if (req.url.startsWith("/api/todos/")) {
      const id = parseInt(req.url.split("/").pop());
      const todo = todos.find((t) => t.id === id);
      if (!todo) {
        res.statusCode = 404;
        res.end();
        return;
      }
      if (req.method === "PATCH") {
        todo.completed = !todo.completed;
        res.statusCode = 200;
        res.end(JSON.stringify(todo));
      } else if (req.method === "DELETE") {
        todos.splice(todos.indexOf(todo), 1);
        res.statusCode = 204;
        res.end();
      } else {
        res.statusCode = 404;
        res.end();
      }
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  return server;
}

module.exports = { createServer, getBody };
