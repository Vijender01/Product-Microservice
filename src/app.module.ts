import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './services/config/config.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ProductSchema } from './schemas/product.schema';
import { UserLinkSchema } from './schemas/user-link.schema';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { PurchaseProductSchema } from './schemas/product-purchase.schema';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://obhlbcvp:vuMB_HPYPo769PiIYXfx-FqjXvgjq9QB@armadillo.rmq.cloudamqp.com/obhlbcvp'],
          queue: 'main_queue', // The queue name for the User microservice
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    // MongooseModule.forRootAsync({
    //   useClass: MongoConfigService,
    // }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest_main', {
      autoCreate: true
    }),
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
        collection: 'products',
      },
      {
        name: 'ProductPurchase',
        schema: PurchaseProductSchema,
        collection: 'product_purchase',
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService,
    ConfigService,
  ],
})
export class AppModule { }
