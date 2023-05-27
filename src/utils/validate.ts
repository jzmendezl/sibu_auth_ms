export const validateEmail = (email: string) => {
  const expRegEmail = /^[a-zA-Z0-9_.+-]+@unal.edu.co$/
  return expRegEmail.exec(email)
}

export const validateName = (username: string) => {
  const expRegName = /^[a-zA-Z0-9_-\s]{3,30}$/
  return expRegName.exec(username)
}

export const validatePassword = (password: string) => {
  const expRegPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  return expRegPassword.exec(password)
}
