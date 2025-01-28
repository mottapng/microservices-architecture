import { Logger } from '../../core/utils/logger';
import { Result } from '../../core/types/result.type';

export class Product {
  id: string;
  name: string;
  price: number;
  stock: number;

  constructor(id: string, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

export class CatalogService {
  private readonly SERVICE_NAME = 'CatalogService';
  private products: Product[] = [];

  constructor() {
    // Simula alguns produtos iniciais para testes
    this.products.push(
      new Product('1', 'Product A', 100, 10),
      new Product('2', 'Product B', 200, 5),
    );
  }

  /**
   * Lista todos os produtos disponíveis
   * @returns Lista de produtos
   */
  public listProducts(): Result<Product[]> {
    Logger.log(this.SERVICE_NAME, 'Listing all products');
    return {
      success: true,
      data: this.products,
    };
  }

  /**
   * Verifica se um produto está disponível no estoque
   * @param productId - ID do produto
   * @param quantity - Quantidade desejada
   * @returns Resultado da verificação
   */
  public checkStock(productId: string, quantity: number): Result<boolean> {
    Logger.log(this.SERVICE_NAME, `Checking stock for product: ${productId}`);

    const product = this.products.find((p) => p.id === productId);

    if (!product) {
      Logger.error(this.SERVICE_NAME, `Product not found: ${productId}`);
      return {
        success: false,
        error: new Error('Product not found'),
      };
    }

    if (product.stock < quantity) {
      Logger.error(this.SERVICE_NAME, `Insufficient stock for product: ${productId}`);
      return {
        success: false,
        error: new Error('Insufficient stock'),
      };
    }

    Logger.log(this.SERVICE_NAME, `Stock available for product: ${productId}`);
    return {
      success: true,
      data: true,
    };
  }

  /**
   * Atualiza o estoque de um produto
   * @param productId - ID do produto
   * @param quantity - Quantidade a ser reduzida do estoque
   * @returns Resultado da operação
   */
  public updateStock(productId: string, quantity: number): Result<boolean> {
    Logger.log(this.SERVICE_NAME, `Updating stock for product: ${productId}`);

    const product = this.products.find((p) => p.id === productId);

    if (!product) {
      Logger.error(this.SERVICE_NAME, `Product not found: ${productId}`);
      return {
        success: false,
        error: new Error('Product not found'),
      };
    }

    if (product.stock < quantity) {
      Logger.error(this.SERVICE_NAME, `Insufficient stock for product: ${productId}`);
      return {
        success: false,
        error: new Error('Insufficient stock'),
      };
    }

    product.stock -= quantity;
    Logger.log(this.SERVICE_NAME, `Stock updated for product: ${productId}`);
    return {
      success: true,
      data: true,
    };
  }
}