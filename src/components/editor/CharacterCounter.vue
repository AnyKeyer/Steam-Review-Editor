<template>
  <div class="counter-wrapper">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressWidth }" :class="counterClass"></div>
    </div>
    <div class="counter" :class="counterClass">
      <span class="current">{{ current.toLocaleString() }}</span>
      <span class="separator">/</span>
      <span class="max">{{ max.toLocaleString() }}</span>
      <span class="label">символов</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 8000
  }
})

const progressWidth = computed(() => {
  const percentage = Math.min((props.current / props.max) * 100, 100)
  return `${percentage}%`
})

const counterClass = computed(() => {
  const percentage = (props.current / props.max) * 100
  if (percentage >= 100) return 'counter--error'
  if (percentage >= 90) return 'counter--warning'
  if (percentage >= 75) return 'counter--caution'
  return ''
})
</script>

<style scoped>
.counter-wrapper {
  padding: 12px 0;
}

.progress-bar {
  height: 4px;
  background: var(--bg-input);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--accent-blue);
  border-radius: 2px;
  transition: width 0.3s ease, background 0.3s ease;
}

.progress-fill.counter--caution {
  background: #f0b232;
}

.progress-fill.counter--warning {
  background: #e87d0d;
}

.progress-fill.counter--error {
  background: var(--accent-red);
}

.counter {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);
  justify-content: flex-end;
}

.current {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
}

.counter--caution .current {
  color: #f0b232;
}

.counter--warning .current {
  color: #e87d0d;
}

.counter--error .current {
  color: var(--accent-red);
}

.separator {
  opacity: 0.5;
}

.label {
  margin-left: 4px;
}
</style>
