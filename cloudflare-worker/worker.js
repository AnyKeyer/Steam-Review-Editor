/**
 * Cloudflare Worker для проксирования запросов к Gemini API
 * 
 * Деплой:
 * 1. Зайди на https://dash.cloudflare.com/
 * 2. Workers & Pages → Create Worker
 * 3. Вставь этот код
 * 4. Settings → Variables → Add: GEMINI_API_KEY = твой_ключ
 * 5. Save and Deploy
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const ANALYSIS_PROMPT = `Ты — эксперт по проверке текстов на русском языке. Проанализируй текст обзора Steam-игры.

Игнорируй BBCode теги (например [b], [i], [h1], [quote] и т.д.) — они используются для форматирования.

Если ошибок нет, верни JSON:
{"noErrors": true}

Если есть ошибки, верни JSON-массив ошибок:
[
  {"type": "орфография", "wrong": "неправильное слово", "correct": "правильное слово", "hint": "краткое пояснение"},
  {"type": "пунктуация", "wrong": "текст без запятой", "correct": "текст, с запятой", "hint": "пояснение"}
]

ВАЖНО: 
- Верни ТОЛЬКО валидный JSON, без markdown и пояснений
- В поле "wrong" указывай точный фрагмент из текста
- Находи: орфографию, грамматику, пунктуацию, стилистику

Текст для анализа:
`

const STYLIZE_PROMPT = `Ты — эксперт по форматированию текстов для Steam. Твоя задача — добавить BBCode теги к тексту обзора, чтобы он выглядел красиво и структурированно.

ВАЖНЫЕ ПРАВИЛА:
1. НЕ МЕНЯЙ сам текст — только добавляй теги форматирования
2. НЕ ДОБАВЛЯЙ новый текст, не перефразируй, не исправляй ошибки
3. Сохрани ВСЕ слова и предложения в точности как есть

Доступные теги Steam:
- [h1][/h1], [h2][/h2], [h3][/h3] — заголовки
- [b][/b] — жирный текст для важных слов
- [i][/i] — курсив для акцентов
- [u][/u] — подчёркивание
- [strike][/strike] — зачёркнутый
- [spoiler][/spoiler] — спойлер
- [quote][/quote] или [quote=автор][/quote] — цитата
- [code][/code] — код
- [list][*]пункт[/list] — маркированный список
- [olist][*]пункт[/olist] — нумерованный список
- [hr] — горизонтальная линия
- [url=ссылка]текст[/url] — ссылка

Рекомендации:
- Используй [h1] для главных разделов обзора
- Используй [h2] или [h3] для подразделов
- Выделяй [b]ключевые слова[/b] жирным
- Используй [hr] для разделения крупных блоков
- Если есть перечисления — оформи их как [list]

Верни ТОЛЬКО отформатированный текст с тегами, без пояснений.

Текст для форматирования:
`

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      })
    }

    try {
      const { text, action = 'analyze' } = await request.json()

      if (!text || !text.trim()) {
        return new Response(JSON.stringify({ error: 'Текст для анализа пуст' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        })
      }

      // Check API key
      const apiKey = env.GEMINI_API_KEY
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'API ключ не настроен на сервере' }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        })
      }

      // Select prompt based on action
      const prompt = action === 'stylize' ? STYLIZE_PROMPT : ANALYSIS_PROMPT

      // Call Gemini API
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt + text }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          }
        })
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        return new Response(JSON.stringify({ 
          error: error.error?.message || `Ошибка Gemini API: ${response.status}` 
        }), {
          status: response.status,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        })
      }

      const data = await response.json()
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!result) {
        return new Response(JSON.stringify({ error: 'Пустой ответ от API' }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify({ result }), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      })

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      })
    }
  }
}
