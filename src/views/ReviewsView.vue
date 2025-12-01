<template>
  <div class="reviews-page">
    <div class="page-header">
      <h2>{{ t.reviews.title }}</h2>
      <router-link to="/editor" class="new-review-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        {{ t.reviews.newReview }}
      </router-link>
    </div>

    <div v-if="reviews.length" class="reviews-grid">
      <div 
        v-for="review in sortedReviews" 
        :key="review.id" 
        class="review-card"
      >
        <div class="card-header">
          <h3 class="review-name">{{ review.name }}</h3>
          <div class="review-meta">
            <span class="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {{ formatDate(review.updatedAt) }}
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              {{ review.content.length }} {{ t.reviews.chars }}
            </span>
          </div>
        </div>
        
        <div class="card-preview">
          {{ getPreviewText(review.content) }}
        </div>
        
        <div class="card-actions">
          <router-link :to="`/editor/${review.id}`" class="action-btn edit-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            {{ t.reviews.edit }}
          </router-link>
          <button class="action-btn copy-btn" @click="copyReview(review)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            {{ t.reviews.copy }}
          </button>
          <button class="action-btn delete-btn" @click="confirmDelete(review)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h3>{{ t.reviews.empty.title }}</h3>
      <p>{{ t.reviews.empty.subtitle }}</p>
      <router-link to="/editor" class="create-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        {{ t.reviews.empty.create }}
      </router-link>
    </div>

    <!-- Delete confirmation modal -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="modal-overlay" @click="deleteTarget = null">
        <div class="modal" @click.stop>
          <h3>{{ t.reviews.deleteModal.title }}</h3>
          <p>{{ t.reviews.deleteModal.confirm }} "{{ deleteTarget.name }}"?<br>{{ t.reviews.deleteModal.warning }}</p>
          <div class="modal-actions">
            <button class="modal-btn cancel" @click="deleteTarget = null">{{ t.reviews.deleteModal.cancel }}</button>
            <button class="modal-btn confirm" @click="doDelete">{{ t.reviews.deleteModal.delete }}</button>
          </div>
        </div>
      </div>
    </Teleport>

    <CopyNotification :show="showCopyNotification" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CopyNotification from '../components/ui/CopyNotification.vue'
import { getReviews, deleteReview } from '../utils/reviewStorage'
import { useI18n } from '../i18n'

const { t, locale } = useI18n()

const reviews = ref([])
const deleteTarget = ref(null)
const showCopyNotification = ref(false)

const sortedReviews = computed(() => {
  return [...reviews.value].sort((a, b) => b.updatedAt - a.updatedAt)
})

onMounted(() => {
  loadReviews()
})

const loadReviews = () => {
  reviews.value = getReviews()
}

const getPreviewText = (content) => {
  // Remove BBCode tags and truncate
  const clean = content.replace(/\[.*?\]/g, '').trim()
  return clean.length > 150 ? clean.slice(0, 150) + '...' : clean
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) return 'только что'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} мин. назад`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} ч. назад`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} дн. назад`
  
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

const copyReview = async (review) => {
  try {
    // Get signature if enabled
    const SIGNATURE_KEY = 'steam_review_signature'
    const SIGNATURE_ENABLED_KEY = 'steam_review_signature_enabled'
    const signature = localStorage.getItem(SIGNATURE_KEY) || ''
    const enabled = localStorage.getItem(SIGNATURE_ENABLED_KEY) !== 'false'
    
    let textToCopy = review.content
    if (enabled && signature) {
      textToCopy = review.content + '\n\n' + signature
    }
    
    await navigator.clipboard.writeText(textToCopy)
    showCopyNotification.value = true
    setTimeout(() => showCopyNotification.value = false, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const confirmDelete = (review) => {
  deleteTarget.value = review
}

const doDelete = () => {
  if (deleteTarget.value) {
    deleteReview(deleteTarget.value.id)
    loadReviews()
    deleteTarget.value = null
  }
}
</script>

<style scoped>
.reviews-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  min-height: calc(100vh - 76px);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.page-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.new-review-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--accent-blue), #2563eb);
  border: none;
  border-radius: var(--border-radius);
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.new-review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.new-review-btn svg {
  width: 18px;
  height: 18px;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.review-card {
  background: linear-gradient(145deg, #1e2a38 0%, #1b2838 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  transition: all var(--transition-normal);
}

.review-card:hover {
  border-color: var(--accent-blue);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: 12px;
}

.review-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.review-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-secondary);
}

.meta-item svg {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

.card-preview {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--bg-tertiary);
  border-radius: var(--border-radius);
  min-height: 60px;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--border-radius);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.action-btn svg {
  width: 14px;
  height: 14px;
}

.edit-btn {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: var(--accent-blue);
  flex: 1;
  justify-content: center;
}

.edit-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: var(--accent-blue);
}

.copy-btn {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: var(--accent-green);
  flex: 1;
  justify-content: center;
}

.copy-btn:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: var(--accent-green);
}

.delete-btn {
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  padding: 8px 10px;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: var(--bg-tertiary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.empty-icon svg {
  width: 40px;
  height: 40px;
  color: var(--text-secondary);
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.empty-state p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 24px;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--accent-green), #059669);
  border: none;
  border-radius: var(--border-radius);
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.create-btn svg {
  width: 18px;
  height: 18px;
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
  animation: fadeIn 0.15s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  min-width: 360px;
  max-width: 450px;
  animation: scaleIn 0.15s ease;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal h3 {
  margin: 0 0 12px;
  font-size: 18px;
  color: var(--text-primary);
}

.modal p {
  margin: 0 0 20px;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
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
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.modal-btn.cancel {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.modal-btn.cancel:hover {
  background: var(--bg-tertiary);
}

.modal-btn.confirm {
  background: #ef4444;
  border: none;
  color: white;
}

.modal-btn.confirm:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .reviews-page {
    padding: 20px 16px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .page-header h2 {
    font-size: 24px;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  
  .card-actions {
    flex-wrap: wrap;
  }
  
  .edit-btn, .copy-btn {
    flex: 1 1 calc(50% - 5px);
  }
  
  .delete-btn {
    flex: 0;
  }
}
</style>
