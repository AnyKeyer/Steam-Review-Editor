<template>
  <div class="toolbar">
    <button
      v-for="option in FORMATTING_OPTIONS"
      :key="option.id"
      class="toolbar-btn"
      :class="{ 'toolbar-btn--special': isSpecialTag(option.tag) }"
      :title="option.title"
      @click="$emit('format', option)"
    >
      <span class="btn-icon" :class="{ 'btn-icon--styled': isStyledIcon(option.id) }">
        {{ option.icon }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { FORMATTING_OPTIONS } from '@/constants/steam'

defineEmits(['format'])

const isSpecialTag = (tag) => {
  return ['spoiler', 'code', 'quote', 'url', 'list', 'olist'].includes(tag)
}

const isStyledIcon = (id) => {
  return ['bold', 'italic', 'underline', 'strike'].includes(id)
}
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px;
  background: var(--bg-input);
  border-radius: var(--border-radius);
  margin-bottom: 12px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  background: var(--bg-button);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.toolbar-btn:hover {
  background: var(--bg-button-hover);
  color: var(--text-light);
  transform: translateY(-1px);
}

.toolbar-btn:active {
  transform: translateY(0);
}

.toolbar-btn--special {
  background: var(--bg-hover);
}

.btn-icon {
  font-weight: 500;
}

.btn-icon--styled {
  font-weight: 700;
}

.toolbar-btn:nth-child(1) .btn-icon,
.toolbar-btn:nth-child(2) .btn-icon,
.toolbar-btn:nth-child(3) .btn-icon {
  font-size: 12px;
}

.toolbar-btn:nth-child(4) .btn-icon {
  font-weight: 700;
}

.toolbar-btn:nth-child(5) .btn-icon {
  font-style: italic;
}

.toolbar-btn:nth-child(6) .btn-icon {
  text-decoration: underline;
}

.toolbar-btn:nth-child(7) .btn-icon {
  text-decoration: line-through;
}
</style>
