import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from './interfaces/product-interface.interface';
import { IPurchaseProduct } from './interfaces/product-purchase.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>,
    @InjectModel('ProductPurchase') private readonly productPurchaseModel: Model<IPurchaseProduct>,
  ) { }

  public async createProduct(product: IProduct): Promise<IProduct> {
    const createProduct = new this.productModel(product);
    console.log('createProduct', createProduct);


    return await createProduct.save();
  }

  public async purchaseProduct(product: IPurchaseProduct) {
    const purchaseProduct = new this.productPurchaseModel(product);
    return await purchaseProduct.save();
  }

}
