
import { Book, Student, Loan } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: 'Introduction aux Réseaux',
    author: 'Ahmed Ben Ali',
    category: 'Informatique',
    year: 2023,
    isbn: '9781234567890',
    copies: 3,
    description: 'Guide complet sur les réseaux informatiques',
    available: true
  },
  {
    id: '2',
    title: 'Programmation Avancée en C++',
    author: 'Jean Martin',
    category: 'Programmation',
    year: 2021,
    isbn: '9782345678901',
    copies: 5,
    description: 'Techniques avancées de programmation en C++',
    available: true
  },
  {
    id: '3',
    title: 'Intelligence Artificielle',
    author: 'Fatima Zahra',
    category: 'Informatique',
    year: 2023,
    isbn: '9783456789012',
    copies: 2,
    description: 'Introduction aux concepts de l\'intelligence artificielle',
    available: true
  },
  {
    id: '4',
    title: 'Électronique Numérique',
    author: 'Marie Dubois',
    category: 'Électronique',
    year: 2022,
    isbn: '9789876543210',
    copies: 2,
    description: 'Fondamentaux de l\'électronique numérique',
    available: true
  }
];

export const students: Student[] = [
  {
    id: 'ET2025001',
    name: 'fadwa touati',
    department: 'Informatique',
    email: 'fadwatouati58@gmail.com',
    borrowedBooks: 2
  }
];

export const loans: Loan[] = [
  {
    id: 'L1',
    bookId: '1',
    bookTitle: 'Introduction aux Réseaux',
    studentId: 'ET2025001',
    studentName: 'Touati Fadwa',
    borrowDate: '2025-03-04',
    returnDate: '2025-03-18',
    status: 'active'
  },
  {
    id: 'L2',
    bookId: '2',
    bookTitle: 'Programmation Avancée en C++',
    studentId: 'ET2025001',
    studentName: 'fadwa touati',
    borrowDate: '2025-04-01',
    returnDate: '2025-04-15',
    status: 'active'
  }
];
