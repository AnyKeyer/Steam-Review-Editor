<template>
  <button class="locale-switcher" @click="toggleLocale" :title="locale === 'ru' ? 'Switch to English' : 'Переключить на русский'">
    <span class="label">{{ locale === 'ru' ? 'RU' : 'EN' }}</span>
  </button>
</template>

<script setup>
import { useI18n } from '../../i18n'

const { locale, toggleLocale } = useI18n()
</script>

<style scoped>
.locale-switcher {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.locale-switcher:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  border-color: var(--accent-blue);
}

.label {
  letter-spacing: 0.05em;
}
</style>
