
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '@/types';

// Définition du type AuthContextType
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// URL de base de l'API
const API_URL = 'http://localhost:5000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Vérifier si un token existe au chargement
  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'x-auth-token': token
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role as UserRole,
              department: userData.department
            });
          } else {
            // Si le token n'est plus valide, on déconnecte l'utilisateur
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du token', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
    };

    verifyUser();
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', data.token);
        setToken(data.token);
        
        // Mettre à jour l'utilisateur
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role as UserRole,
          department: data.user.department
        });
        
        setLoading(false);
        return true;
      } else {
        setError(data.message || 'Erreur de connexion');
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      setError('Erreur de connexion au serveur');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      loading,
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
