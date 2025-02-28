
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense, formatCurrency, getTopExpenseCategories, calculateTotalExpenses, getCategoryLabel } from "@/lib/expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const totalExpenses = calculateTotalExpenses(expenses);
  const topCategories = getTopExpenseCategories(expenses, 3);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
          <p className="text-4xl font-bold text-foreground mt-1">{formatCurrency(totalExpenses)}</p>
        </div>

        {expenses.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Top Categories</h3>
            <div className="space-y-3">
              {topCategories.map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full expense-category-${category}`}></div>
                    <span className="text-sm">{getCategoryLabel(category)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatCurrency(amount)}</span>
                    <span className="text-xs text-muted-foreground">
                      ({((amount / totalExpenses) * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-md bg-muted p-4 text-center text-sm">
          <p className="text-muted-foreground">
            {expenses.length > 0
              ? `You've added ${expenses.length} expense${expenses.length === 1 ? "" : "s"} this month.`
              : "Add your first expense to see your spending patterns."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
