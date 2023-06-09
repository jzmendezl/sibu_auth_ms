import { createUser, login } from '../controllers/auth.controller'
import { Router } from 'express'

const router = Router()

router.post('/register', createUser)

router.post('/login', login)

export default router
