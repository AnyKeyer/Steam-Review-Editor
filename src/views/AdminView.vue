<template>
  <div class="admin-page">
    <!-- Login form -->
    <div v-if="!isAuthenticated" class="login-container">
      <div class="login-form">
        <h2>{{ t.admin.login.title }}</h2>
        <input 
          v-model="password"
          type="password"
          :placeholder="t.admin.login.placeholder"
          class="password-input"
          @keydown.enter="login"
          autofocus
        />
        <button class="login-btn" @click="login" :disabled="!password || isLoading">
          {{ isLoading ? t.admin.login.checking : t.admin.login.button }}
        </button>
        <p v-if="loginError" class="login-error">{{ loginError }}</p>
        <router-link to="/feedback" class="back-link">{{ t.admin.login.back }}</router-link>
      </div>
    </div>

    <!-- Admin panel -->
    <div v-else class="admin-panel">
      <div class="admin-header">
        <h2>{{ t.admin.panel.title }}</h2>
        <div class="header-actions">
          <button class="refresh-btn" @click="loadFeedbacks" :disabled="isLoading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ spinning: isLoading }">
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
          <button class="logout-btn" @click="logout">{{ t.admin.panel.logout }}</button>
        </div>
      </div>

      <div class="stats">
        <div class="stat-card">
          <span class="stat-value">{{ feedbacks.length }}</span>
          <span class="stat-label">{{ t.admin.panel.total }}</span>
        </div>
        <div class="stat-card bug">
          <span class="stat-value">{{ feedbacks.filter(f => f.type === 'bug').length }}</span>
          <span class="stat-label">🐛 {{ t.admin.panel.bugs }}</span>
        </div>
        <div class="stat-card suggestion">
          <span class="stat-value">{{ feedbacks.filter(f => f.type === 'suggestion').length }}</span>
          <span class="stat-label">💡 {{ t.admin.panel.ideas }}</span>
        </div>
        <div class="stat-card review">
          <span class="stat-value">{{ feedbacks.filter(f => f.type === 'review').length }}</span>
          <span class="stat-label">⭐ {{ t.admin.panel.reviews }}</span>
        </div>
      </div>

      <div v-if="feedbacks.length" class="feedback-list">
        <div 
          v-for="fb in feedbacks" 
          :key="fb.id" 
          class="feedback-card"
          :class="[fb.type, fb.status]"
        >
          <div class="card-header">
            <div class="card-type">
              <span class="type-icon">{{ getTypeIcon(fb.type) }}</span>
              <span class="type-label">{{ getTypeLabel(fb.type) }}</span>
            </div>
            <div class="card-meta">
              <span class="author">{{ fb.name }}</span>
              <span class="date">{{ formatDate(fb.createdAt) }}</span>
            </div>
          </div>
          <div class="card-body">
            <p class="message">{{ fb.message }}</p>
          </div>
          <div class="card-footer">
            <select 
              :value="fb.status" 
              @change="changeStatus(fb.id, $event.target.value)"
              class="status-select"
            >
              <option value="new">{{ t.admin.panel.status.new }}</option>
              <option value="read">{{ t.admin.panel.status.read }}</option>
              <option value="resolved">{{ t.admin.panel.status.resolved }}</option>
            </select>
            <button class="delete-btn" @click="confirmDelete(fb)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>{{ t.admin.panel.empty }}</p>
      </div>
    </div>

    <!-- Delete modal -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="modal-overlay" @click="deleteTarget = null">
        <div class="modal" @click.stop>
          <h3>{{ t.admin.panel.deleteModal.title }}</h3>
          <p>{{ t.admin.panel.deleteModal.from }} {{ deleteTarget.name }}<br>{{ deleteTarget.message.slice(0, 100) }}...</p>
          <div class="modal-actions">
            <button class="modal-btn cancel" @click="deleteTarget = null">{{ t.admin.panel.deleteModal.cancel }}</button>
            <button class="modal-btn confirm" @click="doDelete">{{ t.admin.panel.deleteModal.delete }}</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getFeedbacks, deleteFeedback, updateFeedbackStatus } from '../utils/feedbackApi'
import { useI18n } from '../i18n'

const { t, locale } = useI18n()

const password = ref('')
const isAuthenticated = ref(false)
const isLoading = ref(false)
const loginError = ref(null)
const feedbacks = ref([])
const deleteTarget = ref(null)

// Check saved session
onMounted(() => {
  const saved = sessionStorage.getItem('admin_auth')
  if (saved) {
    password.value = saved
    isAuthenticated.value = true
    loadFeedbacks()
  }
})

const login = async () => {
  if (!password.value) return
  
  isLoading.value = true
  loginError.value = null
  
  try {
    await getFeedbacks(password.value)
    isAuthenticated.value = true
    sessionStorage.setItem('admin_auth', password.value)
    loadFeedbacks()
  } catch (err) {
    loginError.value = t.value.admin.login.error
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  isAuthenticated.value = false
  password.value = ''
  feedbacks.value = []
  sessionStorage.removeItem('admin_auth')
}

const loadFeedbacks = async () => {
  isLoading.value = true
  try {
    feedbacks.value = await getFeedbacks(password.value)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const changeStatus = async (id, status) => {
  try {
    await updateFeedbackStatus(id, status, password.value)
    const fb = feedbacks.value.find(f => f.id === id)
    if (fb) fb.status = status
  } catch (err) {
    console.error(err)
  }
}

const confirmDelete = (fb) => {
  deleteTarget.value = fb
}

const doDelete = async () => {
  if (!deleteTarget.value) return
  
  try {
    await deleteFeedback(deleteTarget.value.id, password.value)
    feedbacks.value = feedbacks.value.filter(f => f.id !== deleteTarget.value.id)
    deleteTarget.value = null
  } catch (err) {
    console.error(err)
  }
}

const getTypeIcon = (type) => {
  const icons = { bug: '🐛', suggestion: '💡', review: '⭐' }
  return icons[type] || '📝'
}

const getTypeLabel = (type) => {
  const labels = {
    bug: t.value.feedback.types.bug,
    suggestion: t.value.feedback.types.suggestion,
    review: t.value.feedback.types.review
  }
  return labels[type] || type
}

const formatDate = (timestamp) => {
  const loc = locale.value === 'ru' ? 'ru-RU' : 'en-US'
  return new Date(timestamp).toLocaleString(loc, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.admin-page {
  min-height: calc(100vh - 76px);
}

/* Login */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 76px);
  padding: 24px;
}

.login-form {
  background: linear-gradient(145deg, #1e2a38 0%, #1b2838 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 32px;
  text-align: center;
  min-width: 320px;
}

.login-form h2 {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0 0 24px;
}

.password-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  margin-bottom: 16px;
}

.password-input:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, var(--accent-blue), #2563eb);
  border: none;
  border-radius: var(--border-radius);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-error {
  color: #f87171;
  font-size: 13px;
  margin: 0 0 12px;
}

.back-link {
  color: var(--text-secondary);
  font-size: 13px;
  text-decoration: none;
}

.back-link:hover {
  color: var(--accent-blue);
}

/* Admin panel */
.admin-panel {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.admin-header h2 {
  font-size: 24px;
  color: var(--text-primary);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  cursor: pointer;
}

.refresh-btn svg {
  width: 18px;
  height: 18px;
}

.refresh-btn svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.logout-btn {
  padding: 10px 16px;
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: var(--border-radius);
  color: #f87171;
  font-size: 13px;
  cursor: pointer;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 16px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.stat-card.bug { border-left: 3px solid #ef4444; }
.stat-card.suggestion { border-left: 3px solid var(--accent-blue); }
.stat-card.review { border-left: 3px solid #f59e0b; }

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feedback-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.feedback-card.bug { border-left: 4px solid #ef4444; }
.feedback-card.suggestion { border-left: 4px solid var(--accent-blue); }
.feedback-card.review { border-left: 4px solid #f59e0b; }

.feedback-card.resolved { opacity: 0.6; }

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
}

.card-type {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-icon {
  font-size: 16px;
}

.type-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--text-secondary);
}

.author {
  font-weight: 500;
}

.card-body {
  padding: 16px;
}

.message {
  margin: 0;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  white-space: pre-wrap;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--border-color);
}

.status-select {
  padding: 8px 12px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 13px;
  cursor: pointer;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--border-radius);
  color: #f87171;
  cursor: pointer;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

.delete-btn svg {
  width: 16px;
  height: 16px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  max-width: 400px;
}

.modal h3 {
  margin: 0 0 12px;
  color: var(--text-primary);
}

.modal p {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--text-secondary);
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.modal-btn {
  padding: 10px 20px;
  border-radius: var(--border-radius);
  font-size: 14px;
  cursor: pointer;
}

.modal-btn.cancel {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.modal-btn.confirm {
  background: #ef4444;
  border: none;
  color: white;
}

@media (max-width: 768px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .admin-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
</style>
