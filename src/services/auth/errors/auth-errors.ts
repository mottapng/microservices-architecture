import { AppError } from '../../../core/types/error.type'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Invalid credentials provided', 'AUTH_001')
  }
}

export class UserNotFoundError extends AppError {
  constructor(email: string) {
    super(`User not found with email: ${email}`, 'AUTH_002', { email })
  }
}
