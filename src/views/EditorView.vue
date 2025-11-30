<template>
  <div class="editor-page">
    <main class="main-content">
      <div class="editor-container">
        <HistoryControls 
          :canUndo="historyManager.canUndo()"
          :canRedo="historyManager.canRedo()"
          :historyCount="historyManager.getHistoryCount()"
          :redoCount="historyManager.getRedoCount()"
          @undo="handleUndo"
          @redo="handleRedo"
        />
        <EditorToolbar @format="applyFormat" />
        <TextEditor 
          ref="editorRef"
          v-model="content" 
          :maxLength="STEAM_MAX_CHARS"
          @keydown="handleKeydown"
        />
        <CharacterCounter 
          :current="content.length" 
          :max="STEAM_MAX_CHARS" 
        />
        <AIAnalyzer :content="content" @update:content="content = $event" />
        <SignatureSettings ref="signatureRef" />
        <SteamGroupWidget />
      </div>
      <div class="preview-container">
        <PreviewHeader @copy="copyToClipboard" @save="saveCurrentReview" :showSave="true" />
        <ReviewPreview :content="content" />
      </div>
    </main>
    <CopyNotification :show="showCopyNotification" />
    
    <!-- Save modal -->
    <Teleport to="body">
      <div v-if="showSaveModal" class="modal-overlay" @click="showSaveModal = false">
        <div class="modal save-modal" @click.stop>
          <h3>{{ isEditing ? 'Сохранить изменения' : 'Сохранить обзор' }}</h3>
          <input 
            v-model="reviewName"
            type="text"
            placeholder="Название обзора..."
            class="name-input"
            @keydown.enter="confirmSave"
            ref="nameInputRef"
          />
          <div class="modal-actions">
            <button class="modal-btn cancel" @click="showSaveModal = false">Отмена</button>
            <button 
              class="modal-btn confirm" 
              :disabled="!reviewName.trim()"
              @click="confirmSave"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HistoryControls from '../components/editor/HistoryControls.vue'
import EditorToolbar from '../components/editor/EditorToolbar.vue'
import TextEditor from '../components/editor/TextEditor.vue'
import CharacterCounter from '../components/editor/CharacterCounter.vue'
import PreviewHeader from '../components/preview/PreviewHeader.vue'
import ReviewPreview from '../components/preview/ReviewPreview.vue'
import CopyNotification from '../components/ui/CopyNotification.vue'
import SteamGroupWidget from '../components/ui/SteamGroupWidget.vue'
import AIAnalyzer from '../components/ui/AIAnalyzer.vue'
import SignatureSettings from '../components/ui/SignatureSettings.vue'
import { STEAM_MAX_CHARS, STORAGE_KEY } from '../constants/steam'
import { createHistoryManager } from '../utils/historyManager'
import { getReviews, getReviewById, saveReview, updateReview } from '../utils/reviewStorage'

const route = useRoute()
const router = useRouter()

const content = ref('')
const historyManager = createHistoryManager()
const currentReviewId = ref(null)
const isEditing = ref(false)

// Save modal
const showSaveModal = ref(false)
const reviewName = ref('')
const nameInputRef = ref(null)

// Load content on mount
onMounted(() => {
  const reviewId = route.params.id
  
  if (reviewId) {
    // Load existing review
    const review = getReviewById(reviewId)
    if (review) {
      content.value = review.content
      currentReviewId.value = review.id
      reviewName.value = review.name
      isEditing.value = true
    } else {
      router.push('/editor')
    }
  } else {
    // Load draft from localStorage
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      content.value = saved
    }
  }
  
  historyManager.init(content.value)
})

// Auto-save draft to localStorage
watch(content, (newValue) => {
  if (!isEditing.value) {
    localStorage.setItem(STORAGE_KEY, newValue)
  }
  historyManager.push(newValue)
})

// Undo handler
const handleUndo = () => {
  const previousState = historyManager.undo(content.value)
  if (previousState !== null) {
    content.value = previousState
  }
}

// Redo handler
const handleRedo = () => {
  const nextState = historyManager.redo()
  if (nextState !== null) {
    content.value = nextState
  }
}

// Keyboard shortcuts
const handleKeydown = (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      handleUndo()
    } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
      e.preventDefault()
      handleRedo()
    } else if (e.key === 's') {
      e.preventDefault()
      saveCurrentReview()
    }
  }
}

const editorRef = ref(null)
const signatureRef = ref(null)
const showCopyNotification = ref(false)

const applyFormat = (format) => {
  editorRef.value?.applyFormat(format)
}

const saveCurrentReview = async () => {
  if (!content.value.trim()) return
  
  if (isEditing.value && currentReviewId.value) {
    // Update existing review
    updateReview(currentReviewId.value, {
      name: reviewName.value,
      content: content.value
    })
    showCopyNotification.value = true
    setTimeout(() => showCopyNotification.value = false, 2000)
  } else {
    // Show modal for new review
    showSaveModal.value = true
    await nextTick()
    nameInputRef.value?.focus()
  }
}

const confirmSave = () => {
  if (!reviewName.value.trim()) return
  
  if (isEditing.value && currentReviewId.value) {
    updateReview(currentReviewId.value, {
      name: reviewName.value,
      content: content.value
    })
  } else {
    const newReview = saveReview(reviewName.value.trim(), content.value)
    currentReviewId.value = newReview.id
    isEditing.value = true
    // Clear draft
    localStorage.removeItem(STORAGE_KEY)
    // Update URL
    router.replace(`/editor/${newReview.id}`)
  }
  
  showSaveModal.value = false
}

const copyToClipboard = async () => {
  try {
    let textToCopy = content.value
    const signature = signatureRef.value?.getSignature()
    if (signature) {
      textToCopy = content.value + '\n\n' + signature
    }
    await navigator.clipboard.writeText(textToCopy)
    showCopyNotification.value = true
    setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.editor-page {
  min-height: calc(100vh - 76px);
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
  max-width: 1700px;
  margin: 0 auto;
}

.editor-container,
.preview-container {
  background: linear-gradient(145deg, #1e2a38 0%, #1b2838 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 150px);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-normal);
}

.editor-container:hover,
.preview-container:hover {
  box-shadow: var(--shadow-lg);
}

.editor-container {
  border-top: 3px solid var(--accent-blue);
}

.preview-container {
  border-top: 3px solid var(--accent-green);
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
  margin: 0 0 16px;
  font-size: 18px;
  color: var(--text-primary);
}

.name-input {
  width: 100%;
  padding: 12px 14px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  margin-bottom: 20px;
  transition: border-color var(--transition-fast);
}

.name-input:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.name-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
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
  background: linear-gradient(135deg, var(--accent-green), #059669);
  border: none;
  color: white;
}

.modal-btn.confirm:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.modal-btn.confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 16px;
  }
  
  .editor-container,
  .preview-container {
    min-height: 500px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 12px;
  }
  
  .editor-container,
  .preview-container {
    padding: 14px;
    min-height: 400px;
  }
}
</style>
