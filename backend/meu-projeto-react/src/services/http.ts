// src/services/http.ts
import axios from "axios";

// URL do seu backend no Oracle Cloud
const API_BASE = import.meta.env.VITE_API_BASE || "https://seu-dominio.oraclecloud.com/api";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // Aumente o timeout para cloud
  headers: {
    "Content-Type": "application/json",
    // Headers que o Oracle Cloud pode exigir
    "Accept": "application/json",
  },
});

// Interceptor para debug detalhado
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 Request to: ${config.baseURL}${config.url}`);
    console.log(`📝 Method: ${config.method?.toUpperCase()}`);
    if (config.data) {
      console.log(`📦 Data:`, config.data);
    }
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Função para testar conexão com Oracle Cloud
export async function testOracleConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.get("/health");
    return {
      success: true,
      message: `✅ Oracle Cloud Backend Conectado! Status: ${response.status}`
    };
  } catch (error: any) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    
    if (status === 404) {
      return {
        success: false,
        message: "❌ Rota não encontrada. Verifique a URL da API."
      };
    } else if (status === 401) {
      return {
        success: false,
        message: "❌ Problema de autenticação com Oracle Cloud."
      };
    } else if (error.code === 'NETWORK_ERROR') {
      return {
        success: false,
        message: "❌ Não foi possível conectar ao Oracle Cloud. Verifique a URL."
      };
    } else {
      return {
        success: false,
        message: `❌ Erro ${status}: ${message}`
      };
    }
  }
}