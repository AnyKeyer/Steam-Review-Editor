// History management for undo/redo functionality
const MAX_HISTORY_SIZE = 50

export const createHistoryManager = () => {
  const history = []
  const redoStack = []
  let lastSaveTime = 0
  const DEBOUNCE_MS = 1000 // Save to history every 1 second of inactivity

  return {
    // Add state to history (debounced)
    push(state) {
      const now = Date.now()
      
      // Debounce: only save if enough time passed since last save
      if (now - lastSaveTime < DEBOUNCE_MS && history.length > 0) {
        // Update the last entry instead of creating new one
        history[history.length - 1] = state
        return
      }
      
      // Don't add if same as last state
      if (history.length > 0 && history[history.length - 1] === state) {
        return
      }

      history.push(state)
      lastSaveTime = now
      
      // Clear redo stack when new changes are made
      redoStack.length = 0
      
      // Limit history size
      if (history.length > MAX_HISTORY_SIZE) {
        history.shift()
      }
    },

    // Force push (ignores debounce)
    forcePush(state) {
      if (history.length > 0 && history[history.length - 1] === state) {
        return
      }
      
      history.push(state)
      lastSaveTime = Date.now()
      redoStack.length = 0
      
      if (history.length > MAX_HISTORY_SIZE) {
        history.shift()
      }
    },

    // Undo: go back in history
    undo(currentState) {
      if (history.length <= 1) {
        return null
      }
      
      // Save current state to redo stack
      redoStack.push(currentState)
      
      // Remove current state from history
      history.pop()
      
      // Return previous state
      return history[history.length - 1] || ''
    },

    // Redo: go forward
    redo() {
      if (redoStack.length === 0) {
        return null
      }
      
      const state = redoStack.pop()
      history.push(state)
      
      return state
    },

    // Check if undo is available
    canUndo() {
      return history.length > 1
    },

    // Check if redo is available
    canRedo() {
      return redoStack.length > 0
    },

    // Get history count
    getHistoryCount() {
      return history.length
    },

    // Get redo count
    getRedoCount() {
      return redoStack.length
    },

    // Clear all history
    clear() {
      history.length = 0
      redoStack.length = 0
    },

    // Initialize with a state
    init(state) {
      history.length = 0
      redoStack.length = 0
      if (state) {
        history.push(state)
      }
    }
  }
}
