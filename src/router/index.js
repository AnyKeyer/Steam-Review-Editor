import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '../views/EditorView.vue'
import ReviewsView from '../views/ReviewsView.vue'
import FeedbackView from '../views/FeedbackView.vue'
import AdminView from '../views/AdminView.vue'

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
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: FeedbackView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
