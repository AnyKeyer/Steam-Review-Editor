<template>
  <div class="preview steam-theme">
    <div v-if="content" class="preview-content" v-html="renderedContent"></div>
    <div v-else class="preview-placeholder">
      <div class="placeholder-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"></path>
        </svg>
      </div>
      <p class="placeholder-title">Предпросмотр обзора</p>
      <p class="placeholder-hint">Начните печатать в редакторе, и здесь появится результат</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { parseBBCode } from '@/utils/bbcodeParser'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const renderedContent = computed(() => {
  return parseBBCode(props.content)
})
</script>

<style scoped>
.preview {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: linear-gradient(180deg, #1b2838 0%, #171d25 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  min-height: 300px;
  color: #acb2b8;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  font-size: 14px;
}

.preview-content {
  line-height: 1.7;
  word-wrap: break-word;
  color: #c6d4df;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 250px;
  color: var(--text-secondary);
  text-align: center;
  padding: 40px 20px;
}

.placeholder-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(103, 193, 245, 0.1);
  border: 1px solid rgba(103, 193, 245, 0.2);
  border-radius: 50%;
  margin-bottom: 20px;
}

.placeholder-icon svg {
  width: 28px;
  height: 28px;
  color: #67c1f5;
  opacity: 0.7;
}

.placeholder-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.placeholder-hint {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  opacity: 0.8;
}

/* Steam exact styling for parsed BBCode */
.steam-theme :deep(h1) {
  font-size: 24px;
  font-weight: 300;
  color: #5dbdec;
  margin: 18px 0 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(93, 189, 236, 0.3);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.steam-theme :deep(h2) {
  font-size: 18px;
  font-weight: 400;
  color: #5dbdec;
  margin: 14px 0 10px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.steam-theme :deep(h3) {
  font-size: 15px;
  font-weight: 400;
  color: #5dbdec;
  margin: 12px 0 8px;
  text-transform: uppercase;
}

.steam-theme :deep(b),
.steam-theme :deep(strong) {
  font-weight: 600;
  color: #ffffff;
}

.steam-theme :deep(i),
.steam-theme :deep(em) {
  font-style: italic;
  color: #acb2b8;
}

.steam-theme :deep(u) {
  text-decoration: underline;
}

.steam-theme :deep(s),
.steam-theme :deep(strike) {
  text-decoration: line-through;
  color: #8f98a0;
}

.steam-theme :deep(.spoiler) {
  background: #000000;
  color: #000000;
  padding: 1px 4px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.steam-theme :deep(.spoiler:hover),
.steam-theme :deep(.spoiler.revealed) {
  background: #171a21;
  color: #acb2b8;
}

.steam-theme :deep(.quote) {
  background: rgba(0, 0, 0, 0.2);
  border-left: 2px solid #67c1f5;
  padding: 10px 14px;
  margin: 10px 0;
  color: #8f98a0;
  font-style: italic;
}

.steam-theme :deep(.quote-author) {
  font-size: 11px;
  color: #67c1f5;
  font-style: normal;
  margin-bottom: 6px;
  text-transform: none;
}

.steam-theme :deep(code),
.steam-theme :deep(.code) {
  background: #0e1621;
  font-family: "Courier New", Courier, monospace;
  font-size: 13px;
  color: #8bc34a;
  padding: 10px 14px;
  border-radius: 3px;
  display: block;
  margin: 10px 0;
  white-space: pre-wrap;
  overflow-x: auto;
  border: 1px solid #1e3246;
}

.steam-theme :deep(a) {
  color: #67c1f5;
  text-decoration: none;
}

.steam-theme :deep(a:hover) {
  color: #ffffff;
  text-decoration: none;
}

.steam-theme :deep(ul) {
  margin: 10px 0;
  padding-left: 20px;
  list-style-type: disc;
}

.steam-theme :deep(ol) {
  margin: 10px 0;
  padding-left: 20px;
  list-style-type: decimal;
}

.steam-theme :deep(li) {
  margin: 4px 0;
  color: #acb2b8;
}

.steam-theme :deep(hr) {
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, #2a475e, transparent);
  margin: 20px 0;
}

.steam-theme :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 10px 0;
  background: rgba(0, 0, 0, 0.1);
}

.steam-theme :deep(th),
.steam-theme :deep(td) {
  border: 1px solid #2a475e;
  padding: 8px 12px;
  text-align: left;
  color: #acb2b8;
}

.steam-theme :deep(th) {
  background: rgba(0, 0, 0, 0.3);
  font-weight: 500;
  color: #67c1f5;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.05em;
}

.steam-theme :deep(.noparse) {
  font-family: "Courier New", Courier, monospace;
  background: rgba(0, 0, 0, 0.3);
  color: #8f98a0;
  padding: 1px 4px;
  border-radius: 2px;
  font-size: 13px;
}
</style>
