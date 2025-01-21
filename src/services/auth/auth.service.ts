import { Result } from '../../core/types/result.type'
import { Logger } from '../../core/utils/logger'
import {
  InvalidCredentialsError,
  UserNotFoundError,
} from './errors/auth-errors'
import { Credentials } from './models/credentials.model'
import { AuthenticatedUser, User } from './models/user.model'

export class AuthService {
  private readonly SERVICE_NAME = 'AuthService'
  private users: User[] = []

  constructor() {
    // Simula um usuário inicial para testes
    this.users.push({
      id: '1',
      email: 'user@example.com',
      name: 'Test User',
      password: '123456',
    })
  }

  /**
   * Autentica um usuário com suas credenciais
   * @param credentials - Credenciais do usuário (email e senha)
   * @returns Promise com o resultado da autenticação contendo os dados do usuário autenticado
   * @throws {UserNotFoundError} Quando o usuário não é encontrado
   * @throws {InvalidCredentialsError} Quando a senha está incorreta
   */
  public async login(
    credentials: Credentials,
  ): Promise<Result<AuthenticatedUser>> {
    Logger.log(
      this.SERVICE_NAME,
      `Attempting login for user: ${credentials.email}`,
    )

    try {
      const user = this.users.find((u) => u.email === credentials.email)

      if (!user) {
        throw new UserNotFoundError(credentials.email)
      }

      if (user.password !== credentials.password) {
        throw new InvalidCredentialsError()
      }

      const authenticatedUser: AuthenticatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
      }

      Logger.log(
        this.SERVICE_NAME,
        `User authenticated successfully: ${user.email}`,
      )

      return {
        success: true,
        data: authenticatedUser,
      }
    } catch (error) {
      Logger.error(this.SERVICE_NAME, 'Login failed: ', error)

      return {
        success: false,
        error: error as Error,
      }
    }
  }

  /**
   * Valida se uma sessão de usuário é válida
   * @param userId - ID do usuário para validar a sessão
   * @returns Promise com o resultado da validação
   * @throws {UserNotFoundError} Quando o usuário não é encontrado
   */
  public async validateSession(userId: string): Promise<Result<boolean>> {
    Logger.log(this.SERVICE_NAME, `Validating session for user: ${userId}`)

    try {
      const userExists = this.users.some((u) => u.id === userId)

      if (!userExists) {
        throw new UserNotFoundError(userId)
      }

      Logger.log(
        this.SERVICE_NAME,
        `Session validated successfully for user: ${userId}`,
      )
      return {
        success: true,
        data: true,
      }
    } catch (error) {
      Logger.error(this.SERVICE_NAME, 'Session validation failed: ', error)

      return {
        success: false,
        error: error as Error,
      }
    }
  }
}
