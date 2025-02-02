import { Logger } from './core/utils/logger';
import { AuthService } from './services/auth/auth.service';
import { CatalogService } from './services/catalog/catalog.service';
import { OrderService } from './services/order/order.service';
import { PaymentService } from './services/payment/payment.service';

async function main() {
  const authService = new AuthService();
  const catalogService = new CatalogService();
  const orderService = new OrderService(catalogService);
  const paymentService = new PaymentService();

  // Teste de login com sucesso
  const loginResult = await authService.login({
    email: 'user@example.com',
    password: '123456',
  });

  if (loginResult.success) {
    // Validar sessão
    await authService.validateSession(loginResult.data!.id);

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

      // Processar pagamento para o pedido criado
      const paymentResult = await paymentService.processPayment(
        orderResult.data!.id,
        loginResult.data!.id,
        orderResult.data!.total
      );

      if (paymentResult.success) {
        Logger.log('Main', `Payment successful: ${JSON.stringify(paymentResult.data)}`);
        // Atualizar o status do pedido para "paid"
        const updateOrderStatusResult = orderService.updateOrderStatus(
          orderResult.data!.id,
          'paid'
        );

        if (updateOrderStatusResult.success) {
          Logger.log('Main', `Order status updated to 'paid': ${orderResult.data!.id}`);
        } else {
          Logger.error('Main', 'Failed to update order status', updateOrderStatusResult.error);
        }
      } else {
        Logger.error('Main', 'Payment failed', paymentResult.error);
        // Atualizar o status do pedido para "failed"
        const updateOrderStatusResult = orderService.updateOrderStatus(
          orderResult.data!.id,
          'failed'
        );

        if (updateOrderStatusResult.success) {
          Logger.log('Main', `Order status updated to 'failed': ${orderResult.data!.id}`);
        } else {
          Logger.error('Main', 'Failed to update order status', updateOrderStatusResult.error);
        }
      }
    }
  }

  // Teste de login com falha
  await authService.login({
    email: 'wrong@example.com',
    password: 'wrong',
  });
}

main().catch((error) => {
  Logger.error('Main', 'Application failed', error);
});
