import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import BancoBufunfaPage from "./pages/BancoBufunfaPage";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import TransacoesPage from "./pages/TransacoesPage";
import CategoriasPage from "./pages/CategoriasPage";


// Função temporária enquanto corrige o authService
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!(token && user);
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return !isAuthenticated() ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <BancoBufunfaPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/cadastro" 
          element={
            <PublicRoute>
              <CadastroPage />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/transacoes" 
          element={
            <ProtectedRoute>
              <TransacoesPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/categorias" 
          element={
            <ProtectedRoute>
              <CategoriasPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    
    </div>
  );
}