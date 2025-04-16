
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, Clock, BarChart2, LayoutDashboard, LogOut } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'admin';
  const basePath = isAdmin ? '/admin' : '/student';

  const adminLinks = [
    { href: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/admin/catalogue", label: "Catalogue", icon: BookOpen },
    { href: "/admin/etudiants", label: "Étudiants", icon: Users },
    { href: "/admin/emprunts", label: "Emprunts", icon: Clock },
    { href: "/admin/statistiques", label: "Statistiques", icon: BarChart2 },
  ];

  const studentLinks = [
    { href: "/student/dashboard", label: "Mes Emprunts", icon: Clock },
    { href: "/student/catalogue", label: "Catalogue", icon: BookOpen },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <div className={cn("h-screen w-64 bg-white border-r flex flex-col", className)}>
      <div className="p-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-library-primary">ISET Tozeur</h2>
          <p className="text-gray-500 text-sm">Bibliothèque</p>
        </div>
      </div>

      <div className="mt-6 flex-1">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center py-3 px-3 rounded-md text-sm font-medium",
                  isActive
                    ? "bg-library-light text-library-primary"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon size={20} className={cn("mr-3", isActive ? "text-library-primary" : "text-gray-500")} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t">
        <div className="flex flex-col">
          <p className="text-sm font-medium">Mode</p>
          <p className="text-library-primary font-semibold">{isAdmin ? 'Admin' : 'Étudiant'}</p>
          <p className="text-gray-500 text-xs">{isAdmin ? 'Administrateur' : user.name}</p>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center mt-4 text-red-500 hover:text-red-700 text-sm font-medium"
        >
          <LogOut size={16} className="mr-2" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}
