"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, List, Filter, Search, ArrowUpDown, Calendar } from "lucide-react"

// Sample stock data based on the original design
const stockData = [
  {
    id: "197",
    date: "Fri Sep 13 2024 03:00:00 GMT+0400 (Gulf Standard Time)",
    statusId: "2",
    userId: "39",
  },
  {
    id: "196",
    date: "Thu Sep 12 2024 03:00:00 GMT+0400 (Gulf Standard Time)",
    statusId: "2",
    userId: "43",
  },
  {
    id: "195",
    date: "Sun Sep 08 2024 03:00:00 GMT+0400 (Gulf Standard Time)",
    statusId: "2",
    userId: "43",
  },
  {
    id: "193",
    date: "Fri Sep 06 2024 03:00:00 GMT+0400 (Gulf Standard Time)",
    statusId: "2",
    userId: "43",
  },
  {
    id: "192",
    date: "Wed Sep 04 2024 03:00:00 GMT+0400 (Gulf Standard Time)",
    statusId: "2",
    userId: "30",
  },
  {
    id: "191",
    date: "Wed Sep 04 2024 03:00:00 GMT+0400 (Gulf Standard Time)",
    statusId: "2",
    userId: "30",
  },
]

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState("")
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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const sortedData = useMemo(() => {
    if (!sortColumn) return stockData
    return [...stockData].sort((a, b) => {
      const aValue = sortColumn === "date" ? new Date(a[sortColumn]).getTime() : a[sortColumn]
      const bValue = sortColumn === "date" ? new Date(b[sortColumn]).getTime() : b[sortColumn]
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  }, [stockData, sortColumn, sortDirection])

  const filteredData = useMemo(
    () =>
      sortedData.filter(
        (item) => item.id.includes(searchTerm) || item.userId.includes(searchTerm) || item.statusId.includes(searchTerm),
      ),
    [searchTerm, sortedData],
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
            Stock
          </Button>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200">Stock</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Stock Count</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stock Section */}
            <Card
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Stock</CardTitle>
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
                  variant="default"
                  size="sm"
                  className="w-full justify-start gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                >
                  <List className="h-4 w-4" />
                  List
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card
              className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Stock Count</CardTitle>
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
                {/* Search and Filters */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                    <Input
                      placeholder="Search by ID, Status, or User..."
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
                            { key: "statusId", label: "Status ID" },
                            { key: "userId", label: "User ID" },
                          ].map((column) => (
                            <th
                              key={column.key}
                              className="text-left p-4 text-sm font-semibold text-blue-500 dark:text-blue-400 cursor-pointer hover:bg-blue-500/10 transition-colors duration-200 rounded-lg"
                              onClick={() => handleSort(column.key)}
                            >
                              <div className="flex items-center gap-2">
                                {column.label}
                                <ArrowUpDown className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                                <Filter className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((item, index) => (
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
                            <td className="p-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                >
                                  {formatDate(item.date)}
                                </Button>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-center">
                              <Badge
                                variant="outline"
                                className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 rounded-full px-3 py-1"
                              >
                                {item.statusId}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm text-center">
                              <Badge
                                variant="outline"
                                className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 rounded-full px-3 py-1"
                              >
                                {item.userId}
                              </Badge>
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
                    Showing {paginatedData.length} of {filteredData.length} entries
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
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className="border-blue-500/50 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}