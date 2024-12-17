import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './services/config/config.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ProductSchema } from './schemas/product.schema';
import { UserLinkSchema } from './schemas/user-link.schema';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useClass: MongoConfigService,
    // }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest_main',{
      autoCreate: true
    }),
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
        collection: 'products',
      },
      // {
      //   name: 'ProductLink',
      //   schema: UserLinkSchema,
      //   collection: 'user_links',
      // },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
