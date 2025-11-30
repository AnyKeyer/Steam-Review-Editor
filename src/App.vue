<template>
  <div class="app">
    <AppHeader />
    <main class="main-content">
      <div class="editor-container">
        <EditorToolbar @format="applyFormat" />
        <TextEditor 
          ref="editorRef"
          v-model="content" 
          :maxLength="STEAM_MAX_CHARS"
        />
        <CharacterCounter 
          :current="content.length" 
          :max="STEAM_MAX_CHARS" 
        />
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
import EditorToolbar from './components/editor/EditorToolbar.vue'
import TextEditor from './components/editor/TextEditor.vue'
import CharacterCounter from './components/editor/CharacterCounter.vue'
import PreviewHeader from './components/preview/PreviewHeader.vue'
import ReviewPreview from './components/preview/ReviewPreview.vue'
import CopyNotification from './components/ui/CopyNotification.vue'
import { STEAM_MAX_CHARS, STORAGE_KEY } from './constants/steam'

const content = ref('')

// Load saved content on mount
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    content.value = saved
  }
})

// Auto-save to localStorage
watch(content, (newValue) => {
  localStorage.setItem(STORAGE_KEY, newValue)
})
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
  background: var(--bg-dark);
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
}

.editor-container,
.preview-container {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 140px);
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .editor-container,
  .preview-container {
    min-height: 400px;
  }
}
</style>
