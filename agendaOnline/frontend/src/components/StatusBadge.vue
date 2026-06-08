<template>
  <span class="badge" :class="classe">{{ status }}</span>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ status: String })
const classe = computed(() => ({
  agendado:  props.status === 'Agendado',
  concluido: props.status === 'Concluído',
  cancelado: props.status === 'Cancelado'
}))
</script>

<style scoped>
.badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
.agendado  { background: #e3f2fd; color: #1565c0; }
.concluido { background: #e8f5e9; color: #2e7d32; }
.cancelado { background: #ffebee; color: #c62828; }
</style>