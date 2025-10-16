import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  publishedYear: number;
  coverImage: string;
  description: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: '1',
      title: 'Learning React',
      author: 'Alex Banks, Eve Porcello',
      category: 'programming',
      isbn: '978-1492051725',
      publishedYear: 2020,
      coverImage: 'https://via.placeholder.com/150?text=Learning+React',
      description: 'A hands-on introduction to React and modern JavaScript.',
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      category: 'fiction',
      isbn: '978-0451524935',
      publishedYear: 1949,
      coverImage: 'https://via.placeholder.com/150?text=1984',
      description: 'A dystopian social science fiction novel.',
    },
    {
      id: '3',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      category: 'history',
      isbn: '978-0062316097',
      publishedYear: 2011,
      coverImage: 'https://via.placeholder.com/150?text=Sapiens',
      description:
        'A survey of the history of humankind from the evolution of archaic human species.',
    },
    {
      id: '4',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      category: 'programming',
      isbn: '978-0135957059',
      publishedYear: 2019,
      coverImage: 'https://via.placeholder.com/150?text=Pragmatic+Programmer',
      description: 'Your journey to mastery in software development.',
    },
  ];

  findAll(query: {
    q?: string;
    category?: string;
    page?: number;
    limit?: number;
  }) {
    let filteredBooks = this.books;

    if (query.q) {
      const q = query.q.toLowerCase();
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q),
      );
    }

    if (query.category) {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === query.category,
      );
    }

    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return {
      data: paginatedBooks,
      pagination: {
        page,
        limit,
        total: filteredBooks.length,
        totalPages: Math.ceil(filteredBooks.length / limit),
      },
    };
  }

  findOne(id: string): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  create(bookData: Omit<Book, 'id' | 'coverImage'>): Book {
    const id = randomUUID();
    const coverImage = `https://via.placeholder.com/150?text=${encodeURIComponent(bookData.title)}`;
    const newBook: Book = {
      id,
      ...bookData,
      coverImage,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: string, updateData: Partial<Omit<Book, 'id'>>): Book {
    const bookIndex = this.books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    const updatedBook = { ...this.books[bookIndex], ...updateData };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  remove(id: string): void {
    const bookIndex = this.books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    this.books.splice(bookIndex, 1);
  }

  getCategories(): string[] {
    const categories = this.books.map((book) => book.category);
    return [...new Set(categories)];
  }
}
