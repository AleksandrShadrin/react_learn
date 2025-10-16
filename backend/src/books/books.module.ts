import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { CategoriesController } from './categories.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController, CategoriesController],
  providers: [BooksService],
})
export class BooksModule {}
