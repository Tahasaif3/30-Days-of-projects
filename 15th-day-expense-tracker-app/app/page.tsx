'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface Expense {
  id: string
  category: string
  amount: number
  date: string
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', category: 'Groceries', amount: 250, date: '15/05/2024' },
    { id: '2', category: 'Rent', amount: 250, date: '01/06/2024' },
    { id: '3', category: 'Utilities', amount: 250, date: '05/06/2024' },
    { id: '4', category: 'Dining Out', amount: 250, date: '10/06/2024' },
  ])
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' })
  const [isOpen, setIsOpen] = useState(false)

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        date: new Date().toLocaleDateString('en-GB'),
      }
      setExpenses([...expenses, expense])
      setNewExpense({ category: '', amount: '' })
      setIsOpen(false)
    }
  }

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl font-bold">Expense<br />Tracker</h1>
          <div className="text-right">
            <div className="text-gray-400 text-sm">Total:</div>
            <div className="text-2xl font-bold">${totalExpense.toFixed(2)}</div>
          </div>
        </div>

        <AnimatePresence>
          {expenses.map((expense) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4"
            >
              <Card className="bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{expense.category}</h2>
                    <div className="text-gray-400">
                      ${expense.amount.toFixed(2)} - {expense.date}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleDelete(expense.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1A1F2E] text-white border-gray-800">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Category"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="bg-transparent border-gray-700 text-white"
              />
              <Input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="bg-transparent border-gray-700 text-white"
              />
              <Button
                onClick={handleAddExpense}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Add Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

