
import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { Search, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function StudentCatalogue() {
  const { books, loans, addLoan } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Obtenir tous les départements uniques
  const departments = [...new Set(books.map(book => book.category))];

  // Filtrer les livres par recherche et département
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment ? book.category === selectedDepartment : true;
    
    return matchesSearch && matchesDepartment;
  });

  // Vérifier si un livre est déjà emprunté par l'étudiant actuel
  const isBookBorrowed = (bookId: string) => {
    return loans.some(loan => 
      loan.bookId === bookId && 
      loan.status === 'active' 
    );
  };

  const handleBorrow = (bookId: string) => {
    // Simuler l'emprunt d'un livre (dans une vraie application, cela passerait par une API)
    if (!isBookBorrowed(bookId)) {
      // Calculer la date de retour (2 semaines à partir d'aujourd'hui)
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);
      
      addLoan(
        bookId, 
        'ET2025001', // ID étudiant fixe pour cet exemple
        returnDate.toISOString().split('T')[0]
      );
      
      toast.success('Livre emprunté avec succès');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Rechercher par titre, auteur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={selectedDepartment === null ? "default" : "outline"}
            onClick={() => setSelectedDepartment(null)}
            className={selectedDepartment === null ? "bg-library-primary" : ""}
          >
            Tous
          </Button>
          
          {departments.map(dept => (
            <Button 
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              onClick={() => setSelectedDepartment(dept)}
              className={selectedDepartment === dept ? "bg-library-primary" : ""}
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">
        {selectedDepartment ? `Département ${selectedDepartment}` : 'Tous les livres'}
      </h2>

      <div className="space-y-6">
        {filteredBooks.map(book => {
          const isBorrowed = isBookBorrowed(book.id);
          
          return (
            <div key={book.id} className="bg-white p-6 rounded-lg shadow-sm border flex flex-col md:flex-row">
              <div className="w-full md:w-32 h-48 md:h-32 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <img 
                  src={`https://picsum.photos/seed/${book.id}/300/400`} 
                  alt={book.title} 
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-lg font-medium">{book.title}</h3>
                <p className="text-gray-600">Par {book.author}</p>
                <p className="text-sm text-gray-500 mt-2">{book.description}</p>
                
                <div className="mt-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4">
                  <div>
                    <span className="text-sm text-gray-600 block md:inline">Catégorie: {book.category}</span>
                    <span className="text-sm text-gray-600 block md:inline md:ml-4">Année: {book.year}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`px-3 py-1 text-sm rounded-full mr-4 ${
                      book.available && !isBorrowed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.available && !isBorrowed ? 'Disponible' : 'Indisponible'}
                    </span>
                    
                    <Button 
                      disabled={!book.available || isBorrowed}
                      onClick={() => handleBorrow(book.id)}
                      className={`${
                        book.available && !isBorrowed
                          ? 'bg-library-primary hover:bg-library-secondary' 
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {isBorrowed ? 'Déjà emprunté' : 'Emprunter'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Aucun livre ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
