
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { calculateCategoryTotals, Category, CATEGORIES, getCategoryLabel } from "@/lib/expense";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExpenseChartProps {
  expenses: any[];
}

const COLORS = [
  "#f59e0b", // amber-500
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#6366f1", // indigo-500
  "#a855f7", // purple-500
  "#ef4444", // red-500
  "#06b6d4", // cyan-500
  "#6b7280", // gray-500
];

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const isMobile = useIsMobile();
  const categoryTotals = calculateCategoryTotals(expenses);

  const chartData = CATEGORIES.map((category, index) => ({
    name: getCategoryLabel(category),
    amount: categoryTotals[category],
    color: COLORS[index % COLORS.length],
    category,
  })).filter(item => item.amount > 0);

  if (expenses.length === 0) {
    return (
      <Card className="w-full animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl">Desglose de Gastos</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Añade gastos para ver tu desglose de gastos</p>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value.toFixed(2)}€`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Desglose de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {isMobile ? (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="amount"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="transition-all duration-300 hover:opacity-80" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  width={30}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar 
                  dataKey="amount" 
                  radius={[4, 4, 0, 0]}
                  className="transition-all duration-300 hover:opacity-80"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
