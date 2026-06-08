import { Router } from 'express'
import { listarResponsaveis } from '../controllers/responsavelController.js'

const router = Router()
router.get('/', listarResponsaveis)

export default router