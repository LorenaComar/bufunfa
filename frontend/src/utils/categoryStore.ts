import { Category } from '../types/categoryStore';

const CATEGORIES_KEY = 'bufunfa-categorias';

export const normalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const existsByName = (categories: Category[], name: string): boolean => {
  const normalized = normalizeName(name);
  return categories.some(cat => normalizeName(cat.nome) === normalized);
};

export const loadCategories = (): Category[] => {
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// CORREÇÃO: Garantir que salva corretamente
export const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    console.log('Categorias salvas:', categories.length, 'categorias'); // Debug
  } catch (error) {
    console.error('Erro ao salvar categorias:', error);
  }
};

export const ensureDefaultsOnce = (): Category[] => {
  const existing = loadCategories();
  if (existing.length > 0) {
    console.log('Categorias carregadas:', existing.length); // Debug
    return existing;
  }

  const defaultCategories: Category[] = [
    {
      id: '1',
      nome: 'Comida',
      cor: '#FF6B6B',
      icone: 'fa-utensils',
      ativa: true,
    },
    {
      id: '2',
      nome: 'Transporte',
      cor: '#4ECDC4',
      icone: 'fa-car',
      ativa: true,
    },
    {
      id: '3',
      nome: 'Lazer',
      cor: '#45B7D1',
      icone: 'fa-gamepad',
      ativa: true,
    },
  ];

  saveCategories(defaultCategories);
  console.log('Categorias padrão criadas'); // Debug
  return defaultCategories;
};