<template>
  <div class="preview steam-theme">
    <div v-if="content" class="preview-content" v-html="renderedContent"></div>
    <div v-else class="preview-placeholder">
      <p>Здесь будет отображаться предпросмотр вашего обзора</p>
      <p class="hint">Начните печатать в редакторе слева</p>
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
  padding: 16px;
  background: #1b2838;
  border: 1px solid #2a475e;
  border-radius: 3px;
  min-height: 300px;
  color: #acb2b8;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  font-size: 14px;
}

.preview-content {
  line-height: 1.6;
  word-wrap: break-word;
  color: #acb2b8;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  color: var(--text-secondary);
  text-align: center;
}

.preview-placeholder p {
  margin: 4px 0;
}

.preview-placeholder .hint {
  font-size: 13px;
  opacity: 0.7;
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
