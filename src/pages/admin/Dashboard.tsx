
import { useLibrary } from '@/context/LibraryContext';
import { Link } from 'react-router-dom';
import { Book, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { books, students, loans } = useLibrary();

  // Informations pour le tableau de bord
  const totalBooks = books.length;
  const borrowedBooks = loans.filter(loan => loan.status === 'active').length;
  const activeStudents = students.length;

  // Grouper les livres par catégorie
  const booksByDepartment = books.reduce((acc, book) => {
    if (!acc[book.category]) {
      acc[book.category] = [];
    }
    acc[book.category].push(book);
    return acc;
  }, {} as Record<string, typeof books>);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">Total des livres</p>
              <p className="text-4xl font-bold">{totalBooks}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Book className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">Livres empruntés</p>
              <p className="text-4xl font-bold">{borrowedBooks}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">Membres actifs</p>
              <p className="text-4xl font-bold">{activeStudents}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste de livres par département */}
      {Object.entries(booksByDepartment).map(([department, departmentBooks]) => (
        <div key={department} className="mt-8">
          <h2 className="text-xl font-bold mb-4">Département {department}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departmentBooks.slice(0, 3).map(book => (
              <div key={book.id} className="flex flex-col">
                <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${book.id}/400/300`} 
                    alt={book.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white border border-t-0 rounded-b-lg flex-1">
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {book.available ? 'Disponible' : 'Indisponible'}
                    </span>
                    <span className="float-right text-gray-400 text-sm">{book.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link to="/admin/catalogue" className="text-library-primary hover:underline text-sm">Voir tous les livres</Link>
          </div>
        </div>
      ))}

      {/* Add Book Button (Fixed) */}
      <div className="fixed bottom-8 right-8">
        <Link to="/admin/add-book">
          <Button className="rounded-full h-14 w-14 bg-library-primary text-white hover:bg-library-secondary">
            <span className="text-xl font-bold">+</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
