<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">
        Atendimentos
      </h1>

  <RouterLink
    to="/atendimentos/novo"
    class="btn btn-primary"
  >
    + Novo Atendimento
  </RouterLink>
</div>

<div
  v-if="carregando"
  class="loading"
>
  Carregando...
</div>

<div
  v-else-if="lista.length === 0"
  class="vazio"
>
  Nenhum atendimento cadastrado.
</div>

<div
  v-else
  class="tabela-wrap"
>
  <table>
    <thead>
      <tr>
        <th>Cliente</th>
        <th>Telefone</th>
        <th>Data</th>
        <th>Horário</th>
        <th>Responsável</th>
        <th>Status</th>
        <th>Ações</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="a in lista"
        :key="a.id"
      >
        <td>{{ a.nome_cliente }}</td>

        <td>{{ a.telefone }}</td>

        <td>{{ formatarData(a.data) }}</td>

        <td>{{ a.horario }}</td>

        <td>{{ a.responsaveis?.nome }}</td>

        <td>
          <StatusBadge :status="a.status" />
        </td>

        <td class="acoes">
          <RouterLink
            :to="`/atendimentos/${a.id}`"
            class="btn btn-sm"
          >
            Editar
          </RouterLink>

          <button
            class="btn btn-sm btn-danger"
            @click="excluir(a.id)"
          >
            Excluir
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { atendimentos } from '../services/api'
import StatusBadge from '../components/StatusBadge.vue'

const lista = ref([])
const carregando = ref(true)

onMounted(async () => {
  const res = await atendimentos.listar()

  lista.value = res.data

  carregando.value = false
})

function formatarData(data) {
  if (!data) return ''

  const [ano, mes, dia] = data.split('-')

  return `${dia}/${mes}/${ano}`
}

async function excluir(id) {
  if (!confirm('Deseja excluir este atendimento?')) return

  await atendimentos.remover(id)

  lista.value = lista.value.filter(
    a => a.id !== id
  )
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #4A2812;
}

.loading,
.vazio {
  text-align: center;
  padding: 2rem;
  color: #777;
}

.tabela-wrap {
background: #FCFAF7;

border-radius: 18px;

overflow-x: auto;
overflow-y: hidden;

box-shadow:
0 10px 25px rgba(0,0,0,.08);
}


table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background:
    linear-gradient(
      135deg,
      #6B3A1F,
      #4A2812
    );

  color: white;
  font-weight: 600;
}

tbody tr {
  transition: .2s;
}

tbody tr:hover {
  background: #faf7f3;
}

.acoes {
  display: flex;
  gap: .5rem;
}

.btn {
  display: inline-block;

  padding: .55rem 1rem;

  border-radius: 8px;

  text-decoration: none;

  font-weight: 600;

  border: none;

  cursor: pointer;
}

.btn-primary {
  background:
    linear-gradient(
      135deg,
      #C9A03D,
      #DAB45F
    );

  color: #4A2812;
}

.btn-primary:hover {
  opacity: .95;
}

.btn-sm {
  background: #f3eee8;
  color: #4A2812;
}

.btn-danger {
  background: #fdeaea;
  color: #c62828;
}
.atendimentos-page {
min-height: 100vh;
background: #F8F6F3;
padding: 1rem;
}

</style>
