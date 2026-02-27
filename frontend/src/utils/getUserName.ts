export const getUserName = (): string => {
  if (typeof window === 'undefined') return 'Usuário';
  
  const userData = localStorage.getItem('bufunfa-user');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return user.name || user.nome || user.email || 'Usuário';
    } catch {
      return 'Usuário';
    }
  }
  
  return 'Usuário';
};