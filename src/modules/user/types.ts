export interface User {
  id?: string
  email: string
  password?: string
}

export type UserResponse = Omit<User, 'password'>
