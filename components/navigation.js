"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Settings, ShoppingCart, TrendingUp, Package, Users, Truck, FileText, Menu, X } from "lucide-react"

const navigationItems = [
  { name: "HOME", href: "/", icon: Home },
  { name: "SETUP", href: "/setup", icon: Settings },
  { name: "BUYING", href: "/buying", icon: ShoppingCart },
  { name: "SELLING", href: "/selling", icon: TrendingUp },
  { name: "STOCK", href: "/stock", icon: Package },
  { name: "CUSTOMER LEDGER", href: "/customer-ledger", icon: Users },
  { name: "SUPPLIER LEDGER", href: "/supplier-ledger", icon: Truck },
  { name: "DAILY REPORT FORM", href: "/reports", icon: FileText },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/20 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">KI FASHION</h1>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/20 text-white hover:bg-white/30 border border-white/30 rounded-lg transition-all duration-200"
          >
            Logout
          </Button>
        </div>

        <nav className="hidden md:block bg-blue-500/90 px-6 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 max-w-7xl mx-auto">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-white text-blue-500 hover:bg-white/90"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <Card className="md:hidden absolute top-16 left-0 right-0 z-50 mx-4 mt-2 bg-white/50 border border-gray-200/30 backdrop-blur-sm rounded-xl shadow-lg animate-slide-in">
          <nav className="space-y-2 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "text-gray-900 dark:text-white hover:bg-blue-500/10"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </Card>
      )}
    </>
  )
}
