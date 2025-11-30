<template>
  <div class="app">
    <AppHeader />
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
        <SteamGroupWidget />
      </div>
      <div class="preview-container">
        <PreviewHeader @copy="copyToClipboard" />
        <ReviewPreview :content="content" />
      </div>
    </main>
    <CopyNotification :show="showCopyNotification" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import HistoryControls from './components/editor/HistoryControls.vue'
import EditorToolbar from './components/editor/EditorToolbar.vue'
import TextEditor from './components/editor/TextEditor.vue'
import CharacterCounter from './components/editor/CharacterCounter.vue'
import PreviewHeader from './components/preview/PreviewHeader.vue'
import ReviewPreview from './components/preview/ReviewPreview.vue'
import CopyNotification from './components/ui/CopyNotification.vue'
import SteamGroupWidget from './components/ui/SteamGroupWidget.vue'
import AIAnalyzer from './components/ui/AIAnalyzer.vue'
import { STEAM_MAX_CHARS, STORAGE_KEY } from './constants/steam'
import { createHistoryManager } from './utils/historyManager'

const content = ref('')
const historyManager = createHistoryManager()

// Load saved content on mount
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    content.value = saved
  }
  historyManager.init(content.value)
})

// Auto-save to localStorage and history
watch(content, (newValue) => {
  localStorage.setItem(STORAGE_KEY, newValue)
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

// Keyboard shortcuts (Ctrl+Z / Ctrl+Y)
const handleKeydown = (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      handleUndo()
    } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
      e.preventDefault()
      handleRedo()
    }
  }
}
const editorRef = ref(null)
const showCopyNotification = ref(false)

const applyFormat = (format) => {
  editorRef.value?.applyFormat(format)
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(content.value)
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
.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #171d25 0%, #1b2838 100%);
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
  min-height: calc(100vh - 120px);
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
