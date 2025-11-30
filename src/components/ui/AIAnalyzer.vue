<template>
  <div class="ai-analyzer">
    <div class="analyzer-header">
      <div class="header-left">
        <div class="ai-icon-wrapper">
          <svg class="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
            <circle cx="7.5" cy="14.5" r="1.5"></circle>
            <circle cx="16.5" cy="14.5" r="1.5"></circle>
          </svg>
        </div>
        <div class="header-text">
          <span class="title">ИИ Помощник</span>
          <span class="subtitle">Экспериментальная функция</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button 
        class="action-btn analyze-btn"
        :class="{ loading: isAnalyzing }"
        :disabled="isAnalyzing || isStylizing || !content.trim()"
        @click="runAnalysis"
        title="Проверит орфографию, грамматику и пунктуацию"
      >
        <template v-if="isAnalyzing">
          <span class="spinner"></span>
          <span>Анализирую...</span>
        </template>
        <template v-else>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <span>Проверить</span>
        </template>
      </button>
      
      <button 
        class="action-btn stylize-btn"
        :class="{ loading: isStylizing }"
        :disabled="isAnalyzing || isStylizing || !content.trim()"
        @click="runStylize"
        title="Автоматически добавит заголовки, выделения и списки (текст не изменится)"
      >
        <template v-if="isStylizing">
          <span class="spinner"></span>
          <span>Стилизую...</span>
        </template>
        <template v-else>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <span>Стилизовать</span>
        </template>
      </button>
    </div>

    <!-- Results -->
    <div v-if="errors.length > 0 || noErrors || error || successMessage" class="result-container">
      <!-- Error state -->
      <div v-if="error" class="result error">
        <div class="result-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <span>Ошибка</span>
        </div>
        <p>{{ error }}</p>
      </div>

      <!-- Success message (for stylize) -->
      <div v-else-if="successMessage" class="result success">
        <div class="result-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Готово</span>
        </div>
        <p>{{ successMessage }}</p>
      </div>

      <!-- No errors found -->
      <div v-else-if="noErrors" class="result success">
        <div class="result-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Отлично!</span>
        </div>
        <p>Ошибок не найдено. Текст написан грамотно!</p>
      </div>

      <!-- Interactive errors list -->
      <div v-else-if="errors.length > 0" class="errors-list">
        <div class="errors-header">
          <span class="errors-count">Найдено ошибок: {{ errors.length }}</span>
          <button 
            v-if="errors.length > 0" 
            class="fix-all-btn"
            @click="fixAllErrors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Исправить все
          </button>
        </div>
        
        <div 
          v-for="(err, index) in errors" 
          :key="index"
          class="error-item"
          :class="{ fixed: err.fixed }"
        >
          <div class="error-type">{{ err.type }}</div>
          <div class="error-content">
            <div class="error-wrong">
              <span class="label">Ошибка:</span>
              <span class="wrong-text">{{ err.wrong }}</span>
            </div>
            <div class="error-arrow">→</div>
            <div class="error-correct">
              <span class="label">Исправить на:</span>
              <span class="correct-text">{{ err.correct }}</span>
            </div>
          </div>
          <div v-if="err.hint" class="error-hint">{{ err.hint }}</div>
          <button 
            v-if="!err.fixed"
            class="fix-btn"
            @click="fixError(index)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Исправить
          </button>
          <div v-else class="fixed-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Исправлено
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { analyzeText, stylizeText } from '@/utils/geminiAnalyzer'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:content'])

const isAnalyzing = ref(false)
const isStylizing = ref(false)
const errors = ref([])
const noErrors = ref(false)
const error = ref('')
const successMessage = ref('')

// Clean JSON from markdown code blocks
const cleanJsonResponse = (text) => {
  // Remove ```json ... ``` or ``` ... ```
  let cleaned = text.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3)
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3)
  }
  return cleaned.trim()
}

const runAnalysis = async () => {
  isAnalyzing.value = true
  error.value = ''
  errors.value = []
  noErrors.value = false
  successMessage.value = ''

  try {
    const result = await analyzeText(props.content)
    
    // Clean and parse JSON response
    try {
      const cleanedResult = cleanJsonResponse(result)
      const parsed = JSON.parse(cleanedResult)
      
      if (parsed.noErrors) {
        noErrors.value = true
      } else if (Array.isArray(parsed)) {
        errors.value = parsed.map(e => ({ ...e, fixed: false }))
      } else {
        error.value = 'Неожиданный формат ответа'
      }
    } catch (parseError) {
      // Fallback: if not JSON, show as plain text error
      console.error('Parse error:', parseError, 'Raw result:', result)
      error.value = 'Не удалось разобрать ответ ИИ. Попробуйте ещё раз.'
    }
  } catch (e) {
    error.value = e.message
  } finally {
    isAnalyzing.value = false
  }
}

const runStylize = async () => {
  isStylizing.value = true
  error.value = ''
  errors.value = []
  noErrors.value = false
  successMessage.value = ''

  try {
    const stylizedText = await stylizeText(props.content)
    emit('update:content', stylizedText)
    successMessage.value = 'Текст успешно стилизован! BBCode теги добавлены.'
  } catch (e) {
    error.value = e.message
  } finally {
    isStylizing.value = false
  }
}

const fixError = (index) => {
  const err = errors.value[index]
  if (err.fixed) return
  
  const newContent = props.content.replace(err.wrong, err.correct)
  emit('update:content', newContent)
  errors.value[index].fixed = true
}

const fixAllErrors = () => {
  let newContent = props.content
  
  errors.value.forEach((err, index) => {
    if (!err.fixed) {
      newContent = newContent.replace(err.wrong, err.correct)
      errors.value[index].fixed = true
    }
  })
  
  emit('update:content', newContent)
}
</script>

<style scoped>
.ai-analyzer {
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(145deg, rgba(138, 43, 226, 0.08) 0%, rgba(75, 0, 130, 0.08) 100%);
  border: 1px solid rgba(138, 43, 226, 0.25);
  border-radius: var(--border-radius-lg);
}

.analyzer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai-icon-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

.ai-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-light);
}

.subtitle {
  font-size: 11px;
  color: var(--text-secondary);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: var(--border-radius);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.analyze-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
}

.analyze-btn:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.analyze-btn.loading {
  background: linear-gradient(135deg, #6b5ce7 0%, #5356d1 100%);
}

.stylize-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.stylize-btn:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
}

.stylize-btn.loading {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Results */
.result-container {
  margin-top: 14px;
}

.result {
  padding: 14px;
  border-radius: var(--border-radius);
  font-size: 13px;
  line-height: 1.6;
}

.result.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.result.success {
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: var(--text-primary);
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
}

.result-header svg {
  width: 18px;
  height: 18px;
}

.result.error .result-header svg {
  color: #f87171;
}

.result.success .result-header svg {
  color: #4ade80;
}

/* Errors List */
.errors-list {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.errors-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: rgba(239, 68, 68, 0.1);
  border-bottom: 1px solid var(--border-color);
}

.errors-count {
  font-size: 13px;
  font-weight: 600;
  color: #fca5a5;
}

.fix-all-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border: none;
  border-radius: var(--border-radius);
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.fix-all-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
}

.fix-all-btn svg {
  width: 14px;
  height: 14px;
}

.error-item {
  padding: 14px;
  border-bottom: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.error-item:last-child {
  border-bottom: none;
}

.error-item.fixed {
  opacity: 0.5;
  background: rgba(34, 197, 94, 0.05);
}

.error-type {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #a78bfa;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.error-wrong,
.error-correct {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 10px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.wrong-text {
  padding: 6px 10px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 4px;
  color: #fca5a5;
  font-size: 13px;
  text-decoration: line-through;
}

.correct-text {
  padding: 6px 10px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 4px;
  color: #86efac;
  font-size: 13px;
  font-weight: 500;
}

.error-arrow {
  color: var(--text-secondary);
  font-size: 16px;
}

.error-hint {
  font-size: 12px;
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 10px;
}

.fix-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: transparent;
  border: 1px solid rgba(34, 197, 94, 0.5);
  border-radius: var(--border-radius);
  color: #86efac;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.fix-btn:hover {
  background: rgba(34, 197, 94, 0.15);
  border-color: #22c55e;
}

.fix-btn svg {
  width: 14px;
  height: 14px;
}

.fixed-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(34, 197, 94, 0.1);
  border-radius: var(--border-radius);
  color: #4ade80;
  font-size: 12px;
  font-weight: 500;
}

.fixed-badge svg {
  width: 14px;
  height: 14px;
}

@media (max-width: 768px) {
  .ai-analyzer {
    padding: 12px;
  }
  
  .header-text .subtitle {
    display: none;
  }
  
  .error-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .error-arrow {
    transform: rotate(90deg);
  }
}
</style>
