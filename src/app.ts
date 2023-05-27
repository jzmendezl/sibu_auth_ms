import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/user', userRoutes)
app.use('/auth', authRoutes)

export default app
