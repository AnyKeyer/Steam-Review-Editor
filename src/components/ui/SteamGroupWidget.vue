<template>
  <div class="group-widget">
    <a :href="groupUrl" target="_blank" rel="noopener" class="widget-link">
      <div class="widget-header">
        <div class="steam-icon-wrapper">
          <svg class="steam-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <span class="widget-title">Steam Куратор</span>
        <span class="widget-badge">Рекомендуем</span>
      </div>
      <div class="widget-content">
        <div class="group-avatar">
          <img :src="avatarUrl" :alt="groupName" />
          <div class="avatar-glow"></div>
        </div>
        <div class="group-info">
          <h3 class="group-name">{{ groupName }}</h3>
          <p class="group-desc">{{ description }}</p>
        </div>
      </div>
      <div class="widget-footer">
        <span class="join-text">
          <svg class="join-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Подписаться
        </span>
      </div>
    </a>
  </div>
</template>

<script setup>
defineProps({
  groupUrl: {
    type: String,
    default: 'https://store.steampowered.com/curator/45695689/'
  },
  groupName: {
    type: String,
    default: 'Anatomy of Fear'
  },
  description: {
    type: String,
    default: 'Присоединяйся к нашему сообществу!'
  },
  avatarUrl: {
    type: String,
    default: 'https://avatars.akamai.steamstatic.com/1d3c2469a8bdd534f44028f61ef29d63898e500f_full.jpg'
  }
})
</script>

<style scoped>
.group-widget {
  margin-top: 20px;
}

.widget-link {
  display: block;
  background: linear-gradient(145deg, rgba(27, 40, 56, 0.9) 0%, rgba(42, 71, 94, 0.9) 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 16px;
  text-decoration: none;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.widget-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #67c1f5, #1a9fff);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.widget-link:hover {
  border-color: #67c1f5;
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg), 0 0 20px rgba(103, 193, 245, 0.15);
}

.widget-link:hover::before {
  opacity: 1;
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(103, 193, 245, 0.15);
}

.steam-icon-wrapper {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #67c1f5 0%, #1a9fff 100%);
  border-radius: 6px;
}

.steam-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.widget-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  font-weight: 600;
  flex: 1;
}

.widget-badge {
  font-size: 10px;
  padding: 3px 8px;
  background: rgba(103, 193, 245, 0.15);
  border: 1px solid rgba(103, 193, 245, 0.3);
  border-radius: 10px;
  color: #67c1f5;
  font-weight: 500;
}

.widget-content {
  display: flex;
  gap: 14px;
  align-items: center;
}

.group-avatar {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid rgba(103, 193, 245, 0.4);
  position: relative;
  transition: all var(--transition-fast);
}

.widget-link:hover .group-avatar {
  border-color: #67c1f5;
  box-shadow: 0 0 15px rgba(103, 193, 245, 0.3);
}

.group-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, transparent 0%, rgba(103, 193, 245, 0.2) 100%);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.widget-link:hover .avatar-glow {
  opacity: 1;
}

.group-info {
  flex: 1;
  min-width: 0;
}

.group-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-light);
  margin: 0 0 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color var(--transition-fast);
}

.widget-link:hover .group-name {
  color: #67c1f5;
}

.group-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

.widget-footer {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(103, 193, 245, 0.15);
  text-align: center;
}

.join-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #67c1f5;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.join-icon {
  width: 14px;
  height: 14px;
  transition: transform var(--transition-fast);
}

.widget-link:hover .join-text {
  color: var(--text-light);
}

.widget-link:hover .join-icon {
  transform: translate(2px, -2px);
}
</style>
