
import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { Link } from 'react-router-dom';
import { Search, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddBookForm } from '@/components/AddBookForm';

export default function Catalogue() {
  const { books, deleteBook } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      deleteBook(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Rechercher un livre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
          <DialogTrigger asChild>
            <Button className="bg-library-primary hover:bg-library-secondary">
              <FileText className="mr-2 h-4 w-4" /> Ajouter un livre
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau livre</DialogTitle>
            </DialogHeader>
            <AddBookForm onSuccess={() => setIsAddBookOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white p-6 rounded-md shadow-sm border">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">{book.title}</h3>
              <p className="text-gray-500">Par {book.author}</p>
              
              <div className="mt-2 flex gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Catégorie: {book.category}</span>
                <span className="text-sm text-gray-600">Année: {book.year}</span>
                <span className="text-sm text-gray-600">ISBN: {book.isbn}</span>
                <span className="text-sm text-gray-600">Exemplaires: {book.copies}</span>
              </div>
              
              <p className="mt-2 text-gray-600">{book.description}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-3 py-1 text-sm rounded-full ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {book.available ? 'Disponible' : 'Indisponible'}
                </span>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                    <Edit size={16} className="mr-1" /> Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(book.id)}
                  >
                    <Trash2 size={16} className="mr-1" /> Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Aucun livre ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
