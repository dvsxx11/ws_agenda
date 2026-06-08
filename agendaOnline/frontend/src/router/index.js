import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import AtendimentosPage from '../pages/AtendimentosPage.vue'
import FormPage from '../pages/FormPage.vue'

import { useAuthStore } from '../stores/authStore'

const routes = [
  {
    path: '/login',
    component: LoginPage
  },

  {
    path: '/',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },

  {
    path: '/atendimentos',
    component: AtendimentosPage,
    meta: { requiresAuth: true }
  },

  {
    path: '/atendimentos/novo',
    component: FormPage,
    meta: { requiresAuth: true }
  },

  {
    path: '/atendimentos/:id',
    component: FormPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {

  const auth = useAuthStore()

  await auth.carregarUsuario()

  if (
    to.meta.requiresAuth &&
    !auth.isAuthenticated
  ) {
    next('/login')
    return
  }

  next()
})

export default router