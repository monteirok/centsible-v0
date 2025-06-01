"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Download } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

interface BulkActionsProps {
  transactions: Transaction[]
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  onBulkDelete: (ids: string[]) => void
  onBulkEdit: (ids: string[]) => void
}

export function BulkActions({
  transactions,
  selectedIds,
  onSelectionChange,
  onBulkDelete,
  onBulkEdit,
}: BulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const isAllSelected = selectedIds.length === transactions.length && transactions.length > 0
  const isPartiallySelected = selectedIds.length > 0 && selectedIds.length < transactions.length

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange([])
    } else {
      onSelectionChange(transactions.map((t) => t.id))
    }
  }

  const handleBulkDelete = () => {
    onBulkDelete(selectedIds)
    setShowDeleteDialog(false)
    onSelectionChange([])
  }

  const exportSelected = () => {
    const selectedTransactions = transactions.filter((t) => selectedIds.includes(t.id))
    const csvContent = [
      "Date,Description,Merchant,Category,Type,Amount,Notes",
      ...selectedTransactions.map((t) =>
        [t.date, t.description, t.merchant, t.category, t.type, t.amount, t.notes || ""].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (transactions.length === 0) return null

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={isAllSelected}
            ref={(el) => {
              if (el) el.indeterminate = isPartiallySelected
            }}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">
            {selectedIds.length > 0 ? `${selectedIds.length} selected` : "Select transactions"}
          </span>
          {selectedIds.length > 0 && <Badge variant="secondary">{selectedIds.length} items</Badge>}
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onBulkEdit(selectedIds)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Selected
            </Button>
            <Button variant="outline" size="sm" onClick={exportSelected}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Transactions</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedIds.length} transaction{selectedIds.length > 1 ? "s" : ""}? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
              Delete {selectedIds.length} Transaction{selectedIds.length > 1 ? "s" : ""}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
