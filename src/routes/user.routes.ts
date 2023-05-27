import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUserByID,
  getUsers,
  logout,
  updateUser,
} from '../controllers/user.controller'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.get('/all', getUsers)

router.get('/logout', authMiddleware, logout)

router.get('/', authMiddleware, getUser)

router.get('/:id', authMiddleware, getUserByID)

router.put('/', authMiddleware, updateUser)

router.delete('/', authMiddleware, deleteUser)

export default router
