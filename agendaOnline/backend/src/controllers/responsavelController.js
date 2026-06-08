import supabase from '../config/supabase.js'

export async function listarResponsaveis(req, res) {
  const { data, error } = await supabase
    .from('responsaveis')
    .select('*')
    .order('tipo')

  if (error) {
    console.error('ERRO SUPABASE:', error)
    return res.status(500).json({ erro: error.message })
  }
  res.json(data)
}
