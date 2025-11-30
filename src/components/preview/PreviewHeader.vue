<template>
  <div class="preview-header">
    <h2 class="title">
      <span class="icon">👁️</span>
      Предпросмотр
    </h2>
    <button class="copy-btn" @click="$emit('copy')" title="Копировать текст с тегами">
      <span class="copy-icon">📋</span>
      Копировать
    </button>
  </div>
</template>

<script setup>
defineEmits(['copy'])
</script>

<style scoped>
.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-light);
}

.icon {
  font-size: 18px;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--accent-green);
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-light);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-btn:hover {
  background: #6b8e23;
  transform: translateY(-1px);
}

.copy-btn:active {
  transform: translateY(0);
}

.copy-icon {
  font-size: 14px;
}
</style>
