
import { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AddStudentFormProps {
  onSuccess?: () => void;
}

export function AddStudentForm({ onSuccess }: AddStudentFormProps) {
  const { addStudent } = useLibrary();
  const [formData, setFormData] = useState({
    name: '',
    id: `ET${new Date().getFullYear()}XXX`,
    department: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.department || !formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    // Simuler l'ajout d'un étudiant
    addStudent({
      name: formData.name,
      department: formData.department,
      email: formData.email
    });
    
    toast.success('Étudiant ajouté avec succès');
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nom complet</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom et prénom"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">ID Étudiant</label>
        <input
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="ET2024XXX"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Département</label>
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Ex: Informatique"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="étudiant@iset.tn"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe pour l'étudiant"
          className="w-full p-2 border rounded-md"
          required
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
