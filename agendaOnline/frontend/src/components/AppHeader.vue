<template>
  <nav class="navbar navbar-expand-lg custom-navbar shadow">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/">
        🏠 WS Agenda Online
      </RouterLink>

```
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div
    id="navbarNav"
    class="collapse navbar-collapse"
  >
    <ul class="navbar-nav me-auto">
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          to="/"
        >
          Dashboard
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink
          class="nav-link"
          to="/atendimentos"
        >
          Atendimentos
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink
          class="nav-link"
          to="/atendimentos/novo"
        >
          + Novo Atendimento
        </RouterLink>
      </li>
    </ul>

    <div class="d-flex align-items-center gap-3">
      <span
        v-if="auth.user"
        class="user-email"
      >
        {{ auth.user.email }}
      </span>

      <button
        class="btn btn-logout"
        @click="sair"
      >
        Sair
      </button>
    </div>
  </div>
</div>
```

  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const auth = useAuthStore()

async function sair() {
  try {
    await auth.logout()
    router.push('/login')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.custom-navbar {
  background: linear-gradient(
    135deg,
    #6b3a1f,
    #4a2812
  );
}

.navbar-brand {
  color: #c9a03d !important;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
}

.nav-link {
  color: #ffffff !important;
  font-weight: 500;
  transition: all 0.25s ease;
}

.nav-link:hover {
  color: #dab45f !important;
  transform: translateY(-1px);
}

.router-link-active {
  color: #c9a03d !important;
  font-weight: 700;
}

.user-email {
  color: #f8f6f3;
  font-size: 0.9rem;
}

.btn-logout {
  border: 1px solid #c9a03d;
  color: #c9a03d;
  background: transparent;
  border-radius: 10px;
  padding: 0.45rem 1rem;
  transition: all 0.25s ease;
}

.btn-logout:hover {
  background: #c9a03d;
  color: #4a2812;
  transform: translateY(-1px);
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.25);
}
</style>
