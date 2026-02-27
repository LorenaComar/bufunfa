const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

const corsOptions = {
  origin: 'http://localhost:5173', 
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Backend funcionando!',
    timestamp: new Date().toISOString(),
    message: 'Banco Bufunfa API'
  });
});

// Rota de login mock
app.post('/api/auth/login', (req, res) => {
  const { email, senha } = req.body;
  
  console.log('📧 Tentativa de login:', email);
  
  // Simula delay de rede
  setTimeout(() => {
    res.json({
      token: 'mock-jwt-token-' + Date.now(),
      usuario: {
        id: 1,
        nome: email.split('@')[0],
        email: email,
        logradouro: 'Rua Mock, 123',
        createdAt: new Date().toISOString()
      }
    });
  }, 1000);
});

// Rota de cadastro mock
app.post('/api/auth/register', (req, res) => {
  const { nome, email, logradouro, senha } = req.body;
  
  console.log('📝 Novo cadastro:', nome, email);
  
  setTimeout(() => {
    res.json({
      id: 2,
      nome,
      email,
      logradouro,
      createdAt: new Date().toISOString()
    });
  }, 1000);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em: http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});