<template>
  <div class="editor-wrapper">
    <textarea
      ref="textareaRef"
      class="editor"
      :value="modelValue"
      :maxlength="maxLength"
      placeholder="Начните писать свой обзор здесь...

Используйте панель инструментов выше для форматирования текста.

Примеры:
[b]Жирный текст[/b]
[i]Курсив[/i]
[u]Подчеркнутый[/u]
[spoiler]Скрытый текст[/spoiler]
[h1]Заголовок[/h1]
[list]
[*]Элемент списка
[*]Еще элемент
[/list]"
      @input="handleInput"
      @select="handleSelect"
      @keydown="$emit('keydown', $event)"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SELF_CLOSING_TAGS, LIST_TAGS } from '@/constants/steam'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: 8000
  }
})

const emit = defineEmits(['update:modelValue', 'keydown'])

const textareaRef = ref(null)

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}

const handleSelect = () => {
  // Store selection for later use
}

const applyFormat = (format) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = props.modelValue
  const selectedText = text.substring(start, end)
  
  let newText = ''
  let cursorOffset = 0
  
  if (SELF_CLOSING_TAGS.includes(format.tag)) {
    // Self-closing tags like [hr]
    const insertion = `[${format.tag}][/${format.tag}]`
    newText = text.substring(0, start) + insertion + text.substring(end)
    cursorOffset = start + insertion.length
  } else if (LIST_TAGS.includes(format.tag)) {
    // List tags with items
    const listContent = selectedText 
      ? selectedText.split('\n').map(line => `[*]${line}`).join('\n')
      : '[*]Элемент списка'
    const insertion = `[${format.tag}]\n${listContent}\n[/${format.tag}]`
    newText = text.substring(0, start) + insertion + text.substring(end)
    cursorOffset = start + insertion.length
  } else if (format.tag === 'url') {
    // URL tag with attribute
    const url = selectedText.startsWith('http') ? selectedText : 'https://example.com'
    const linkText = selectedText.startsWith('http') ? 'Ссылка' : (selectedText || 'Ссылка')
    const insertion = `[url=${url}]${linkText}[/url]`
    newText = text.substring(0, start) + insertion + text.substring(end)
    cursorOffset = start + 5 // Position after [url=
  } else if (format.tag === 'quote') {
    // Quote with author
    const insertion = `[quote=author]${selectedText || 'Цитата'}[/quote]`
    newText = text.substring(0, start) + insertion + text.substring(end)
    cursorOffset = start + 7 // Position at "author"
  } else {
    // Standard wrapping tags
    const openTag = `[${format.tag}]`
    const closeTag = `[/${format.tag}]`
    newText = text.substring(0, start) + openTag + selectedText + closeTag + text.substring(end)
    cursorOffset = selectedText ? start + openTag.length + selectedText.length + closeTag.length : start + openTag.length
  }
  
  emit('update:modelValue', newText)
  
  // Restore focus and set cursor position
  setTimeout(() => {
    textarea.focus()
    if (selectedText) {
      textarea.setSelectionRange(cursorOffset, cursorOffset)
    } else {
      const tagLength = format.tag.length + 2
      textarea.setSelectionRange(start + tagLength, start + tagLength)
    }
  }, 0)
}

defineExpose({ applyFormat })
</script>

<style scoped>
.editor-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.editor {
  flex: 1;
  width: 100%;
  min-height: 350px;
  padding: 18px;
  background: var(--bg-input);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  color: var(--text-primary);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.7;
  resize: vertical;
  transition: all var(--transition-normal);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
}

.editor:hover {
  border-color: #3d5a80;
}

.editor:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(103, 193, 245, 0.15);
}

.editor::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
  font-family: var(--font-family);
}

.editor::selection {
  background: rgba(103, 193, 245, 0.3);
}
</style>
