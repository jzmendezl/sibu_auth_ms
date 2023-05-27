import { v4 as uuidv4 } from 'uuid'
import { generateToken } from '../utils/tokenUtils'
import { Request, Response } from 'express'
import User from '../models/User'
import { encryptPassword, comparePassword } from '../utils/encrypt'
import { validateEmail, validatePassword } from '../utils/validate'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const encryptedPassword = await encryptPassword(password)

    let token: string = ''

    const newUser = new User({
      id: uuidv4() as string,
      name: email.split('@')[0] as string,
      email: email.toLowerCase() as string,
      password: encryptedPassword as string,
      role: 'user' as unknown as Enumerator,
      token: token as string,
    })

    token = generateToken(newUser) as string

    newUser.token = token

    console.log('====================================')
    console.log(newUser)
    console.log('====================================')

    const user = await newUser.save()

    return res.status(201).json({ user, token })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ token: null, message: 'Invalid password' })
    }

    const token = generateToken(user)

    user.token = token as string

    await user.save()

    return res.status(200).json({ user, token })
  } catch (error) {
    return res.status(500).json(error)
  }
}
