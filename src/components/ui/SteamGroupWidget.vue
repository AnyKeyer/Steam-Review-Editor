<template>
  <div class="group-widget">
    <a :href="groupUrl" target="_blank" rel="noopener" class="widget-link">
      <div class="widget-header">
        <span class="steam-icon">🎮</span>
        <span class="widget-title">Steam Куратор</span>
      </div>
      <div class="widget-content">
        <div class="group-avatar">
          <img :src="avatarUrl" :alt="groupName" />
        </div>
        <div class="group-info">
          <h3 class="group-name">{{ groupName }}</h3>
          <p class="group-desc">{{ description }}</p>
        </div>
      </div>
      <div class="widget-footer">
        <span class="join-text">Подписаться →</span>
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
  margin-top: 16px;
}

.widget-link {
  display: block;
  background: linear-gradient(135deg, #1b2838 0%, #2a475e 100%);
  border: 1px solid #3d6a8c;
  border-radius: 6px;
  padding: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.widget-link:hover {
  border-color: #67c1f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(103, 193, 245, 0.2);
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(103, 193, 245, 0.2);
}

.steam-icon {
  font-size: 18px;
}

.widget-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #67c1f5;
  font-weight: 500;
}

.widget-content {
  display: flex;
  gap: 12px;
  align-items: center;
}

.group-avatar {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #3d6a8c;
}

.group-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.group-info {
  flex: 1;
  min-width: 0;
}

.group-name {
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.group-desc {
  font-size: 12px;
  color: #8f98a0;
  margin: 0;
  line-height: 1.4;
}

.widget-footer {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(103, 193, 245, 0.2);
  text-align: center;
}

.join-text {
  font-size: 13px;
  color: #67c1f5;
  font-weight: 500;
  transition: color 0.15s ease;
}

.widget-link:hover .join-text {
  color: #ffffff;
}
</style>
