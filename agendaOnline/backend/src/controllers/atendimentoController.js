import supabase from '../config/supabase.js'

// GET /atendimentos
export async function listar(req, res) {
  const { data, error } = await supabase
    .from('atendimentos')
    .select(`
      *,
      responsaveis ( id, nome, tipo )
    `)
    .order('data', { ascending: true })
    .order('horario', { ascending: true })

  if (error) return res.status(500).json({ erro: error.message })
  res.json(data)
}

// GET /atendimentos/:id
export async function buscarPorId(req, res) {
  const { data, error } = await supabase
    .from('atendimentos')
    .select(`*, responsaveis ( id, nome, tipo )`)
    .eq('id', req.params.id)
    .single()

  if (error) return res.status(404).json({ erro: 'Atendimento não encontrado' })
  res.json(data)
}

// POST /atendimentos
export async function criar(req, res) {
  const {
    nome_cliente, telefone, endereco_visita,
    data, horario, responsavel_id, observacoes, status
  } = req.body

  if (!nome_cliente || !telefone || !endereco_visita || !data || !horario || !responsavel_id) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' })
  }

  const { data: novo, error } = await supabase
    .from('atendimentos')
    .insert([{ nome_cliente, telefone, endereco_visita, data, horario, responsavel_id, observacoes, status }])
    .select()
    .single()

  if (error) return res.status(500).json({ erro: error.message })
  res.status(201).json(novo)
}

// PUT /atendimentos/:id
export async function atualizar(req, res) {
  const {
    nome_cliente, telefone, endereco_visita,
    data, horario, responsavel_id, observacoes, status
  } = req.body

  const { data: atualizado, error } = await supabase
    .from('atendimentos')
    .update({ nome_cliente, telefone, endereco_visita, data, horario, responsavel_id, observacoes, status })
    .eq('id', req.params.id)
    .select()
    .single()

  if (error) return res.status(500).json({ erro: error.message })
  res.json(atualizado)
}

// DELETE /atendimentos/:id
export async function remover(req, res) {
  const { error } = await supabase
    .from('atendimentos')
    .delete()
    .eq('id', req.params.id)

  if (error) return res.status(500).json({ erro: error.message })
  res.status(204).send()
}

// GET /atendimentos/dashboard
export async function dashboard(req, res) {
  const { data, error } = await supabase
    .from('dashboard_indicadores')
    .select('*')
    .single()

  if (error) return res.status(500).json({ erro: error.message })
  res.json(data)
}