<template>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <router-link to="/" class="logo">
          <div class="logo-icon-wrapper">
            <span class="logo-icon">✍️</span>
          </div>
          <div class="logo-text">
            <h1>{{ t.appName }}</h1>
          </div>
        </router-link>
        
        <nav class="nav">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            {{ t.nav.myReviews }}
          </router-link>
          <router-link to="/editor" class="nav-link" :class="{ active: $route.path.startsWith('/editor') }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            {{ t.nav.editor }}
          </router-link>
          <router-link to="/feedback" class="nav-link" :class="{ active: $route.path === '/feedback' }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {{ t.nav.feedback }}
          </router-link>
        </nav>
      </div>
      
      <div class="header-right">
        <LocaleSwitcher />
        <p class="copyright">
          {{ t.madeBy }} 
          <a href="https://steamcommunity.com/id/kassandr4_" target="_blank" rel="noopener">kassandr4_</a>
          <span class="heart">🤍</span>
        </p>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from '../../i18n'
import LocaleSwitcher from '../ui/LocaleSwitcher.vue'

const { t } = useI18n()
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #171a21 0%, #1b2838 50%, #1e3a4c 100%);
  padding: 14px 24px;
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

.header-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.logo:hover {
  transform: scale(1.02);
}

.logo-icon-wrapper {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #67c1f5 0%, #4a9fd4 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(103, 193, 245, 0.3);
}

.logo-icon {
  font-size: 22px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo h1 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-light);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.nav {
  display: flex;
  gap: 6px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--border-radius);
  transition: all var(--transition-fast);
}

.nav-link svg {
  width: 16px;
  height: 16px;
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.nav-link.active {
  color: var(--accent-blue);
  background: rgba(59, 130, 246, 0.1);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.copyright {
  color: var(--text-secondary);
  font-size: 13px;
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

@media (max-width: 900px) {
  .header-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .header-left {
    flex-direction: column;
    gap: 12px;
  }
  
  .copyright {
    display: none;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 12px 16px;
  }
  
  .logo h1 {
    font-size: 16px;
  }
  
  .nav-link {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .nav-link svg {
    width: 14px;
    height: 14px;
  }
}
</style>
