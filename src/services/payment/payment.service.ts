import { Logger } from '../../core/utils/logger';
import { Result } from '../../core/types/result.type';

export class Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';

  constructor(id: string, orderId: string, userId: string, amount: number) {
    this.id = id;
    this.orderId = orderId;
    this.userId = userId;
    this.amount = amount;
    this.status = 'pending';
  }
}

export class PaymentService {
  private readonly SERVICE_NAME = 'PaymentService';
  private payments: Payment[] = [];

  /**
   * Processa o pagamento de um pedido
   * @param orderId - ID do pedido
   * @param userId - ID do usuário
   * @param amount - Valor do pagamento
   * @returns Resultado da operação
   */
  public async processPayment(orderId: string, userId: string, amount: number): Promise<Result<Payment>> {
    Logger.log(this.SERVICE_NAME, `Processing payment for order: ${orderId} by user: ${userId}`);

    try {
      // Simula a lógica de processamento de pagamento
      if (amount <= 0) {
        throw new Error('Invalid payment amount');
      }

      // Cria o pagamento
      const payment = new Payment(`payment-${this.payments.length + 1}`, orderId, userId, amount);
      payment.status = 'completed'; // Simula pagamento bem-sucedido
      this.payments.push(payment);

      Logger.log(this.SERVICE_NAME, `Payment processed successfully: ${payment.id}`);
      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      Logger.error(this.SERVICE_NAME, 'Payment processing failed: ', error);
      return {
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * Atualiza o status de um pagamento
   * @param paymentId - ID do pagamento
   * @param status - Novo status
   * @returns Resultado da operação
   */
  public updatePaymentStatus(paymentId: string, status: 'pending' | 'completed' | 'failed'): Result<boolean> {
    Logger.log(this.SERVICE_NAME, `Updating status for payment: ${paymentId}`);

    const payment = this.payments.find((p) => p.id === paymentId);

    if (!payment) {
      Logger.error(this.SERVICE_NAME, `Payment not found: ${paymentId}`);
      return {
        success: false,
        error: new Error('Payment not found'),
      };
    }

    payment.status = status;
    Logger.log(this.SERVICE_NAME, `Payment status updated: ${paymentId} -> ${status}`);
    return {
      success: true,
      data: true,
    };
  }
}
