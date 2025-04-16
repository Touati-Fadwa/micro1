
import { useLibrary } from '@/context/LibraryContext';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Statistics() {
  const { books, loans, students } = useLibrary();

  // Données pour le graphique des livres par catégorie
  const booksByCategory = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const booksByCategoryData = Object.entries(booksByCategory).map(([name, value]) => ({
    name,
    value
  }));

  // Données pour le graphique des emprunts par mois
  const currentYear = new Date().getFullYear();
  const loansByMonth = loans.reduce((acc, loan) => {
    const date = new Date(loan.borrowDate);
    if (date.getFullYear() === currentYear) {
      const month = date.getMonth();
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  const loansByMonthData = Array.from({ length: 12 }, (_, i) => ({
    name: monthNames[i],
    value: loansByMonth[i] || 0
  }));

  // Couleurs pour le graphique en camembert
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  // Statistiques des étudiants
  const studentsWithLoans = students.filter(s => s.borrowedBooks > 0).length;
  const studentsWithoutLoans = students.length - studentsWithLoans;

  const studentsData = [
    { name: 'Avec emprunts', value: studentsWithLoans },
    { name: 'Sans emprunts', value: studentsWithoutLoans }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Livres par catégorie</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={booksByCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {booksByCategoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Emprunts par mois ({currentYear})</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={loansByMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Statistiques générales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-blue-800 font-medium">Total des livres</h4>
              <p className="text-2xl font-bold">{books.length}</p>
              <p className="text-sm text-gray-500">Dont {books.filter(b => b.available).length} disponibles</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-purple-800 font-medium">Total des emprunts</h4>
              <p className="text-2xl font-bold">{loans.length}</p>
              <p className="text-sm text-gray-500">Dont {loans.filter(l => l.status === 'active').length} en cours</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-green-800 font-medium">Total des étudiants</h4>
              <p className="text-2xl font-bold">{students.length}</p>
              <p className="text-sm text-gray-500">Dont {studentsWithLoans} avec emprunts actifs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
