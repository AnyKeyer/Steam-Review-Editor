// Steam review character limit
export const STEAM_MAX_CHARS = 8000

// LocalStorage key for saving content
export const STORAGE_KEY = 'steam-review-editor-content'

// Steam BBCode formatting options
export const FORMATTING_OPTIONS = [
  { id: 'h1', label: 'H1', tag: 'h1', icon: 'H1', title: 'Заголовок 1' },
  { id: 'h2', label: 'H2', tag: 'h2', icon: 'H2', title: 'Заголовок 2' },
  { id: 'h3', label: 'H3', tag: 'h3', icon: 'H3', title: 'Заголовок 3' },
  { id: 'bold', label: 'B', tag: 'b', icon: 'B', title: 'Жирный' },
  { id: 'italic', label: 'I', tag: 'i', icon: 'I', title: 'Курсив' },
  { id: 'underline', label: 'U', tag: 'u', icon: 'U', title: 'Подчеркнутый' },
  { id: 'strike', label: 'S', tag: 'strike', icon: 'S', title: 'Зачеркнутый' },
  { id: 'spoiler', label: 'SP', tag: 'spoiler', icon: '👁', title: 'Спойлер' },
  { id: 'code', label: 'CODE', tag: 'code', icon: '<>', title: 'Код' },
  { id: 'quote', label: 'QUOTE', tag: 'quote', icon: '"', title: 'Цитата' },
  { id: 'url', label: 'URL', tag: 'url', icon: '🔗', title: 'Ссылка' },
  { id: 'list', label: 'LIST', tag: 'list', icon: '•', title: 'Список' },
  { id: 'olist', label: 'OLIST', tag: 'olist', icon: '1.', title: 'Нумерованный список' },
  { id: 'hr', label: 'HR', tag: 'hr', icon: '—', title: 'Горизонтальная линия' },
  { id: 'noparse', label: 'NP', tag: 'noparse', icon: '{}', title: 'Без форматирования' },
]

// Tags that need special handling
export const SELF_CLOSING_TAGS = ['hr']
export const BLOCK_TAGS = ['h1', 'h2', 'h3', 'quote', 'code', 'list', 'olist', 'table']
export const LIST_TAGS = ['list', 'olist']
