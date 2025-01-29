import { Logger } from '../../core/utils/logger';
import { Result } from '../../core/types/result.type';
import { CatalogService} from '../catalog/catalog.service';

export class OrderItem {
  productId: string;
  quantity: number;
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'failed';

  constructor(id: string, userId: string, items: OrderItem[]) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.status = 'pending';
  }
}


export class OrderService {
  private readonly SERVICE_NAME = 'OrderService';
  private orders: Order[] = [];
  private catalogService: CatalogService;

  constructor(catalogService: CatalogService) {
    this.catalogService = catalogService;
  }

  /**
   * Cria um novo pedido
   * @param userId - ID do usuário
   * @param items - Itens do pedido
   * @returns Resultado da operação
   */
  public async createOrder(userId: string, items: OrderItem[]): Promise<Result<Order>> {
    Logger.log(this.SERVICE_NAME, `Creating order for user: ${userId}`);

    try {
      // Verifica o estoque de cada item
      for (const item of items) {
        const stockResult = this.catalogService.checkStock(item.productId, item.quantity);
        if (!stockResult.success) {
          throw new Error(`Product ${item.productId} out of stock`);
        }
      }

      // Cria o pedido
      const order = new Order(`order-${this.orders.length + 1}`, userId, items);
      this.orders.push(order);

      Logger.log(this.SERVICE_NAME, `Order created successfully: ${order.id}`);
      return {
        success: true,
        data: order,
      };
    } catch (error) {
      Logger.error(this.SERVICE_NAME, 'Order creation failed: ', error);
      return {
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * Atualiza o status de um pedido
   * @param orderId - ID do pedido
   * @param status - Novo status
   * @returns Resultado da operação
   */
  public updateOrderStatus(orderId: string, status: 'pending' | 'paid' | 'failed'): Result<boolean> {
    Logger.log(this.SERVICE_NAME, `Updating status for order: ${orderId}`);

    const order = this.orders.find((o) => o.id === orderId);

    if (!order) {
      Logger.error(this.SERVICE_NAME, `Order not found: ${orderId}`);
      return {
        success: false,
        error: new Error('Order not found'),
      };
    }

    order.status = status;
    Logger.log(this.SERVICE_NAME, `Order status updated: ${orderId} -> ${status}`);
    return {
      success: true,
      data: true,
    };
  }
}