
import { createContext, useContext, useState, ReactNode } from 'react';
import { Book, Student, Loan } from '@/types';
import { books as initialBooks, students as initialStudents, loans as initialLoans } from '@/data/mockData';

interface LibraryContextType {
  books: Book[];
  students: Student[];
  loans: Loan[];
  addBook: (book: Omit<Book, 'id'>) => void;
  addStudent: (student: Omit<Student, 'id' | 'borrowedBooks'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  deleteStudent: (id: string) => void;
  addLoan: (bookId: string, studentId: string, returnDate: string) => void;
  returnBook: (loanId: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [loans, setLoans] = useState<Loan[]>(initialLoans);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...book,
      id: `B${books.length + 1}`,
      available: true
    };
    setBooks([...books, newBook]);
  };

  const addStudent = (student: Omit<Student, 'id' | 'borrowedBooks'>) => {
    const newStudent: Student = {
      ...student,
      id: `ET${new Date().getFullYear()}${students.length + 1}`.padEnd(9, '0'),
      borrowedBooks: 0
    };
    setStudents([...students, newStudent]);
  };

  const updateBook = (id: string, bookUpdate: Partial<Book>) => {
    setBooks(books.map(book => book.id === id ? { ...book, ...bookUpdate } : book));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const addLoan = (bookId: string, studentId: string, returnDate: string) => {
    const book = books.find(b => b.id === bookId);
    const student = students.find(s => s.id === studentId);
    
    if (!book || !student) return;

    const newLoan: Loan = {
      id: `L${loans.length + 1}`,
      bookId,
      bookTitle: book.title,
      studentId,
      studentName: student.name,
      borrowDate: new Date().toISOString().split('T')[0],
      returnDate,
      status: 'active'
    };

    setLoans([...loans, newLoan]);
    
    // Update book availability
    updateBook(bookId, { available: book.copies - 1 > 0 });
    
    // Update student borrowed books count
    setStudents(students.map(s => s.id === studentId ? { ...s, borrowedBooks: s.borrowedBooks + 1 } : s));
  };

  const returnBook = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    setLoans(loans.map(l => l.id === loanId ? { ...l, status: 'returned' } : l));
    
    // Update book availability
    const book = books.find(b => b.id === loan.bookId);
    if (book) {
      updateBook(loan.bookId, { available: true });
    }
    
    // Update student borrowed books count
    const student = students.find(s => s.id === loan.studentId);
    if (student) {
      setStudents(students.map(s => s.id === loan.studentId ? { ...s, borrowedBooks: Math.max(0, s.borrowedBooks - 1) } : s));
    }
  };

  return (
    <LibraryContext.Provider value={{ 
      books, 
      students, 
      loans, 
      addBook, 
      addStudent, 
      updateBook, 
      deleteBook,
      deleteStudent,
      addLoan,
      returnBook 
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
