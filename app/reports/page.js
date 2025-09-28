"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Printer, RefreshCw } from "lucide-react"

const reportsList = [
  "Daily Sales Product Wise Report",
  "Daily Buying Product Wise Report",
  "Stock in Hand Report",
  "Receivable Report",
  "Payable Report",
  "Daily Activity Report",
  "Daily Buying Report",
  "Daily Buying Return Report",
  "Daily Sales Report",
  "Daily Sales Return Report",
  "Comparison Report",
  "Daily Total Sales Report",
  "Month End Report",
  "Receivable Report",
  "Payable Report",
  "Stock Report",
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("Daily Sales Product Wise Report")
  const [fromDate, setFromDate] = useState("23-Sep-2025")
  const [toDate, setToDate] = useState("23-Sep-2025")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <main className="p-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            🏠
          </Button>
          <span>/</span>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            Daily Report Form
          </Button>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200">Reports</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
          {selectedReport}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Reports List */}
          <div className="lg:col-span-1">
            <Card
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 max-h-96 overflow-y-auto">
                {reportsList.map((report) => (
                  <Button
                    key={report}
                    variant={selectedReport === report ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start text-sm h-auto py-2 px-3 font-medium rounded-lg transition-all duration-200 ${
                      selectedReport === report
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                        : "text-blue-500 dark:text-blue-400 hover:bg-blue-500/10"
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-left truncate">{report}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Report Configuration */}
            <Card
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedReport}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40 rounded-full px-3 py-1 font-medium"
                  >
                    Person
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Select From Date</label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-lg pr-10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                        placeholder="DD-MMM-YYYY"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Select To Date</label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-lg pr-10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                        placeholder="DD-MMM-YYYY"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-start">
                  <Button
                    className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Report Display Area */}
            <Card
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedReport}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                    >
                      <Printer className="h-4 w-4" />
                      Print Invoice
                    </Button>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40 rounded-full px-3 py-1 font-medium"
                    >
                      Person
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Report Content Area */}
                <div className="min-h-96 flex items-center justify-center border-2 border-dashed border-gray-200/30 dark:border-gray-700/30 rounded-lg">
                  <div className="text-center space-y-4">
                    <FileText className="h-16 w-16 text-blue-500/70 dark:text-blue-400/70 mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Data Available</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                        Select a date range and click "Refresh" to generate the {selectedReport.toLowerCase()}.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="gap-2 bg-transparent border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Generate Report
                    </Button>
                  </div>
                </div>

                {/* Report Summary */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card
                    className="bg-white/30 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-lg"
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Records</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="bg-white/30 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-lg"
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Date Range</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {fromDate} - {toDate}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="bg-white/30 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-lg"
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Report Type</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Daily Sales</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}