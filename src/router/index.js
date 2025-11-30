import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '../views/EditorView.vue'
import ReviewsView from '../views/ReviewsView.vue'

const routes = [
  {
    path: '/',
    name: 'reviews',
    component: ReviewsView
  },
  {
    path: '/editor',
    name: 'editor',
    component: EditorView
  },
  {
    path: '/editor/:id',
    name: 'editor-review',
    component: EditorView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
