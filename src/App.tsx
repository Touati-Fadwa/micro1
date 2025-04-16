import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LibraryProvider } from "./context/LibraryContext";
import { MainLayout } from "./layouts/MainLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import Catalogue from "./pages/admin/Catalogue";
import Students from "./pages/admin/Students";
import Loans from "./pages/admin/Loans";
import Statistics from "./pages/admin/Statistics";
import StudentDashboard from "./pages/student/Dashboard";
import StudentCatalogue from "./pages/student/Catalogue";
import AddBook from "./pages/admin/AddBook";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Route protection component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode,
  requiredRole?: 'admin' | 'student'
}) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LibraryProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={<MainLayout />}>
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/catalogue" element={
                  <ProtectedRoute requiredRole="admin">
                    <Catalogue />
                  </ProtectedRoute>
                } />
                <Route path="/admin/add-book" element={
                  <ProtectedRoute requiredRole="admin">
                    <AddBook />
                  </ProtectedRoute>
                } />
                <Route path="/admin/etudiants" element={
                  <ProtectedRoute requiredRole="admin">
                    <Students />
                  </ProtectedRoute>
                } />
                <Route path="/admin/emprunts" element={
                  <ProtectedRoute requiredRole="admin">
                    <Loans />
                  </ProtectedRoute>
                } />
                <Route path="/admin/statistiques" element={
                  <ProtectedRoute requiredRole="admin">
                    <Statistics />
                  </ProtectedRoute>
                } />
                
                {/* Student Routes */}
                <Route path="/student/dashboard" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/student/catalogue" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentCatalogue />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LibraryProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
