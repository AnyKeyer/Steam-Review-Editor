<template>
  <div class="signature-settings">
    <div class="signature-header" @click="isOpen = !isOpen">
      <div class="header-left">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="title">Подпись</span>
        <span v-if="signature && !isOpen" class="signature-preview">{{ truncatedSignature }}</span>
      </div>
      <svg 
        class="chevron" 
        :class="{ open: isOpen }"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    
    <div v-if="isOpen" class="signature-content">
      <p class="hint">Эта подпись будет добавляться в конец при копировании</p>
      <textarea 
        v-model="signature"
        placeholder="Например:&#10;&#10;[hr]&#10;[i]Понравился обзор? Подпишись![/i]&#10;[url=https://store.steampowered.com/curator/45695689/]Наш куратор[/url]"
        class="signature-input"
        rows="4"
        @input="saveSignature"
      ></textarea>
      <div class="signature-actions">
        <label class="toggle-label">
          <input 
            type="checkbox" 
            v-model="enabled"
            @change="saveEnabled"
          />
          <span class="toggle-switch"></span>
          <span class="toggle-text">Добавлять при копировании</span>
        </label>
        <button v-if="signature" class="clear-btn" @click="clearSignature">
          Очистить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const SIGNATURE_KEY = 'steam_review_signature'
const SIGNATURE_ENABLED_KEY = 'steam_review_signature_enabled'

const signature = ref('')
const enabled = ref(true)
const isOpen = ref(false)

const truncatedSignature = computed(() => {
  const clean = signature.value.replace(/\[.*?\]/g, '').trim()
  return clean.length > 30 ? clean.slice(0, 30) + '...' : clean
})

onMounted(() => {
  signature.value = localStorage.getItem(SIGNATURE_KEY) || ''
  enabled.value = localStorage.getItem(SIGNATURE_ENABLED_KEY) !== 'false'
})

const saveSignature = () => {
  localStorage.setItem(SIGNATURE_KEY, signature.value)
}

const saveEnabled = () => {
  localStorage.setItem(SIGNATURE_ENABLED_KEY, String(enabled.value))
}

const clearSignature = () => {
  signature.value = ''
  saveSignature()
}

// Expose for parent component
defineExpose({
  getSignature: () => enabled.value && signature.value ? signature.value : '',
  isEnabled: () => enabled.value
})
</script>

<style scoped>
.signature-settings {
  margin-top: 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.signature-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.signature-header:hover {
  background: rgba(255, 255, 255, 0.03);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
}

.title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.signature-preview {
  font-size: 12px;
  color: var(--text-secondary);
  opacity: 0.7;
  margin-left: 8px;
}

.chevron {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
  transition: transform var(--transition-fast);
}

.chevron.open {
  transform: rotate(180deg);
}

.signature-content {
  padding: 14px;
  border-top: 1px solid var(--border-color);
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hint {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0 0 10px;
}

.signature-input {
  width: 100%;
  padding: 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 13px;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  resize: vertical;
  min-height: 80px;
  transition: border-color var(--transition-fast);
}

.signature-input:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.signature-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
}

.signature-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.toggle-label input {
  display: none;
}

.toggle-switch {
  position: relative;
  width: 36px;
  height: 20px;
  background: var(--bg-button);
  border-radius: 10px;
  transition: background var(--transition-fast);
}

.toggle-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: var(--text-secondary);
  border-radius: 50%;
  transition: all var(--transition-fast);
}

.toggle-label input:checked + .toggle-switch {
  background: var(--accent-green);
}

.toggle-label input:checked + .toggle-switch::after {
  left: 18px;
  background: white;
}

.toggle-text {
  font-size: 12px;
  color: var(--text-primary);
}

.clear-btn {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: var(--border-radius);
  color: #f87171;
  font-size: 12px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}
</style>
