<template>
  <div class="preview-header">
    <div class="title-wrapper">
      <div class="icon-wrapper">
        <span class="icon">👁️</span>
      </div>
      <div class="title-text">
        <h2 class="title">{{ t.editor.preview }}</h2>
        <span class="subtitle">{{ t.editor.previewSubtitle }}</span>
      </div>
    </div>
    <div class="actions">
      <button v-if="showSave" class="save-btn" @click="$emit('save')" :title="t.editor.save">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        <span>{{ t.editor.save }}</span>
      </button>
      <button class="copy-btn" @click="$emit('copy')" :title="t.editor.copy">
        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span>{{ t.editor.copy }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../../i18n'

const { t } = useI18n()

defineProps({
  showSave: {
    type: Boolean,
    default: false
  }
})
defineEmits(['copy', 'save'])
</script>

<style scoped>
.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #5ba32b 0%, #4a8c23 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(91, 163, 43, 0.3);
}

.icon {
  font-size: 20px;
}

.title-text {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-light);
  line-height: 1.2;
}

.subtitle {
  font-size: 11px;
  color: var(--text-secondary);
}

.actions {
  display: flex;
  gap: 10px;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, var(--accent-blue), #2563eb);
  border: none;
  border-radius: var(--border-radius-lg);
  color: var(--text-light);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.save-btn:active {
  transform: translateY(0);
}

.save-btn svg {
  width: 16px;
  height: 16px;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #5ba32b 0%, #4a8c23 100%);
  border: none;
  border-radius: var(--border-radius-lg);
  color: var(--text-light);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 12px rgba(91, 163, 43, 0.3);
}

.copy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(91, 163, 43, 0.4);
}

.copy-btn:active {
  transform: translateY(0);
}

.copy-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .preview-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .actions {
    width: 100%;
    flex-direction: column;
  }
  
  .copy-btn,
  .save-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
