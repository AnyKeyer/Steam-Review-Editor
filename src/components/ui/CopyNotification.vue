<template>
  <Transition name="notification">
    <div v-if="show" class="notification">
      <div class="icon-wrapper">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span class="text">Скопировано в буфер обмена!</span>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #5ba32b 0%, #4a8c23 100%);
  color: var(--text-light);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(91, 163, 43, 0.4);
  z-index: 1000;
}

.icon-wrapper {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 14px;
  height: 14px;
}

.notification-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(40px) scale(0.9);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}
</style>
