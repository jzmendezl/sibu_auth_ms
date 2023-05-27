import jwt from 'jsonwebtoken'
import config from '../config/config'
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization === null) {
      res.status(401).send({ error: 'Missing authorization header' })
    }

    // Obtenemos el token de la cabecera 'Authorization'
    const token = req?.headers?.authorization?.split(' ').pop() as string

    // Verificamos y decodificamos el token
    const { id } = jwt.verify(token as string, config.JWT_SECRET as string) as {
      id: string
    }

    // Añadimos los datos del usuario al objeto request
    res.locals.UID = id

    // Llamamos al siguiente middleware o controlador
    next()
  } catch (error) {
    return res.status(401).send({ error: 'Invalid token' })
  }
}
