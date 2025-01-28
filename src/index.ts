import { Logger } from './core/utils/logger'
import { AuthService } from './services/auth/auth.service'
import { CatalogService } from './services/catalog/catalog.service';
import { OrderService } from './services/order/order.service';

async function main() {
  const authService = new AuthService()
  const catalogService = new CatalogService()
  const orderService = new OrderService(catalogService)

  // Teste de login com sucesso
  const loginResult = await authService.login({
    email: 'user@example.com',
    password: '123456',
  })

  if (loginResult.success) {
    // Validar sessão
    await authService.validateSession(loginResult.data!.id)

    const productsResult = catalogService.listProducts();
    if (productsResult.success) {
      if (productsResult.data) {
        Logger.log('Main', JSON.stringify(productsResult.data));
      }
    }

    // Criar um pedido
    const orderItems = [
      { productId: '1', quantity: 2, price: 100 },
      { productId: '2', quantity: 1, price: 200 },
    ];
    const orderResult = await orderService.createOrder(loginResult.data!.id, orderItems);
    if (orderResult.success) {
      Logger.log('Main', JSON.stringify(orderResult.data));
    }
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
