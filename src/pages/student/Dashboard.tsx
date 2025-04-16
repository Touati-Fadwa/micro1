
import { useLibrary } from '@/context/LibraryContext';
import { useAuth } from '@/context/AuthContext';
import { Search, BookOpen, Clock } from 'lucide-react';
import { useState } from 'react';

export default function StudentDashboard() {
  const { loans } = useLibrary();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const studentLoans = loans.filter(loan => 
    loan.studentId === user?.id && 
    loan.status === 'active'
  );

  const filteredLoans = studentLoans.filter(loan => 
    loan.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bibliothèque ISET Tozeur</h1>
        <p className="text-gray-600">Portail de {user?.name?.toLowerCase()}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Mes Emprunts</h2>
      </div>

      {studentLoans.map(loan => (
        <div key={loan.id} className="bg-blue-50 p-6 rounded-md mb-4 border border-blue-100">
          <h3 className="font-medium text-lg">{loan.bookTitle}</h3>
          <div className="flex mt-2">
            <div className="mr-8">
              <p className="text-sm text-gray-600">Emprunté le: {loan.borrowDate}</p>
              <p className="text-sm text-gray-600">À retourner le: {loan.returnDate}</p>
            </div>
            <div>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                En cours
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Département Informatique</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Rechercher par titre, auteur ou catégorie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border flex">
            <div className="w-32 h-32 mr-6 flex-shrink-0">
              <img 
                src="https://picsum.photos/seed/networks/300/300" 
                alt="Introduction aux Réseaux" 
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-medium">Introduction aux Réseaux</h3>
              <p className="text-gray-600">Par Ahmed Ben Ali</p>
              <p className="text-sm text-gray-500 mt-2">Guide complet sur les réseaux informatiques</p>
              
              <div className="mt-auto flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-600">Catégorie: Informatique</span>
                  <span className="text-sm text-gray-600 ml-4">Année: 2023</span>
                </div>
                
                <div className="flex items-center">
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 mr-4">
                    Disponible
                  </span>
                  <button className="px-4 py-2 bg-library-primary text-white rounded-md hover:bg-library-secondary">
                    Emprunter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
