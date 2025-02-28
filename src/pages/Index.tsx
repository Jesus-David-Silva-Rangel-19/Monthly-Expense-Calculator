
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseChart from "@/components/ExpenseChart";
import { Expense, getCurrentMonthYear } from "@/lib/expense";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { toast } = useToast();
  const currentMonthYear = getCurrentMonthYear();

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      try {
        const parsedExpenses = JSON.parse(savedExpenses);
        
        // Convert string dates back to Date objects
        const formattedExpenses = parsedExpenses.map((expense: any) => ({
          ...expense,
          date: new Date(expense.date)
        }));
        
        setExpenses(formattedExpenses);
      } catch (error) {
        console.error("Error loading expenses:", error);
        toast({
          title: "Error",
          description: "Failed to load your expense data.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    toast({
      title: "Expense deleted",
      description: "The expense has been removed."
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 md:py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Monthly Expenses</h1>
          <p className="text-muted-foreground text-lg">{currentMonthYear}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
          <div>
            <ExpenseSummary expenses={expenses} />
          </div>
          <div>
            <ExpenseChart expenses={expenses} />
          </div>
        </div>

        <div className="mt-8">
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </div>
      </div>
    </div>
  );
};

export default Index;
