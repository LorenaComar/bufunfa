// Código atual que você já tem...
export const login = async (email: string, password: string) => {
  // ...seu código atual
};

export const saveAuth = (token: string, user: any) => {
  // ...seu código atual  
};

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  // ...seu código atual
};

export const logout = () => {
  // ...seu código atual
};

export const getCurrentUser = () => {
  // ...seu código atual
};

export const isAuthenticated = () => {
  // ...seu código atual
};

// === ⬇️ ADICIONE ESTE CÓDIGO AQUI NO FINAL ⬇️ ===

// === DEBUG FUNCTIONS ===
// Função para debug no console - NÃO interfere na aplicação principal
export const debugLogin = () => {
  const mockUser = {
    id: 999,
    email: "debug@teste.com", 
    name: "Debug User",
    role: "admin"
  };
  
  const mockToken = "debug-token";
  saveAuth(mockToken, mockUser);
  
  console.log("🔓 DEBUG LOGIN - Usuário logado:", mockUser);
  
  // Recarrega a página para aplicar a autenticação
  setTimeout(() => {
    window.location.reload();
  }, 500);
  
  return { token: mockToken, user: mockUser };
};

// Também adicione esta função para facilitar
export const debugCheckAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  console.log('🔍 DEBUG AUTH CHECK:');
  console.log('Token:', token);
  console.log('User:', user ? JSON.parse(user) : null);
  return { token, user: user ? JSON.parse(user) : null };
};

(window as any).debugLogin = debugLogin;
(window as any).debugCheckAuth = debugCheckAuth;