/**
 * Модуль 21: HTTP-запросы с Fetch
 *
 * Задание: Напишите функции для работы с JSONPlaceholder API.
 * Базовый URL: https://jsonplaceholder.typicode.com
 */

const BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * getPost — получает пост по ID
 *
 * @param {number} id - ID поста
 * @returns {Promise<Object>} - объект поста { userId, id, title, body }
 */
async function getPost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  const data = await response.json();
  return data;
}

/**
 * getPostComments — получает комментарии к посту
 *
 * @param {number} postId - ID поста
 * @returns {Promise<Array>} - массив комментариев
 */
async function getPostComments(postId) {
  const reponse = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  return reponse.json();
}

/**
 * createPost — создаёт новый пост
 *
 * @param {string} title - заголовок поста
 * @param {string} body - текст поста
 * @param {number} userId - ID автора
 * @returns {Promise<Object>} - созданный пост с id
 */
async function createPost(title, body, userId) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, userId }),
  });
  return response.json();
}

/**
 * getUserPosts — получает все посты пользователя
 *
 * @param {number} userId - ID пользователя
 * @returns {Promise<Array>} - массив постов
 */
async function getUserPosts(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}/posts`);
  return response.json();
}

// Экспорт
module.exports = {
  getPost,
  getPostComments,
  createPost,
  getUserPosts,
  BASE_URL,
};
