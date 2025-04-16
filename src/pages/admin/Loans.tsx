
import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { Search, Check, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Loans() {
  const { loans, returnBook } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLoans = loans.filter(loan => 
    loan.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReturn = (loanId: string) => {
    returnBook(loanId);
    toast.success('Livre retourné avec succès');
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Rechercher un emprunt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="space-y-4">
        {filteredLoans.map(loan => (
          <div key={loan.id} className="bg-white p-6 rounded-md shadow-sm border">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <BookOpen className="mr-2 text-library-primary" size={20} />
                  <h3 className="text-lg font-medium">{loan.bookTitle}</h3>
                </div>
                <p className="text-gray-500">Emprunté par: {loan.studentName}</p>
                
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">Date d'emprunt: {loan.borrowDate}</p>
                  <p className="text-sm text-gray-600">Date de retour: {loan.returnDate}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="px-3 py-1 mb-4 text-sm rounded-full bg-blue-100 text-blue-800">
                  En cours
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                  onClick={() => handleReturn(loan.id)}
                >
                  Gérer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Aucun emprunt ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
