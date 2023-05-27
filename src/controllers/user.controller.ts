import { Request, Response } from 'express'
import User from '../models/User'
import { encryptPassword } from '../utils/encrypt'
import { validateEmail, validatePassword } from '../utils/validate'

export const logout = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { id: res.locals.UID } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    user.token = ''

    await user.save()

    return res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { id: res.locals.UID } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getUserByID = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { id: req.params } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll()

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const user = await User.findOne({ where: { id: res.locals.UID } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const encryptedPassword = await encryptPassword(password)

    user.email = email.toLowerCase() as string
    user.password = encryptedPassword as string

    await user.save()

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { id: res.locals.UID } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    await user.destroy()

    return res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    return res.status(500).json(error)
  }
}
