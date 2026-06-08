<template>
  <div class="form-wrap">

<h1 class="page-title">
  {{ editando ? 'Editar Atendimento' : 'Novo Atendimento' }}
</h1>

<form
  class="form"
  @submit.prevent="salvar"
>

  <div class="campo">
    <label>Nome do cliente *</label>

    <input
      v-model="form.nome_cliente"
      type="text"
      required
    />
  </div>

  <div class="campo">
    <label>Telefone *</label>

    <input
      v-model="form.telefone"
      type="text"
      required
    />
  </div>

  <div class="campo">
    <label>Endereço da visita *</label>

    <input
      v-model="form.endereco_visita"
      type="text"
      required
    />
  </div>

  <div class="linha">

    <div class="campo">
      <label>Data *</label>

      <input
        v-model="form.data"
        type="date"
        required
      />
    </div>

    <div class="campo">
      <label>Horário *</label>

      <input
        v-model="form.horario"
        type="time"
        required
      />
    </div>

  </div>

  <div class="campo">
    <label>Responsável *</label>

    <select
      v-model="form.responsavel_id"
      required
    >
      <option value="">
        Selecione...
      </option>

      <option
        v-for="r in responsaveisList"
        :key="r.id"
        :value="r.id"
      >
        {{ r.nome }}
      </option>

    </select>
  </div>

  <div class="campo">
    <label>Status</label>

    <select v-model="form.status">
      <option>Agendado</option>
      <option>Concluído</option>
      <option>Cancelado</option>
    </select>
  </div>

  <div class="campo">
    <label>Observações</label>

    <textarea
      v-model="form.observacoes"
      rows="4"
    ></textarea>
  </div>

  <div class="form-acoes">

    <RouterLink
      to="/atendimentos"
      class="btn btn-cancelar"
    >
      Cancelar
    </RouterLink>

    <button
      type="submit"
      class="btn btn-salvar"
    >
      {{ editando ? 'Salvar alterações' : 'Cadastrar' }}
    </button>

  </div>

</form>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { atendimentos, responsaveis } from '../services/api'

const route = useRoute()
const router = useRouter()

const editando = computed(
  () => !!route.params.id
)

const form = ref({
  nome_cliente: '',
  telefone: '',
  endereco_visita: '',
  data: '',
  horario: '',
  responsavel_id: '',
  observacoes: '',
  status: 'Agendado'
})

const responsaveisList = ref([])

onMounted(async () => {
  const res = await responsaveis.listar()

  responsaveisList.value = res.data

  if (editando.value) {
    const r = await atendimentos.buscar(
      route.params.id
    )

    const a = r.data

    form.value = {
      nome_cliente: a.nome_cliente,
      telefone: a.telefone,
      endereco_visita: a.endereco_visita,
      data: a.data,
      horario: a.horario.slice(0, 5),
      responsavel_id: a.responsavel_id,
      observacoes: a.observacoes || '',
      status: a.status
    }
  }
})

async function salvar() {
  if (editando.value) {
    await atendimentos.atualizar(
      route.params.id,
      form.value
    )
  } else {
    await atendimentos.criar(
      form.value
    )
  }

  router.push('/atendimentos')
}
</script>

<style scoped>
.form-wrap {
  max-width: 800px;
  margin: auto;
}

.page-title {
  color: #4A2812;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.8rem;
}

.form {
  background: white;

  padding: 2rem;

  border-radius: 24px;

  box-shadow:
    0 12px 30px rgba(0,0,0,.08);
}
.form-page {
min-height: 100vh;
background: #F8F6F3;
padding: 1rem;
}


.campo {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-bottom: 1.3rem;
}

.linha {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  font-weight: 600;
  color: #4A2812;
}

input,
select,
textarea {
  width: 100%;

  padding: .85rem;

  border: 1px solid #ddd;

  border-radius: 10px;

  transition: .25s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;

  border-color: #C9A03D;

  box-shadow:
    0 0 0 4px rgba(201,160,61,.15);
}

.form-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  border: none;
  cursor: pointer;

  padding: .85rem 1.6rem;

  border-radius: 10px;

  text-decoration: none;

  font-weight: 600;
}

.btn-salvar {
  background:
    linear-gradient(
      135deg,
      #C9A03D,
      #DAB45F
    );

  color: #4A2812;
}

.btn-salvar:hover {
  opacity: .95;
}

.btn-cancelar {
  background: #f2f2f2;
  color: #555;
}
@media (max-width: 768px) {
.linha {
grid-template-columns: 1fr;
}

.page-title {
text-align: center;
font-size: 1.6rem;
}

.form {
padding: 1.5rem;
}

.form-acoes {
flex-direction: column;
}

.btn-salvar,
.btn-cancelar {
width: 100%;
text-align: center;
}
}

</style>
