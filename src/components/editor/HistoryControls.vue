<template>
  <div class="history-controls">
    <button 
      class="history-btn" 
      :disabled="!canUndo"
      :title="`Отменить (${historyCount} в истории)`"
      @click="$emit('undo')"
    >
      <span class="icon">↩</span>
      <span class="label">Отменить</span>
    </button>
    <button 
      class="history-btn" 
      :disabled="!canRedo"
      :title="`Повторить (${redoCount} доступно)`"
      @click="$emit('redo')"
    >
      <span class="icon">↪</span>
      <span class="label">Повторить</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  canUndo: {
    type: Boolean,
    default: false
  },
  canRedo: {
    type: Boolean,
    default: false
  },
  historyCount: {
    type: Number,
    default: 0
  },
  redoCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['undo', 'redo'])
</script>

<style scoped>
.history-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.history-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--bg-button);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.history-btn:hover:not(:disabled) {
  background: var(--bg-button-hover);
  color: var(--text-light);
}

.history-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.icon {
  font-size: 14px;
}

.label {
  font-weight: 500;
}

@media (max-width: 768px) {
  .label {
    display: none;
  }
  
  .history-btn {
    padding: 8px 12px;
  }
}
</style>
