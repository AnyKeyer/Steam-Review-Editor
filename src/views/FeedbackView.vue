<template>
  <div class="feedback-page">
    <div class="page-header">
      <h2>Обратная связь</h2>
      <p class="subtitle">Сообщите о проблеме, предложите идею или оставьте отзыв</p>
    </div>

    <div class="feedback-form-container">
      <form @submit.prevent="submitForm" class="feedback-form">
        <div class="form-group">
          <label>Тип сообщения</label>
          <div class="type-buttons">
            <button 
              type="button"
              v-for="t in types" 
              :key="t.value"
              class="type-btn"
              :class="{ active: type === t.value, [t.value]: true }"
              @click="type = t.value"
            >
              <span class="type-icon">{{ t.icon }}</span>
              <span>{{ t.label }}</span>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="name">Ваше имя <span class="optional">(необязательно)</span></label>
          <input 
            id="name"
            v-model="name"
            type="text"
            placeholder="Аноним"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="message">Сообщение <span class="required">*</span></label>
          <textarea 
            id="message"
            v-model="message"
            placeholder="Опишите вашу проблему, идею или оставьте отзыв..."
            class="form-textarea"
            rows="6"
            required
          ></textarea>
          <div class="char-count">{{ message.length }} / 2000</div>
        </div>

        <button 
          type="submit" 
          class="submit-btn"
          :disabled="!message.trim() || isSubmitting"
        >
          <template v-if="isSubmitting">
            <span class="spinner"></span>
            Отправка...
          </template>
          <template v-else>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Отправить
          </template>
        </button>
      </form>

      <!-- Success message -->
      <div v-if="showSuccess" class="success-message">
        <div class="success-icon">✅</div>
        <h3>Спасибо за ваше сообщение!</h3>
        <p>Мы обязательно его рассмотрим</p>
        <button class="new-btn" @click="resetForm">Отправить ещё</button>
      </div>

      <!-- Error message -->
      <div v-if="error" class="error-message">
        <span>❌ {{ error }}</span>
        <button @click="error = null">✕</button>
      </div>
    </div>

    <!-- Hidden admin link -->
    <div class="admin-hint" @click="adminClickCount++" :class="{ active: adminClickCount >= 5 }">
      <router-link v-if="adminClickCount >= 5" to="/admin" class="admin-link">
        🔐 Админ
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { submitFeedback } from '../utils/feedbackApi'

const types = [
  { value: 'bug', label: 'Баг', icon: '🐛' },
  { value: 'suggestion', label: 'Предложение', icon: '💡' },
  { value: 'review', label: 'Отзыв', icon: '⭐' }
]

const type = ref('suggestion')
const name = ref('')
const message = ref('')
const isSubmitting = ref(false)
const showSuccess = ref(false)
const error = ref(null)
const adminClickCount = ref(0)

const submitForm = async () => {
  if (!message.value.trim() || isSubmitting.value) return
  
  isSubmitting.value = true
  error.value = null
  
  try {
    await submitFeedback(type.value, name.value, message.value)
    showSuccess.value = true
  } catch (err) {
    error.value = err.message
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  type.value = 'suggestion'
  name.value = ''
  message.value = ''
  showSuccess.value = false
}
</script>

<style scoped>
.feedback-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 24px;
  min-height: calc(100vh - 76px);
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.feedback-form-container {
  position: relative;
}

.feedback-form {
  background: linear-gradient(145deg, #1e2a38 0%, #1b2838 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.optional {
  font-weight: 400;
  color: var(--text-secondary);
}

.required {
  color: #f87171;
}

.type-buttons {
  display: flex;
  gap: 10px;
}

.type-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.type-btn:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

.type-btn.active.bug {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
}

.type-btn.active.suggestion {
  border-color: var(--accent-blue);
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent-blue);
}

.type-btn.active.review {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  color: #fbbf24;
}

.type-icon {
  font-size: 18px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 14px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  transition: border-color var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.char-count {
  text-align: right;
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, var(--accent-green), #059669);
  border: none;
  border-radius: var(--border-radius);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn svg {
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

.success-message {
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, #1e2a38 0%, #1b2838 100%);
  border: 1px solid var(--accent-green);
  border-radius: var(--border-radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.success-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.success-message h3 {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.success-message p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 24px;
}

.new-btn {
  padding: 12px 24px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.new-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-blue);
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--border-radius);
  color: #f87171;
  font-size: 13px;
}

.error-message button {
  background: none;
  border: none;
  color: #f87171;
  cursor: pointer;
  padding: 4px;
}

.admin-hint {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  opacity: 0.3;
  cursor: default;
  user-select: none;
}

.admin-hint.active {
  opacity: 1;
}

.admin-link {
  color: var(--text-secondary);
  font-size: 12px;
  text-decoration: none;
}

.admin-link:hover {
  color: var(--accent-blue);
}

@media (max-width: 600px) {
  .feedback-page {
    padding: 20px 16px;
  }
  
  .type-buttons {
    flex-direction: column;
  }
  
  .type-btn {
    justify-content: flex-start;
  }
}
</style>
