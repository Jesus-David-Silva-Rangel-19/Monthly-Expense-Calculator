
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, Category, Expense, generateId, getCategoryLabel } from "@/lib/expense";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<Category>("other");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast({
        title: "Cantidad inválida",
        description: "Por favor, introduce una cantidad válida mayor que cero.",
        variant: "destructive",
      });
      return;
    }

    if (description.trim() === "") {
      toast({
        title: "Descripción requerida",
        description: "Por favor, introduce una descripción para el gasto.",
        variant: "destructive",
      });
      return;
    }

    const newExpense: Expense = {
      id: generateId(),
      amount: amountValue,
      description: description.trim(),
      category,
      date: new Date(),
    };

    onAddExpense(newExpense);
    
    // Reset form
    setAmount("");
    setDescription("");
    setCategory("other");

    toast({
      title: "Gasto añadido",
      description: "Tu gasto ha sido añadido con éxito.",
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Añadir Nuevo Gasto</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Cantidad (€)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="¿En qué gastaste?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {getCategoryLabel(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full transition-all duration-300 hover:shadow-md"
          >
            Añadir Gasto
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ExpenseForm;
