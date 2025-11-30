<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <span class="logo-icon">🎮</span>
        <h1>Steam Review Editor</h1>
      </div>
      <p class="copyright">
        Сделано по спецзаказу для 
        <a href="https://steamcommunity.com/id/kassandr4_" target="_blank" rel="noopener">kassandr4_</a>
      </p>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(to right, #171a21, #1b2838);
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 28px;
}

.logo h1 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-light);
}

.copyright {
  color: var(--text-secondary);
  font-size: 14px;
}

.copyright a {
  color: var(--text-link);
  text-decoration: none;
  transition: color 0.15s ease;
}

.copyright a:hover {
  color: var(--text-light);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .logo h1 {
    font-size: 20px;
  }
}
</style>
