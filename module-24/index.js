/**
 * Модуль 24: Routing и параметры URL
 *
 * Задание: Парсинг URL и сервер с динамическими маршрутами.
 */

const { queries } = require('@testing-library/react');
const http = require('http');
const path = require('path');

// Данные для сервера
const users = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Maria' },
  { id: 3, name: 'Peter' },
  { id: 4, name: 'Anna' },
  { id: 5, name: 'Alex' }
];

/**
 * parseUrl — парсит URL на pathname и query
 *
 * @param {string} urlString - строка URL (например, '/api/users?page=1')
 * @returns {{ pathname: string, query: object }}
 */
function parseUrl(urlString) {
  const url = new URL(urlString, 'http://localhost')
  const pathname = url.pathname
  const query = Object.fromEntries(url.searchParams)
  return {pathname : pathname, query: query}

}

/**
 * extractId — извлекает числовой ID из пути
 *
 * @param {string} pathname - путь (например, '/users/123')
 * @param {string} prefix - префикс (например, '/users/')
 * @returns {number|null} - ID или null
 */
function extractId(pathname, prefix) {
  if (!pathname.startsWith(prefix))
      return null

  const id = pathname.slice(prefix.length)
  const num = Number(id)

  if (!isNaN(num) && Number.isInteger(num) && String(num) === id) {
    return num
  }

  return null

}

/**
 * createServer — создаёт HTTP-сервер с API
 *
 * Эндпоинты:
 * - GET /api/users — список (пагинация: ?page=1&limit=10)
 * - GET /api/users/:id — пользователь по ID
 * - Остальное — 404
 *
 * @returns {http.Server}
 */
function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = new URL(req.url, 'http://localhost')
    const path = url.pathname

    if (req.method === 'GET' && path === '/api/users') {
      const page = parseInt(url.searchParams.get('page')) || 1
      const limit = parseInt(url.searchParams.get('limit')) || 10
      const start = (page - 1) * limit
      const result = users.slice(start, start + limit)
      return res.end(JSON.stringify(result))
    }

    if (req.method === 'GET') {
      const match = path.match(/^\/api\/users\/(\d+)$/)
      if (match) {
        const id = Number(match[1])
        const user = users.find(u => u.id === id)

        if (user) {
          return res.end(JSON.stringify(user))
        } else {
          res.statusCode = 404
          return res.end(JSON.stringify({ error: 'User not found' }))
        }
      }
    }

    res.statusCode = 404
    res.end(JSON.stringify({ error: 'Not found' }))
  })

  return server
}

module.exports = { parseUrl, extractId, createServer, users };
