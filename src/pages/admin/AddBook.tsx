
import { AddBookForm } from '@/components/AddBookForm';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const navigate = useNavigate();
  
  return (
    <div>
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour
      </button>
      
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-6">Ajouter un nouveau livre</h2>
        <AddBookForm onSuccess={() => navigate('/admin/catalogue')} />
      </div>
    </div>
  );
}
