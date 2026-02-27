// src/components/OracleConnectionTest/OracleConnectionTest.tsx
import React, { useState, useEffect } from "react";
import { testOracleConnection } from "../../services/http";

const OracleConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "Testando conexão..." });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOracleConnection();
  }, []);

  const checkOracleConnection = async () => {
    setLoading(true);
    const result = await testOracleConnection();
    setConnectionStatus(result);
    setLoading(false);
  };

  return (
    <div className={`alert ${
      connectionStatus.success === null ? 'alert-info' :
      connectionStatus.success ? 'alert-success' : 'alert-danger'
    }`}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong>Oracle Cloud Status:</strong> {connectionStatus.message}
        </div>
        <button 
          className="btn btn-sm btn-outline-secondary"
          onClick={checkOracleConnection}
          disabled={loading}
        >
          {loading ? "🔄" : "🔄 Testar"}
        </button>
      </div>
      
      {!connectionStatus.success && connectionStatus.success !== null && (
        <div className="mt-2">
          <small>
            <strong>Dicas para resolver:</strong>
            <ul className="mb-0 mt-1">
              <li>Verifique se a URL no .env está correta</li>
              <li>Confirme se o backend está deployado no Oracle Cloud</li>
              <li>Verifique as configurações de CORS no backend</li>
              <li>Teste a URL diretamente no browser/postman</li>
            </ul>
          </small>
        </div>
      )}
    </div>
  );
};

export default OracleConnectionTest;