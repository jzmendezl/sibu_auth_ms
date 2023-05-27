import jwt from 'jsonwebtoken'
import User from '../models/User'
import { Request, Response, NextFunction } from 'express'

export const generateToken = (user: User) => {
  try {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    )
    return token
  } catch (error) {
    return error
  }
}

// export const verifyToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1]
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' })
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
//     req.userId = decoded.id
//     req.userRole = decoded.role
//     next()
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized' })
//   }
// }
