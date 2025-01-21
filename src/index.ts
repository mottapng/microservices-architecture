import { Logger } from './core/utils/logger'
import { AuthService } from './services/auth/auth.service'

async function main() {
  const authService = new AuthService()

  // Teste de login com sucesso
  const loginResult = await authService.login({
    email: 'user@example.com',
    password: '123456',
  })

  if (loginResult.success) {
    // Validar sessão
    await authService.validateSession(loginResult.data!.id)
  }

  // Teste de login com falha
  await authService.login({
    email: 'wrong@example.com',
    password: 'wrong',
  })
}

main().catch((error) => {
  Logger.error('Main', 'Application failed', error)
})
