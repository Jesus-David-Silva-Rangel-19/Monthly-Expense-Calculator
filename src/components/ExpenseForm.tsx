
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, Category, Expense, generateId } from "@/lib/expense";
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
        title: "Invalid amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }

    if (description.trim() === "") {
      toast({
        title: "Description required",
        description: "Please enter a description for the expense.",
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
      title: "Expense added",
      description: "Your expense has been successfully added.",
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Expense</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
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
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What did you spend on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            Add Expense
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ExpenseForm;
