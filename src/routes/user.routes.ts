import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  logout,
  updateUser,
} from '../controllers/user.controller'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.get('/logout', authMiddleware, logout)

router.get('/', authMiddleware, getUser)

router.get('/all', authMiddleware, getUsers)

router.put('/', authMiddleware, updateUser)

router.delete('/', authMiddleware, deleteUser)

export default router
