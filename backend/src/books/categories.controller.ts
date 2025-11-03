import { Controller, Get } from '@nestjs/common';

import { BooksService } from './books.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    getCategories(): string[] {
        return this.booksService.getCategories();
    }
}
