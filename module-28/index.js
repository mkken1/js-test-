/**
 * Модуль 28: Работа с файлами (fs)
 *
 * Задание: Создайте JSON-хранилище данных.
 */

const fs = require("fs");
const path = require("path");

/**
 * createStore — создаёт хранилище с сохранением в JSON-файл
 *
 * @param {string} filepath - путь к JSON-файлу
 * @returns {Object} - объект с методами: getAll, getById, add, update, remove
 */
function createStore(filepath) {
  return {
    path: filepath,
    getAll: () => {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(data);
      }
      fs.writeFileSync(this.path, "[]");
      return [];
    },
    getById: (id) => {
      let parsedData = null;
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, "utf-8");
        parsedData = JSON.parse(data);
      }
      const todo = parsedData?.find((t) => t.id === id);
      return todo || null;
    },
    add: (todo) => {
      let parsedData = null;
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, "utf-8");
        parsedData = JSON.parse(data);
      }
      parsedData.push(todo);
      fs.writeFileSync(this.path, JSON.stringify(parsedData));
      return todo;
    },
    update: (id, updatedTodo) => {
      let parsedData = null;
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, "utf-8");
        parsedData = JSON.parse(data);
      }
      const index = parsedData.findIndex((t) => t.id === id);
      if (index !== -1) {
        parsedData[index] = { ...parsedData[index], ...updatedTodo };
        fs.writeFileSync(this.path, JSON.stringify(parsedData));
        return parsedData[index];
      }
      return null;
    },
    remove: (id) => {
      let parsedData = null;
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, "utf-8");
        parsedData = JSON.parse(data);
      }
      const index = parsedData.findIndex((t) => t.id === id);
      if (index !== -1) {
        parsedData.splice(index, 1)[0];
        fs.writeFileSync(this.path, JSON.stringify(parsedData));
        return true;
      }
      return false;
    },
  };
}

module.exports = { createStore };
