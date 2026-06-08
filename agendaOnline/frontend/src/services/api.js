import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const responsaveis = {
  listar: () => api.get('/responsaveis')
}

export const atendimentos = {
  listar:     ()     => api.get('/atendimentos'),
  buscar:     (id)   => api.get(`/atendimentos/${id}`),
  criar:      (data) => api.post('/atendimentos', data),
  atualizar:  (id, data) => api.put(`/atendimentos/${id}`, data),
  remover:    (id)   => api.delete(`/atendimentos/${id}`),
  dashboard:  ()     => api.get('/atendimentos/dashboard')
}