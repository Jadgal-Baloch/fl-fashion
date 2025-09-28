"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Package, ShoppingCart, BarChart3 } from "lucide-react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const dashboardStats = [
  { title: "Total Sales Today", value: 5198329.2, icon: TrendingUp, color: "text-green-400" },
  { title: "Stock in Hand", value: 211023.91, icon: Package, color: "text-blue-400" },
  { title: "Total Purchase Value", value: 5075864.63, icon: ShoppingCart, color: "text-orange-400" },
]

const reportTabs = ["Total", "Sales By Customer", "Supplier", "Summary by Products", "Receivable", "Payable"]

export default function Dashboard() {
  const [activeReportTab, setActiveReportTab] = useState("Total")

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", minimumFractionDigits: 2 }).format(value)

  const chartData = {
    labels: ["Total Sales Today", "Stock in Hand", "Total Purchase Value"],
    datasets: [
      {
        label: "Financial Metrics",
        data: [5198329.2, 211023.91, 5075864.63],
        backgroundColor: ["rgba(74, 222, 128, 0.5)", "rgba(59, 130, 246, 0.5)", "rgba(249, 115, 22, 0.5)"],
        borderColor: ["rgba(74, 222, 128, 1)", "rgba(59, 130, 246, 1)", "rgba(249, 115, 22, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Value (PKR)", color: "#1F2937" },
        ticks: {
          color: "#1F2937",
          callback: (value) =>
            new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", minimumFractionDigits: 0 }).format(value),
        },
      },
      x: { title: { display: true, text: "Metrics", color: "#1F2937" }, ticks: { color: "#1F2937" } },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR" }).format(context.raw),
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">
          <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
            🏠
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Dashboard</h1>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-in">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stat.value)}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color} opacity-80`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-in">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Reports</CardTitle>
                <BarChart3 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-8">
                {reportTabs.map((tab) => (
                  <Button
                    key={tab}
                    variant={activeReportTab === tab ? "default" : "outline"}
                    size="sm"
                    className={`text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeReportTab === tab
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                        : "border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10"
                    }`}
                    onClick={() => setActiveReportTab(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              <div className="border border-gray-200/30 dark:border-gray-700/30 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-blue-500/10 backdrop-blur-sm">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-blue-500 dark:text-blue-400">Description</th>
                      <th className="text-right p-4 text-sm font-semibold text-blue-500 dark:text-blue-400">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardStats.map((stat, index) => (
                      <tr key={stat.title} className={`border-t border-gray-200/30 dark:border-gray-700/30 transition-colors duration-200 hover:bg-blue-500/5 ${index % 2 === 0 ? "bg-white/20 dark:bg-gray-800/20" : "bg-blue-500/5"}`}>
                        <td className="p-4 text-sm text-gray-900 dark:text-white">{stat.title}</td>
                        <td className="p-4 text-sm text-gray-900 dark:text-white text-right">{formatCurrency(stat.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
