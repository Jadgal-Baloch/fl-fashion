"use client"

import { useState, useEffect, useMemo } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, List, Filter, Search, ArrowUpDown, RotateCcw } from "lucide-react"

const COLUMN_TYPE = "COLUMN"

function DraggableColumn({ column, onDragStart }) {
  const [, drag] = useDrag({
    type: COLUMN_TYPE,
    item: column,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  })
  return (
    <th
      ref={drag}
      className="text-left p-4 text-sm font-semibold text-primary cursor-pointer hover:bg-primary/10 transition-colors duration-200 rounded-lg"
      onClick={() => onDragStart(column.key)}
    >
      <div className="flex items-center gap-2">
        {column.label}
        <ArrowUpDown className="h-4 w-4 text-primary/70" />
      </div>
    </th>
  )
}

function GroupingBar({ groupedColumns, onDropColumn }) {
  const [, drop] = useDrop({
    accept: COLUMN_TYPE,
    drop: (item) => onDropColumn(item),
  })

  return (
    <div
      ref={drop}
      className="min-h-[48px] mb-6 border-2 border-dashed border-primary/30 rounded-xl flex items-center gap-3 px-4 py-2 text-sm text-primary/70 bg-primary/5 backdrop-blur-sm transition-colors duration-300 hover:bg-primary/10"
    >
      {groupedColumns.length === 0 ? (
        <span className="italic">Drag a column header here to group</span>
      ) : (
        groupedColumns.map((col) => (
          <Badge
            key={col.key}
            variant="outline"
            className="bg-primary/20 text-primary border-primary/30 rounded-full px-3 py-1 font-medium transition-transform duration-200 hover:scale-105"
          >
            {col.label}
          </Badge>
        ))
      )}
    </div>
  )
}

export default function BuyingPage() {
  const [buyingReturnsData, setBuyingReturnsData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [groupedColumns, setGroupedColumns] = useState([])
  const itemsPerPage = 8

  // Mock data client-side
  useEffect(() => {
    const data = Array.from({ length: 30 }, (_, i) => ({
      bId: (8600 + i).toString(),
      invoiceDate: new Date(2023 + (i % 3), (i % 12), 1 + (i % 28)).toLocaleDateString("en-GB"),
      returnDate: new Date(2025, 7, 21).toLocaleDateString("en-GB"),
      tc: ["AM", "AG", "Local"][i % 3],
      supplier: ["Tendance", "Sarl LB", "Ramzi", "G.G", "Insta Girl"][i % 5],
      cash: parseFloat((Math.random() * 1000).toFixed(2)),
      account: parseFloat((Math.random() * 1000).toFixed(2)),
    }))
    setBuyingReturnsData(data)
  }, [])

  const columns = [
    { key: "bId", label: "B_Id" },
    { key: "invoiceDate", label: "Invoice Date" },
    { key: "returnDate", label: "Return Date" },
    { key: "tc", label: "TC" },
    { key: "supplier", label: "Supplier" },
    { key: "cash", label: "Cash" },
    { key: "account", label: "Account" },
  ]

  const handleSort = (column) => {
    if (sortColumn === column) setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleDropColumn = (column) => {
    if (!groupedColumns.some((c) => c.key === column.key)) {
      setGroupedColumns([...groupedColumns, column])
    }
  }

  const sortedData = useMemo(() => {
    if (!sortColumn) return buyingReturnsData
    return [...buyingReturnsData].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]
      if (typeof aValue === "number" && typeof bValue === "number") return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  }, [buyingReturnsData, sortColumn, sortDirection])

  const filteredData = useMemo(
    () =>
      sortedData.filter(
        (item) =>
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.bId.includes(searchTerm) ||
          item.tc.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, sortedData]
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getTcBadgeColor = (tc) => {
    switch (tc) {
      case "AM":
        return "bg-blue-500/20 text-blue-600 border-blue-500/40"
      case "AG":
        return "bg-green-500/20 text-green-600 border-green-500/40"
      case "Local":
        return "bg-purple-500/20 text-purple-600 border-purple-500/40"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600"
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navigation />

        <main className="p-6 max-w-7xl mx-auto">
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
              Setup
            </Button>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-200">Supplier</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Buying Returns</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {["Expense", "Expense Voucher", "Buying"].map((section) => (
                <Card
                  key={section}
                  className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">{section}</CardTitle>
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
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 text-blue-500 dark:text-blue-400 font-medium hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                    >
                      <List className="h-4 w-4" />
                      List
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">Buying Return</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-start gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                  >
                    <RotateCcw className="h-4 w-4" />
                    List
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Buying Returns</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40 rounded-full px-3 py-1 font-medium"
                    >
                      Person
                    </Badge>
                  </div>

                  {/* Drag-to-Group */}
                  <GroupingBar groupedColumns={groupedColumns} onDropColumn={handleDropColumn} />

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Drag a column header and drop it above to group by that column
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Search */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500/70 dark:text-blue-400/70" />
                      <Input
                        placeholder="Search by supplier, ID, or TC..."
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
                            {columns.map((column) => (
                              <DraggableColumn key={column.key} column={column} onDragStart={handleSort} />
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedData.map((item, index) => (
                            <tr
                              key={item.bId}
                              className={`border-t border-gray-200/30 dark:border-gray-700/30 transition-colors duration-200 hover:bg-blue-500/5 ${
                                index % 2 === 0 ? "bg-white/20 dark:bg-gray-800/20" : "bg-blue-500/5"
                              }`}
                            >
                              <td className="p-4 text-sm">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                >
                                  {item.bId}
                                </Button>
                              </td>
                              <td className="p-4 text-sm text-gray-900 dark:text-white">{item.invoiceDate}</td>
                              <td className="p-4 text-sm text-gray-900 dark:text-white">{item.returnDate}</td>
                              <td className="p-4 text-sm">
                                <Badge
                                  variant="outline"
                                  className={`rounded-full ${getTcBadgeColor(item.tc)} font-medium transition-transform duration-200 hover:scale-105`}
                                >
                                  {item.tc}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                >
                                  {item.supplier}
                                </Button>
                              </td>
                              <td className="p-4 text-sm text-gray-900 dark:text-white text-right">{item.cash.toFixed(2)}</td>
                              <td className="p-4 text-sm text-gray-900 dark:text-white text-right">{item.account.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination */}
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
    </DndProvider>
  )
}