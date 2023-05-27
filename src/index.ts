import { sequelize } from './config/database'
import config from './config/config'
import app from './app'

async function main() {
  try {
    await sequelize.sync()
    console.log('Database connected')

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
