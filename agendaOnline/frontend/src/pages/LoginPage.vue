<template>
  <div class="row justify-content-center">

    <div class="col-md-5">

      <div class="card shadow border-0 mt-5">

        <div class="card-body p-4">

          <h2 class="text-center mb-4">
            WS Consultoria
          </h2>

          <form @submit.prevent="entrar">

            <div class="mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email"
              />
            </div>

            <div class="mb-3">
              <input
                v-model="senha"
                type="password"
                class="form-control"
                placeholder="Senha"
              />
            </div>

            <button
              class="btn btn-warning w-100 fw-bold"
            >
              Entrar
            </button>

          </form>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const senha = ref('')

async function entrar() {
  try {
    await auth.login(
      email.value,
      senha.value
    )

    router.push('/')

  } catch (err) {
    alert(err.message)
  }
}
</script>