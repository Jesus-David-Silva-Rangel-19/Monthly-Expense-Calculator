
export type Category = 
  | 'food'
  | 'transportation'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'education'
  | 'other';

export const CATEGORIES: Category[] = [
  'food',
  'transportation',
  'housing',
  'utilities',
  'entertainment',
  'healthcare',
  'education',
  'other'
];

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: Date;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function getCategoryLabel(category: Category): string {
  const categoryLabels: Record<Category, string> = {
    'food': 'Alimentación',
    'transportation': 'Transporte',
    'housing': 'Vivienda',
    'utilities': 'Servicios',
    'entertainment': 'Entretenimiento',
    'healthcare': 'Salud',
    'education': 'Educación',
    'other': 'Otros'
  };
  
  return categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getCurrentMonthExpenses(expenses: Expense[]): Expense[] {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });
}

export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function calculateCategoryTotals(expenses: Expense[]): Record<Category, number> {
  const categoryTotals = CATEGORIES.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {} as Record<Category, number>);

  expenses.forEach(expense => {
    categoryTotals[expense.category] += expense.amount;
  });

  return categoryTotals;
}

export function getTopExpenseCategories(expenses: Expense[], limit: number = 3): [Category, number][] {
  const categoryTotals = calculateCategoryTotals(expenses);
  
  return Object.entries(categoryTotals)
    .filter(([_, amount]) => amount > 0)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, limit) as [Category, number][];
}

export function getMonthName(monthIndex: number): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthIndex];
}

export function getCurrentMonthYear(): string {
  const now = new Date();
  return `${getMonthName(now.getMonth())} ${now.getFullYear()}`;
}

export const categoryColors: Record<Category, { bg: string; text: string }> = {
  food: { bg: 'bg-amber-500', text: 'text-amber-50' },
  transportation: { bg: 'bg-blue-500', text: 'text-blue-50' },
  housing: { bg: 'bg-emerald-500', text: 'text-emerald-50' },
  utilities: { bg: 'bg-indigo-500', text: 'text-indigo-50' },
  entertainment: { bg: 'bg-purple-500', text: 'text-purple-50' },
  healthcare: { bg: 'bg-red-500', text: 'text-red-50' },
  education: { bg: 'bg-cyan-500', text: 'text-cyan-50' },
  other: { bg: 'bg-gray-500', text: 'text-gray-50' }
};
