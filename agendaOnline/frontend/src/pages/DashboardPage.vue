<template>
  <div>
    <h1 class="page-title mb-4">
      Dashboard
    </h1>
    

    <div
      v-if="carregando"
      class="text-center"
    >
      Carregando...
    </div>

    <div
      v-else
      class="row g-4"
    >
      <div class="col-md-3">
        <div class="card card-custom h-100">
          <div class="card-body text-center">
            <h1>📅</h1>

            <h2>
              {{ dados.total_hoje }}
            </h2>

            <p>Atendimentos Hoje</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card card-custom h-100">
          <div class="card-body text-center">
            <h1>📆</h1>

            <h2>
              {{ dados.total_semana }}
            </h2>

            <p>Atendimentos Semana</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card card-custom h-100">
          <div class="card-body text-center">
            <h1>👩‍💼</h1>

            <h2>
              {{ dados.total_corretora }}
            </h2>

            <p>Atendimentos Corretora</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card card-custom h-100">
          <div class="card-body text-center">
            <h1>👩‍💻</h1>

            <h2>
              {{ dados.total_colaboradora }}
            </h2>

            <p>Atendimentos Colaboradora</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { atendimentos } from '../services/api'

const dados = ref({
  total_hoje: 0,
  total_semana: 0,
  total_corretora: 0,
  total_colaboradora: 0
})

const carregando = ref(true)

onMounted(async () => {
  try {
    const res = await atendimentos.dashboard()

    console.log('===== DASHBOARD =====')
    console.log(res.data)

    dados.value = res.data

  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
  } finally {
    carregando.value = false
  }
})
</script>

<style scoped>
.page-title {
  color: #4A2812;
  font-weight: 700;
}

.card-custom {
  border: none;
  border-radius: 20px;

  background: linear-gradient(
    135deg,
    #6B3A1F,
    #4A2812
  );

  color: white;

  box-shadow:
    0 12px 30px rgba(0,0,0,.15);

  transition: .3s;
}

.card-custom:hover {
  transform: translateY(-4px);
}

.card-custom h1 {
  font-size: 2.5rem;
}

.card-custom h2 {
  color: #C9A03D;
  font-size: 2rem;
  font-weight: 700;
}

.card-custom p {
  margin-top: .5rem;
  margin-bottom: 0;
  font-weight: 500;
  opacity: .95;
}

@media (max-width: 768px) {
  .page-title {
    text-align: center;
    font-size: 1.6rem;
  }

  .card-custom h1 {
    font-size: 2rem;
  }

  .card-custom h2 {
    font-size: 1.7rem;
  }
}
</style>