export type User = {
  readonly id: string
  readonly email: string
  readonly name: string
  readonly password: string
}

export type AuthenticatedUser = Omit<User, 'password'>
