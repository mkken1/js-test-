/**
 * Модуль 28: Работа с файлами (fs)
 *
 * Задание: Создайте JSON-хранилище данных.
 */

const fs = require("fs");

/**
 * createStore — создаёт хранилище с сохранением в JSON-файл
 *
 * @param {string} filepath - путь к JSON-файлу
 * @returns {Object} - объект с методами: getAll, getById, add, update, remove
 */
function createStore(filepath) {
  let data = [];
  let nextId = 1;

  const load = () => {
    if (fs.existsSync(filepath)) {
      try {
        const content = fs.readFileSync(filepath, "utf-8").trim();
        data = content ? JSON.parse(content) : [];

        if (data.length > 0) {
          nextId = Math.max(...data.map((item) => item.id)) + 1;
        } else {
          nextId = 1;
        }
      } catch (e) {
        data = [];
        nextId = 1;
      }
    } else {
      data = [];
      nextId = 1;
    }
  };

  const save = () => {
    fs.writeFileSync(filepath, JSON.stringify(data), "utf-8");
  };

  load();

  return {
    getAll() {
      return [...data];
    },
    getById(id) {
      return data.find((item) => item.id === id) || null;
    },
    add(item) {
      const newItem = { id: nextId++, ...item };
      data.push(newItem);
      save();
      return newItem;
    },
    update(id, changes) {
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) return null;

      Object.assign(data[index], changes);
      save();
      return data[index];
    },
    remove(id) {
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) return false;

      data.splice(index, 1);
      save();
      return true;
    },
  };
}

module.exports = { createStore };

module.exports = { createStore };
