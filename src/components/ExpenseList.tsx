
import React from "react";
import { Expense, formatCurrency, getCategoryLabel } from "@/lib/expense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <Card className="w-full animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl">Expenses</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No expenses for this month yet.</p>
          <p className="text-muted-foreground mt-1">Add an expense to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[350px] overflow-y-auto pr-4">
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div 
                key={expense.id} 
                className="group p-3 border rounded-md transition-all duration-200 hover:shadow-sm bg-card animate-slide-up"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{expense.description}</span>
                      <Badge variant="outline" className={`expense-category-${expense.category} text-xs capitalize`}>
                        {getCategoryLabel(expense.category)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatCurrency(expense.amount)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      onClick={() => onDeleteExpense(expense.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
