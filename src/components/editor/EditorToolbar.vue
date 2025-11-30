<template>
  <div class="toolbar">
    <div class="toolbar-group">
      <span class="group-label">Заголовки</span>
      <div class="group-buttons">
        <button
          v-for="option in headingOptions"
          :key="option.id"
          class="toolbar-btn toolbar-btn--heading"
          :title="option.title"
          @click="$emit('format', option)"
        >
          {{ option.icon }}
        </button>
      </div>
    </div>
    
    <div class="toolbar-divider"></div>
    
    <div class="toolbar-group">
      <span class="group-label">Текст</span>
      <div class="group-buttons">
        <button
          v-for="option in textOptions"
          :key="option.id"
          class="toolbar-btn"
          :class="getButtonClass(option.id)"
          :title="option.title"
          @click="$emit('format', option)"
        >
          {{ option.icon }}
        </button>
      </div>
    </div>
    
    <div class="toolbar-divider"></div>
    
    <div class="toolbar-group">
      <span class="group-label">Блоки</span>
      <div class="group-buttons">
        <button
          v-for="option in blockOptions"
          :key="option.id"
          class="toolbar-btn toolbar-btn--block"
          :title="option.title"
          @click="$emit('format', option)"
        >
          {{ option.icon }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FORMATTING_OPTIONS } from '@/constants/steam'

defineEmits(['format'])

const headingOptions = computed(() => 
  FORMATTING_OPTIONS.filter(o => ['h1', 'h2', 'h3'].includes(o.id))
)

const textOptions = computed(() => 
  FORMATTING_OPTIONS.filter(o => ['bold', 'italic', 'underline', 'strike', 'spoiler'].includes(o.id))
)

const blockOptions = computed(() => 
  FORMATTING_OPTIONS.filter(o => ['code', 'quote', 'url', 'list', 'olist', 'hr', 'noparse'].includes(o.id))
)

const getButtonClass = (id) => {
  return {
    'toolbar-btn--bold': id === 'bold',
    'toolbar-btn--italic': id === 'italic',
    'toolbar-btn--underline': id === 'underline',
    'toolbar-btn--strike': id === 'strike',
    'toolbar-btn--spoiler': id === 'spoiler',
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #0e1621 0%, #142230 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  margin-bottom: 14px;
}

.toolbar-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  padding-left: 2px;
}

.group-buttons {
  display: flex;
  gap: 4px;
}

.toolbar-divider {
  width: 1px;
  height: 50px;
  background: var(--border-color);
  margin: 0 4px;
  align-self: center;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  padding: 0 10px;
  background: var(--bg-button);
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.toolbar-btn:hover {
  background: var(--bg-button-hover);
  color: var(--text-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.toolbar-btn:active {
  transform: translateY(0);
}

.toolbar-btn--heading {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-blue);
}

.toolbar-btn--bold {
  font-weight: 800;
}

.toolbar-btn--italic {
  font-style: italic;
}

.toolbar-btn--underline {
  text-decoration: underline;
}

.toolbar-btn--strike {
  text-decoration: line-through;
}

.toolbar-btn--spoiler {
  background: #2d2d2d;
}

.toolbar-btn--block {
  font-size: 13px;
}

@media (max-width: 768px) {
  .toolbar {
    gap: 10px;
    padding: 12px;
  }
  
  .toolbar-divider {
    display: none;
  }
  
  .toolbar-group {
    width: 100%;
  }
  
  .group-buttons {
    flex-wrap: wrap;
  }
}
</style>
