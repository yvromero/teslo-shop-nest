import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';
import { SeedService } from 'src/seed/seed.service';



@Module({
  controllers: [ProductsController ],
  providers: [ProductsService, SeedService],
  imports: [
    TypeOrmModule.forFeature([ Product, ProductImage ])
  ],
  exports: [
    ProductsService,
    TypeOrmModule,
  ]
})
export class ProductsModule {}
