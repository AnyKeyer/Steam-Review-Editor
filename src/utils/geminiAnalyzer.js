// URL Cloudflare Worker
const WORKER_URL = 'https://broad-credit-f7b3.nolopp4.workers.dev'

/**
 * Анализирует текст через Cloudflare Worker → Gemini API
 * @param {string} text - текст для анализа
 * @returns {Promise<string>} - результат анализа
 */
export async function analyzeText(text) {
  if (!text.trim()) {
    throw new Error('Текст для анализа пуст')
  }

  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, action: 'analyze' })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `Ошибка: ${response.status}`)
  }

  if (!data.result) {
    throw new Error('Пустой ответ от сервера')
  }

  return data.result
}

/**
 * Автостилизация текста — добавляет BBCode теги
 * @param {string} text - текст для стилизации
 * @returns {Promise<string>} - текст с BBCode тегами
 */
export async function stylizeText(text) {
  if (!text.trim()) {
    throw new Error('Текст для стилизации пуст')
  }

  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, action: 'stylize' })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `Ошибка: ${response.status}`)
  }

  if (!data.result) {
    throw new Error('Пустой ответ от сервера')
  }

  return data.result
}
