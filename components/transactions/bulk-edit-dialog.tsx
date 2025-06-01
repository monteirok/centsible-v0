"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Save } from "lucide-react"

interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  type: "income" | "expense"
  merchant: string
  notes?: string
}

interface BulkEditDialogProps {
  transactions: Transaction[]
  selectedIds: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updates: Partial<Transaction>) => void
}

const categories = [
  { value: "Food & Dining", label: "Food & Dining", type: "expense" },
  { value: "Transportation", label: "Transportation", type: "expense" },
  { value: "Shopping", label: "Shopping", type: "expense" },
  { value: "Health & Fitness", label: "Health & Fitness", type: "expense" },
  { value: "Entertainment", label: "Entertainment", type: "expense" },
  { value: "Utilities", label: "Utilities", type: "expense" },
  { value: "Housing", label: "Housing", type: "expense" },
  { value: "Insurance", label: "Insurance", type: "expense" },
  { value: "Education", label: "Education", type: "expense" },
  { value: "Income", label: "Salary", type: "income" },
  { value: "Freelance", label: "Freelance", type: "income" },
  { value: "Investment", label: "Investment", type: "income" },
]

export function BulkEditDialog({ transactions, selectedIds, open, onOpenChange, onSave }: BulkEditDialogProps) {
  const [updates, setUpdates] = useState<{
    category?: string
    type?: "income" | "expense"
    updateCategory: boolean
    updateType: boolean
  }>({
    updateCategory: false,
    updateType: false,
  })

  const selectedTransactions = transactions.filter((t) => selectedIds.includes(t.id))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const finalUpdates: Partial<Transaction> = {}

    if (updates.updateCategory && updates.category) {
      finalUpdates.category = updates.category
    }

    if (updates.updateType && updates.type) {
      finalUpdates.type = updates.type
    }

    onSave(finalUpdates)
    onOpenChange(false)

    // Reset form
    setUpdates({
      updateCategory: false,
      updateType: false,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bulk Edit Transactions</DialogTitle>
          <DialogDescription>
            Edit {selectedIds.length} selected transaction{selectedIds.length > 1 ? "s" : ""}. Only checked fields will
            be updated.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Selected Transactions:</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {selectedTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="text-xs text-muted-foreground">
                  {transaction.description} - ${Math.abs(transaction.amount).toFixed(2)}
                </div>
              ))}
              {selectedTransactions.length > 5 && (
                <div className="text-xs text-muted-foreground">... and {selectedTransactions.length - 5} more</div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="update-category"
                  checked={updates.updateCategory}
                  onCheckedChange={(checked) => setUpdates((prev) => ({ ...prev, updateCategory: !!checked }))}
                />
                <div className="flex-1">
                  <Label htmlFor="update-category">Update Category</Label>
                  <Select
                    value={updates.category || ""}
                    onValueChange={(value) => setUpdates((prev) => ({ ...prev, category: value }))}
                    disabled={!updates.updateCategory}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select new category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {category.type}
                            </Badge>
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="update-type"
                  checked={updates.updateType}
                  onCheckedChange={(checked) => setUpdates((prev) => ({ ...prev, updateType: !!checked }))}
                />
                <div className="flex-1">
                  <Label htmlFor="update-type">Update Type</Label>
                  <Select
                    value={updates.type || ""}
                    onValueChange={(value) => setUpdates((prev) => ({ ...prev, type: value as "income" | "expense" }))}
                    disabled={!updates.updateType}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select new type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!updates.updateCategory && !updates.updateType}>
                <Save className="mr-2 h-4 w-4" />
                Update {selectedIds.length} Transaction{selectedIds.length > 1 ? "s" : ""}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
