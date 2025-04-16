
import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AddBookFormProps {
  onSuccess?: () => void;
}

export function AddBookForm({ onSuccess }: AddBookFormProps) {
  const { addBook } = useLibrary();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    year: new Date().getFullYear(),
    copies: 1,
    isbn: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'copies' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.category) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    addBook({
      ...formData,
      available: true
    });
    
    toast.success('Livre ajouté avec succès');
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre*</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre du livre"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Auteur*</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Nom de l'auteur"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Catégorie*</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Ex: Informatique"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Année de publication*</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre d'exemplaires*</label>
          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">ISBN</label>
          <input
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="978XXXXXXXXXX"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description du livre"
          rows={3}
          className="w-full p-2 border rounded-md resize-none"
        />
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Annuler
        </Button>
        <Button type="submit" className="bg-library-primary hover:bg-library-secondary">
          Ajouter
        </Button>
      </div>
    </form>
  );
}
