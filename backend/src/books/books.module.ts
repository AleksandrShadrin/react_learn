import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CategoriesController } from './categories.controller';

@Module({
    controllers: [BooksController, CategoriesController],
    providers: [BooksService],
})
export class BooksModule {}
