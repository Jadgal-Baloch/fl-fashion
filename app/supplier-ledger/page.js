"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Filter, Search, ArrowUpDown, Truck, CreditCard } from "lucide-react"

// Sample supplier ledger data
const supplierLedgerData = [
  { supplierNo: "306", supplierName: "DESTINA", balance: 0.0 },
  { supplierNo: "305", supplierName: "D & D PRONTO ( ITALY )", balance: 0.0 },
  { supplierNo: "304", supplierName: "IZZY", balance: 0.0 },
  { supplierNo: "303", supplierName: "ARTIM MODA ( ITALY )", balance: 0.0 },
  { supplierNo: "302", supplierName: "OOKA", balance: 0.0 },
  { supplierNo: "301", supplierName: "YES BON - G - Smack", balance: 0.0 },
  { supplierNo: "300", supplierName: "FLOWER MODA ITALY", balance: 0.0 },
  { supplierNo: "299", supplierName: "GLAMOUR MODA ITALY", balance: 0.0 },
  { supplierNo: "298", supplierName: "Trendy Lady (Prato)", balance: 0.0 },
  { supplierNo: "297", supplierName: "Laura & Laurent", balance: 0.0 },
  { supplierNo: "296", supplierName: "DEUX-NIM", balance: 0.0 },
]

// Sample supplier payments data
const supplierPaymentsData = [
  {
    id: "3832",
    date: "22-Sep-2025",
    supplierName: "Yunus/Imran",
    totalBalance: 6846.85,
    cashPaid: 700.0,
    bankCash: 0.0,
    remainingBalance: 6146.85,
  },
  {
    id: "3831",
    date: "19-Sep-2025",
    supplierName: "Patrome",
    totalBalance: 610.0,
    cashPaid: 610.0,
    bankCash: 0.0,
    remainingBalance: 0.0,
  },
  {
    id: "3830",
    date: "19-Sep-2025",
    supplierName: "LUZABELLE",
    totalBalance: 2538.0,
    cashPaid: 1653.0,
    bankCash: 0.0,
    remainingBalance: 885.0,
  },
  {
    id: "3829",
    date: "19-Sep-2025",
    supplierName: "Intence",
    totalBalance: 11082.5,
    cashPaid: 1980.0,
    bankCash: 0.0,
    remainingBalance: 9102.5,
  },
  {
    id: "3828",
    date: "19-Sep-2025",
    supplierName: "Promise",
    totalBalance: 582.0,
    cashPaid: 582.0,
    bankCash: 0.0,
    remainingBalance: 0.0,
  },
  {
    id: "3827",
    date: "19-Sep-2025",
    supplierName: "E DIVA",
    totalBalance: 2379.5,
    cashPaid: 337.5,
    bankCash: 0.0,
    remainingBalance: 2042.0,
  },
  {
    id: "3826",
    date: "19-Sep-2025",
    supplierName: "E DIVA",
    totalBalance: 2754.5,
    cashPaid: 375.0,
    bankCash: 0.0,
    remainingBalance: 2379.5,
  },
  {
    id: "3825",
    date: "19-Sep-2025",
    supplierName: "CECE ELLE",
    totalBalance: 1323.0,
    cashPaid: 1323.0,
    bankCash: 0.0,
    remainingBalance: 0.0,
  },
]

export default function SupplierLedgerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("ledger")
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  const sortedLedgerData = useMemo(() => {
    if (!sortColumn) return supplierLedgerData
    return [...supplierLedgerData].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  }, [supplierLedgerData, sortColumn, sortDirection])

  const sortedPaymentsData = useMemo(() => {
    if (!sortColumn) return supplierPaymentsData
    return [...supplierPaymentsData].sort((a, b) => {
      const aValue = sortColumn === "date" ? new Date(a[sortColumn]).getTime() : a[sortColumn]
      const bValue = sortColumn === "date" ? new Date(b[sortColumn]).getTime() : b[sortColumn]
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  }, [supplierPaymentsData, sortColumn, sortDirection])

  const filteredLedgerData = useMemo(
    () =>
      sortedLedgerData.filter(
        (item) =>
          item.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) || item.supplierNo.includes(searchTerm),
      ),
    [searchTerm, sortedLedgerData],
  )

  const filteredPaymentsData = useMemo(
    () =>
      sortedPaymentsData.filter(
        (item) => item.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.includes(searchTerm),
      ),
    [searchTerm, sortedPaymentsData],
  )

  const totalLedgerPages = Math.ceil(filteredLedgerData.length / itemsPerPage)
  const totalPaymentsPages = Math.ceil(filteredPaymentsData.length / itemsPerPage)
  const paginatedLedgerData = filteredLedgerData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const paginatedPaymentsData = filteredPaymentsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
            Supplier Ledger
          </Button>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200">{activeTab === "ledger" ? "Ledger" : "Payments"}</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
          {activeTab === "ledger" ? "Supplier Ledger" : "Supplier Payments"}
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
                  onClick={() => {
                    setActiveTab("ledger")
                    setCurrentPage(1)
                  }}
                >
                  <Truck className="h-4 w-4" />
                  Supplier Ledger
                </Button>
              </CardContent>
            </Card>

            {/* Payments Section */}
            <Card
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Payments</CardTitle>
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
                  variant={activeTab === "payments" ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start gap-2 font-medium rounded-lg transition-all duration-200 ${
                    activeTab === "payments"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                      : "text-blue-500 dark:text-blue-400 hover:bg-blue-500/10"
                  }`}
                  onClick={() => {
                    setActiveTab("payments")
                    setCurrentPage(1)
                  }}
                >
                  <CreditCard className="h-4 w-4" />
                  List
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value)
              setCurrentPage(1)
              setSortColumn("")
              setSortDirection("asc")
            }}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl">
                <TabsTrigger
                  value="ledger"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  Supplier Ledger
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  Supplier Payments
                </TabsTrigger>
              </TabsList>

              {/* Supplier Ledger Tab */}
              <TabsContent value="ledger">
                <Card
                  className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Supplier Ledger</CardTitle>
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
                          placeholder="Search suppliers..."
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                          }}
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
                              { key: "supplierNo", label: "Supplier No" },
                              { key: "supplierName", label: "Supplier Name" },
                              { key: "balance", label: "Balance" },
                            ].map((column) => (
                              <th
                                key={column.key}
                                className={`p-4 text-sm font-semibold text-blue-500 dark:text-blue-400 cursor-pointer hover:bg-blue-500/10 transition-colors duration-200 rounded-lg ${
                                  column.key === "balance" ? "text-right" : "text-left"
                                }`}
                                onClick={() => handleSort(column.key)}
                              >
                                <div className={`flex items-center gap-2 ${column.key === "balance" ? "justify-end" : ""}`}>
                                  {column.label}
                                  <ArrowUpDown className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                                  <Filter className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedLedgerData.map((item, index) => (
                            <tr
                              key={item.supplierNo}
                              className={`border-t border-gray-200/30 dark:border-gray-700/30 transition-colors duration-200 hover:bg-blue-500/5 ${
                                index % 2 === 0 ? "bg-white/20 dark:bg-gray-800/20" : "bg-blue-500/5"
                              }`}
                            >
                              <td className="p-4 text-sm">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                >
                                  {item.supplierNo}
                                </Button>
                              </td>
                              <td className="p-4 text-sm">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                >
                                  {item.supplierName}
                                </Button>
                              </td>
                              <td
                                className={`p-4 text-sm text-right ${
                                  item.balance > 0 ? "text-yellow-500 dark:text-yellow-400" : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {item.balance.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Footer */}
                    <div className="flex items-center justify-between mt-6 text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        Showing {paginatedLedgerData.length} of {filteredLedgerData.length} entries
                      </span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          className="border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === totalLedgerPages}
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalLedgerPages))}
                          className="border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Supplier Payments Tab */}
              <TabsContent value="payments">
                <Card
                  className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Supplier Payments</CardTitle>
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
                          placeholder="Search payments..."
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                          }}
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
                                { key: "supplierName", label: "Supplier Name" },
                                { key: "totalBalance", label: "Total Balance" },
                                { key: "cashPaid", label: "Cash Paid" },
                                { key: "bankCash", label: "Bank Cash" },
                                { key: "remainingBalance", label: "Remaining Balance" },
                              ].map((column) => (
                                <th
                                  key={column.key}
                                  className={`p-4 text-sm font-semibold text-blue-500 dark:text-blue-400 cursor-pointer hover:bg-blue-500/10 transition-colors duration-200 rounded-lg ${
                                    ["totalBalance", "cashPaid", "bankCash", "remainingBalance"].includes(column.key)
                                      ? "text-right"
                                      : "text-left"
                                  }`}
                                  onClick={() => handleSort(column.key)}
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
                            {paginatedPaymentsData.map((item, index) => (
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
                                    {item.supplierName}
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

                    {/* Table Footer */}
                    <div className="flex items-center justify-between mt-6 text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        Showing {paginatedPaymentsData.length} of {filteredPaymentsData.length} entries
                      </span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          className="border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === totalPaymentsPages}
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPaymentsPages))}
                          className="border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                        >
                          Next
                        </Button>
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