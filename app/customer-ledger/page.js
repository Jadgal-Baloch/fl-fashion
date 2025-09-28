"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Filter, Search, ArrowUpDown, Users, Receipt } from "lucide-react"

// Sample customer ledger data
const customerLedgerData = [
  { customerNo: "823", customerName: "Tahsin ( Vesture )", balance: 0.0 },
  { customerNo: "822", customerName: "sexy dolls", balance: 0.0 },
  { customerNo: "821", customerName: "ABDULLAH", balance: 0.0 },
  { customerNo: "820", customerName: "jaggar and co", balance: 0.0 },
  { customerNo: "819", customerName: "Styled By Mey", balance: 0.0 },
  { customerNo: "818", customerName: "MILA BATH ( ARCANIA )", balance: 0.0 },
  { customerNo: "817", customerName: "Safar", balance: 0.0 },
  { customerNo: "815", customerName: "TT Ten Claudine", balance: 0.0 },
  { customerNo: "814", customerName: "Black rock beata", balance: 0.0 },
]

// Sample customer receivings data
const customerReceivingsData = [
  {
    id: "3952",
    date: "22-Sep-2025",
    customerName: "Anna",
    totalBalance: 2000.1,
    cashPaid: 500.0,
    bankCash: 0.0,
    remainingBalance: 1500.1,
  },
  {
    id: "3951",
    date: "22-Sep-2025",
    customerName: "Farhan (WG)",
    totalBalance: 24109.33,
    cashPaid: 0.0,
    bankCash: 2834.08,
    remainingBalance: 21275.25,
  },
  {
    id: "3949",
    date: "22-Sep-2025",
    customerName: "Himmat",
    totalBalance: 784.68,
    cashPaid: 100.0,
    bankCash: 0.0,
    remainingBalance: 684.68,
  },
  {
    id: "3948",
    date: "22-Sep-2025",
    customerName: "Yukesh",
    totalBalance: 245.0,
    cashPaid: 245.0,
    bankCash: 0.0,
    remainingBalance: 0.0,
  },
  {
    id: "3947",
    date: "21-Sep-2025",
    customerName: "Shafqat",
    totalBalance: 2227.5,
    cashPaid: 1200.0,
    bankCash: 0.0,
    remainingBalance: 1027.5,
  },
]

export default function CustomerLedgerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("ledger")

  const filteredLedgerData = customerLedgerData.filter(
    (item) =>
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || item.customerNo.includes(searchTerm),
  )

  const filteredReceivingsData = customerReceivingsData.filter(
    (item) => item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.includes(searchTerm),
  )

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
            Customer Ledger
          </Button>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200">
            {activeTab === "ledger" ? "Ledger" : "Receivings"}
          </span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
          {activeTab === "ledger" ? "Customer Ledger" : "Customer Receivings"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ledger Section */}
            <Card
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Ledger</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant={activeTab === "ledger" ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start gap-2 font-medium rounded-lg transition-all duration-200 ${
                    activeTab === "ledger"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                      : "text-blue-500 dark:text-blue-400 hover:bg-blue-500/10"
                  }`}
                  onClick={() => setActiveTab("ledger")}
                >
                  <Users className="h-4 w-4" />
                  Customer Ledger
                </Button>
              </CardContent>
            </Card>

            {/* Receivings Section */}
            <Card
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Receivings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-blue-500 dark:text-blue-400 font-medium hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Add New
                </Button>
                <Button
                  variant={activeTab === "receivings" ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start gap-2 font-medium rounded-lg transition-all duration-200 ${
                    activeTab === "receivings"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                      : "text-blue-500 dark:text-blue-400 hover:bg-blue-500/10"
                  }`}
                  onClick={() => setActiveTab("receivings")}
                >
                  <Receipt className="h-4 w-4" />
                  List
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                <TabsTrigger
                  value="ledger"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg transition-colors duration-200"
                >
                  Customer Ledger
                </TabsTrigger>
                <TabsTrigger
                  value="receivings"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-lg transition-colors duration-200"
                >
                  Customer Receivings
                </TabsTrigger>
              </TabsList>

              {/* Customer Ledger Tab */}
              <TabsContent value="ledger">
                <Card
                  className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Customer Ledger
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40 rounded-full px-3 py-1 font-medium"
                      >
                        Person
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Drag a column header and drop it here to group by that column
                    </p>
                  </CardHeader>
                  <CardContent>
                    {/* Search */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                        <Input
                          placeholder="Search customers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                      >
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </div>

                    {/* Data Table */}
                    <div className="border border-gray-200/30 dark:border-gray-700/30 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-blue-500/10 backdrop-blur-sm">
                          <tr>
                            {[
                              { key: "customerNo", label: "Customer No" },
                              { key: "customerName", label: "Customer Name" },
                              { key: "balance", label: "Balance" },
                            ].map((column) => (
                              <th
                                key={column.key}
                                className="text-left p-4 text-sm font-semibold text-blue-500 dark:text-blue-400 cursor-pointer hover:bg-blue-500/10 transition-colors duration-200 rounded-lg"
                              >
                                <div
                                  className={`flex items-center gap-2 ${
                                    column.key === "balance" ? "justify-end" : ""
                                  }`}
                                >
                                  {column.label}
                                  <ArrowUpDown className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                                  <Filter className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLedgerData.map((item, index) => (
                            <tr
                              key={item.customerNo}
                              className={`border-t border-gray-200/30 dark:border-gray-700/30 transition-colors duration-200 hover:bg-blue-500/5 ${
                                index % 2 === 0 ? "bg-white/20 dark:bg-gray-800/20" : "bg-blue-500/5"
                              }`}
                            >
                              <td className="p-4 text-sm">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                >
                                  {item.customerNo}
                                </Button>
                              </td>
                              <td className="p-4 text-sm">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                >
                                  {item.customerName}
                                </Button>
                              </td>
                              <td className="p-4 text-sm text-gray-900 dark:text-white text-right">
                                {item.balance.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Customer Receivings Tab */}
              <TabsContent value="receivings">
                <Card
                  className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Customer Receivings
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40 rounded-full px-3 py-1 font-medium"
                      >
                        Person
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Drag a column header and drop it here to group by that column
                    </p>
                  </CardHeader>
                  <CardContent>
                    {/* Search */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                        <Input
                          placeholder="Search receivings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                      >
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </div>

                    {/* Data Table */}
                    <div className="border border-gray-200/30 dark:border-gray-700/30 rounded-xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-blue-500/10 backdrop-blur-sm">
                            <tr>
                              {[
                                { key: "id", label: "ID" },
                                { key: "date", label: "Date" },
                                { key: "customerName", label: "Customer Name" },
                                { key: "totalBalance", label: "Total Balance" },
                                { key: "cashPaid", label: "Cash Paid" },
                                { key: "bankCash", label: "Bank Cash" },
                                { key: "remainingBalance", label: "Remaining Balance" },
                              ].map((column) => (
                                <th
                                  key={column.key}
                                  className="text-left p-4 text-sm font-semibold text-blue-500 dark:text-blue-400 cursor-pointer hover:bg-blue-500/10 transition-colors duration-200 rounded-lg"
                                >
                                  <div
                                    className={`flex items-center gap-2 ${
                                      ["totalBalance", "cashPaid", "bankCash", "remainingBalance"].includes(column.key)
                                        ? "justify-end"
                                        : ""
                                    }`}
                                  >
                                    {column.label}
                                    <ArrowUpDown className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                                    <Filter className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredReceivingsData.map((item, index) => (
                              <tr
                                key={item.id}
                                className={`border-t border-gray-200/30 dark:border-gray-700/30 transition-colors duration-200 hover:bg-blue-500/5 ${
                                  index % 2 === 0 ? "bg-white/20 dark:bg-gray-800/20" : "bg-blue-500/5"
                                }`}
                              >
                                <td className="p-4 text-sm">
                                  <Button
                                    variant="link"
                                    className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                  >
                                    {item.id}
                                  </Button>
                                </td>
                                <td className="p-4 text-sm text-gray-900 dark:text-white">{item.date}</td>
                                <td className="p-4 text-sm">
                                  <Button
                                    variant="link"
                                    className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                  >
                                    {item.customerName}
                                  </Button>
                                </td>
                                <td className="p-4 text-sm text-gray-900 dark:text-white text-right">
                                  {item.totalBalance.toFixed(2)}
                                </td>
                                <td className="p-4 text-sm text-gray-900 dark:text-white text-right">
                                  {item.cashPaid.toFixed(2)}
                                </td>
                                <td className="p-4 text-sm text-gray-900 dark:text-white text-right">
                                  {item.bankCash.toFixed(2)}
                                </td>
                                <td
                                  className={`p-4 text-sm text-right ${
                                    item.remainingBalance > 0
                                      ? "text-yellow-500 dark:text-yellow-400"
                                      : "text-gray-900 dark:text-white"
                                  }`}
                                >
                                  {item.remainingBalance.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}