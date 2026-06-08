import { Router } from 'express'
import {
  listar, buscarPorId, criar,
  atualizar, remover, dashboard
} from '../controllers/atendimentoController.js'

const router = Router()

router.get('/dashboard', dashboard)
router.get('/',          listar)
router.get('/:id',       buscarPorId)
router.post('/',         criar)
router.put('/:id',       atualizar)
router.delete('/:id',    remover)

export default router