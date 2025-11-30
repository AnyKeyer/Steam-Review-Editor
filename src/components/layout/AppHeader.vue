<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <div class="logo-icon-wrapper">
          <span class="logo-icon">✍️</span>
        </div>
        <div class="logo-text">
          <h1>Steam Review Editor</h1>
        </div>
      </div>
      <p class="copyright">
        Сделано для 
        <a href="https://steamcommunity.com/id/kassandr4_" target="_blank" rel="noopener">kassandr4_</a>
        <span class="heart">🤍</span>
      </p>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #171a21 0%, #1b2838 50%, #1e3a4c 100%);
  padding: 18px 24px;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-icon-wrapper {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #67c1f5 0%, #4a9fd4 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(103, 193, 245, 0.3);
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo h1 {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-light);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.logo-subtitle {
  font-size: 12px;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}

.copyright {
  color: var(--text-secondary);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.copyright a {
  color: var(--text-link);
  text-decoration: none;
  transition: all var(--transition-fast);
  font-weight: 500;
}

.copyright a:hover {
  color: var(--text-light);
  text-shadow: 0 0 8px rgba(103, 193, 245, 0.5);
}

.heart {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

@media (max-width: 768px) {
  .header {
    padding: 14px 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .logo {
    flex-direction: column;
    gap: 8px;
  }
  
  .logo-text {
    align-items: center;
  }
  
  .logo h1 {
    font-size: 18px;
  }
}
</style>
