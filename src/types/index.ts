
export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  department?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  isbn: string;
  copies: number;
  description?: string;
  available: boolean;
}

export interface Student {
  id: string;
  name: string;
  department: string;
  email: string;
  borrowedBooks: number;
}

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  borrowDate: string;
  returnDate: string;
  status: 'active' | 'returned' | 'overdue';
}
