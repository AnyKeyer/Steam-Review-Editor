<template>
  <div class="counter" :class="counterClass">
    <span class="current">{{ current.toLocaleString() }}</span>
    <span class="separator">/</span>
    <span class="max">{{ max.toLocaleString() }}</span>
    <span class="label">символов</span>
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

const counterClass = computed(() => {
  const percentage = (props.current / props.max) * 100
  if (percentage >= 100) return 'counter--error'
  if (percentage >= 90) return 'counter--warning'
  if (percentage >= 75) return 'counter--caution'
  return ''
})
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  font-size: 14px;
  color: var(--text-secondary);
  text-align: right;
  justify-content: flex-end;
}

.current {
  font-weight: 600;
  color: var(--text-primary);
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
