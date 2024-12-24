import { Controller, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { IProductResponse } from './interfaces/product-create-response.interface';
import { IProduct } from './interfaces/product-interface.interface';
import { IPurchaseProduct } from './interfaces/product-purchase.interface';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly appService: AppService) { }

  @MessagePattern('product_create')
  public async createProduct(product: IProduct): Promise<IProductResponse> {

    const productRes = await this.appService.createProduct(product);
    console.log('productRessssss', productRes.id);


    return {
      status: 201,
      message: 'Product created successfully',
      product: productRes,
      errors: null,
    }
  }

  @MessagePattern('product_purchase')
  public async purchaseProduct(product: IPurchaseProduct): Promise<IProductResponse> {

    const purchaseResult = await this.appService.purchaseProduct(product);

    if (!purchaseResult) {
      throw new Error('Purchase processing failed.');
    }

    const purchaseHistoryPayload = {
      purchase: {
        userId: product.userId,
        productId: product.productId,
        purchaseDate: product.purchaseDate,
        quantity: product.quantity,
        totalPrice: product.totalPrice,
      },
    };
    await this.userClient.emit('purchase_history', purchaseHistoryPayload); // Emit the event

    return {
      status: 201,
      message: 'Product created successfully',
      product: purchaseResult,
      errors: null,
    }


  }


}