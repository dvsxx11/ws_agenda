import express from 'express'
import cors from 'cors'
import atendimentoRoutes from './routes/atendimentoRoutes.js'
import responsavelRoutes from './routes/responsavelRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/atendimentos', atendimentoRoutes)
app.use('/responsaveis', responsavelRoutes)

app.get('/', (req, res) => res.json({ status: 'API rodando!' }))

export default app