<template>
  <div class="history-controls">
    <button 
      class="history-btn" 
      :disabled="!canUndo"
      :title="`Отменить (Ctrl+Z) — ${historyCount} в истории`"
      @click="$emit('undo')"
    >
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 10h10a5 5 0 0 1 5 5v2"></path>
        <polyline points="3 10 7 6"></polyline>
        <polyline points="3 10 7 14"></polyline>
      </svg>
      <span class="label">Отменить</span>
    </button>
    <button 
      class="history-btn" 
      :disabled="!canRedo"
      :title="`Повторить (Ctrl+Y) — ${redoCount} доступно`"
      @click="$emit('redo')"
    >
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10H11a5 5 0 0 0-5 5v2"></path>
        <polyline points="21 10 17 6"></polyline>
        <polyline points="21 10 17 14"></polyline>
      </svg>
      <span class="label">Повторить</span>
    </button>
    <div class="history-info" v-if="historyCount > 1">
      <span class="info-badge">{{ historyCount }}</span>
    </div>
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
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.history-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--bg-button);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  color: var(--text-primary);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.history-btn:hover:not(:disabled) {
  background: var(--bg-button-hover);
  color: var(--text-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.history-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.icon {
  width: 16px;
  height: 16px;
}

.label {
  font-weight: 500;
}

.history-info {
  margin-left: auto;
}

.info-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .label {
    display: none;
  }
  
  .history-btn {
    padding: 10px 12px;
  }
  
  .history-info {
    display: none;
  }
}
</style>
