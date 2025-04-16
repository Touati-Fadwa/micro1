
import { useAuth } from '@/context/AuthContext';
import { Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Determine page title based on location if not provided
  let pageTitle = title;
  if (!pageTitle) {
    const path = location.pathname;
    if (path.includes('dashboard')) pageTitle = 'Tableau de bord';
    else if (path.includes('catalogue')) pageTitle = 'Catalogue des Livres';
    else if (path.includes('etudiants')) pageTitle = 'Gestion des Étudiants';
    else if (path.includes('emprunts')) pageTitle = 'Gestion des Emprunts';
    else if (path.includes('statistiques')) pageTitle = 'Statistiques';
    else if (path.includes('student/dashboard')) pageTitle = 'Mes Emprunts';
  }

  return (
    <div className="flex justify-between items-center pb-6">
      <h1 className="text-2xl font-bold">{pageTitle}</h1>
      
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={20} />
        </button>
        
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm">
          {user?.role === 'admin' ? (
            <span>Connexion réussie <br /> Bienvenue, Administrateur</span>
          ) : (
            <span>Bienvenue, {user?.name}</span>
          )}
        </div>
      </div>
    </div>
  );
}
