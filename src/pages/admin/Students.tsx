
import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { Search, Eye, Trash2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddStudentForm } from '@/components/AddStudentForm';

export default function Students() {
  const { students, deleteStudent } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      deleteStudent(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-library-primary hover:bg-library-secondary">
              <UserPlus className="mr-2 h-4 w-4" /> Ajouter un étudiant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel étudiant</DialogTitle>
            </DialogHeader>
            <AddStudentForm onSuccess={() => setIsAddStudentOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white p-6 rounded-md shadow-sm border">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium">{student.name.toLowerCase()}</h3>
                <p className="text-gray-500">ID: {student.id}</p>
                
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">Département: {student.department}</p>
                  <p className="text-sm text-gray-600">Livres empruntés: {student.borrowedBooks}</p>
                  <p className="text-sm text-gray-600">Email: {student.email}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                  <Eye size={16} className="mr-1" /> Voir détails
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(student.id)}
                >
                  <Trash2 size={16} className="mr-1" /> Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Aucun étudiant ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
