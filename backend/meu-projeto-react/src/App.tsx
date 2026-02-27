import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { testOracleConnection } from "./services/http";
import OracleConnectionTest from "./components/OracleConnectionTest/OracleConnectionTest";
import BancoBufunfaPage from "./pages/BancoBufunfaPage";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import TransacoesPage from "./pages/TransacoesPage";
import { isAuthenticated } from "./services/authService";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return !isAuthenticated() ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  const [oracleStatus, setOracleStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "Inicializando..." });

  useEffect(() => {
    checkOracleStatus();
  }, []);

  const checkOracleStatus = async () => {
    const result = await testOracleConnection();
    setOracleStatus(result);
  };

  return (
    <div className="App">
      {/* Banner de status do Oracle Cloud */}
      {oracleStatus.success !== null && !oracleStatus.success && (
        <div className="container mt-2">
          <OracleConnectionTest />
        </div>
      )}
      
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
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}