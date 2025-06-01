"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { EditTransactionDialog } from "./edit-transaction-dialog"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { BulkActionsToolbar } from "./bulk-actions-toolbar"
import { BulkEditDialog } from "./bulk-edit-dialog"

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

const initialTransactions: Transaction[] = [
  {
    id: "1",
    description: "Starbucks Coffee",
    amount: -4.95,
    category: "Food & Dining",
    date: "2024-01-15",
    type: "expense",
    merchant: "Starbucks",
    notes: "Morning coffee",
  },
  {
    id: "2",
    description: "Salary Deposit",
    amount: 2600.0,
    category: "Income",
    date: "2024-01-15",
    type: "income",
    merchant: "Employer",
  },
  {
    id: "3",
    description: "Uber Ride",
    amount: -12.5,
    category: "Transportation",
    date: "2024-01-14",
    type: "expense",
    merchant: "Uber",
    notes: "Trip to downtown",
  },
  {
    id: "4",
    description: "Amazon Purchase",
    amount: -89.99,
    category: "Shopping",
    date: "2024-01-14",
    type: "expense",
    merchant: "Amazon",
    notes: "Office supplies",
  },
  {
    id: "5",
    description: "Gym Membership",
    amount: -29.99,
    category: "Health & Fitness",
    date: "2024-01-13",
    type: "expense",
    merchant: "Planet Fitness",
    notes: "Monthly membership",
  },
]

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(null)
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<string[]>([])
  const { toast } = useToast()
  const [showBulkEditDialog, setShowBulkEditDialog] = useState(false)

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
  }

  const handleSaveEdit = (updatedTransaction: Transaction) => {
    setTransactions((prev) => prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
    setEditingTransaction(null)
    toast({
      title: "Transaction Updated",
      description: "The transaction has been successfully updated.",
    })
  }

  const handleDelete = (transactionId: string) => {
    setDeletingTransactionId(transactionId)
  }

  const handleSelectAll = () => {
    if (selectedTransactionIds.length === transactions.length) {
      setSelectedTransactionIds([])
    } else {
      setSelectedTransactionIds(transactions.map((t) => t.id))
    }
  }

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactionIds((prev) =>
      prev.includes(transactionId) ? prev.filter((id) => id !== transactionId) : [...prev, transactionId],
    )
  }

  const handleBulkDelete = () => {
    setTransactions((prev) => prev.filter((t) => !selectedTransactionIds.includes(t.id)))
    setSelectedTransactionIds([])
    toast({
      title: "Transactions Deleted",
      description: `${selectedTransactionIds.length} transaction(s) have been deleted.`,
      variant: "destructive",
    })
  }

  const confirmDelete = () => {
    if (deletingTransactionId === "bulk") {
      handleBulkDelete()
    } else if (deletingTransactionId) {
      setTransactions((prev) => prev.filter((t) => t.id !== deletingTransactionId))
      toast({
        title: "Transaction Deleted",
        description: "The transaction has been successfully deleted.",
        variant: "destructive",
      })
    }
    setDeletingTransactionId(null)
  }

  const handleDuplicate = (transaction: Transaction) => {
    const duplicatedTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      description: `${transaction.description} (Copy)`,
    }
    setTransactions((prev) => [duplicatedTransaction, ...prev])
    toast({
      title: "Transaction Duplicated",
      description: "A copy of the transaction has been created.",
    })
  }

  const handleBulkEdit = () => {
    setShowBulkEditDialog(true)
  }

  const handleBulkEditSave = (updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        selectedTransactionIds.includes(transaction.id) ? { ...transaction, ...updates } : transaction,
      ),
    )
    setSelectedTransactionIds([])
    toast({
      title: "Transactions Updated",
      description: `${selectedTransactionIds.length} transaction(s) have been updated.`,
    })
  }

  const handleExportSelected = () => {
    const selectedTransactions = transactions.filter((t) => selectedTransactionIds.includes(t.id))
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

    toast({
      title: "Export Complete",
      description: `${selectedTransactions.length} transaction(s) exported to CSV.`,
    })
  }

  const handleClearSelection = () => {
    setSelectedTransactionIds([])
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Transactions</CardTitle>
            {selectedTransactionIds.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedTransactionIds.length} selected</Badge>
                <Button variant="destructive" size="sm" onClick={() => setDeletingTransactionId("bulk")}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <BulkActionsToolbar
            selectedCount={selectedTransactionIds.length}
            totalCount={transactions.length}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            onBulkDelete={() => setDeletingTransactionId("bulk")}
            onBulkEdit={handleBulkEdit}
            onExport={handleExportSelected}
          />

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                  selectedTransactionIds.includes(transaction.id) ? "bg-muted/30 border-primary" : ""
                }`}
              >
                <Checkbox
                  checked={selectedTransactionIds.includes(transaction.id)}
                  onCheckedChange={() => handleSelectTransaction(transaction.id)}
                />

                <div className="flex flex-col space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{transaction.description}</p>
                    {transaction.notes && (
                      <Badge variant="outline" className="text-xs">
                        Note
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  {transaction.notes && <p className="text-xs text-muted-foreground italic">{transaction.notes}</p>}
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{transaction.category}</Badge>
                  <span
                    className={`text-sm font-medium min-w-[80px] text-right ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(transaction)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Transaction Dialog */}
      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          open={!!editingTransaction}
          onOpenChange={(open) => !open && setEditingTransaction(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingTransactionId} onOpenChange={(open) => !open && setDeletingTransactionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              {deletingTransactionId === "bulk"
                ? `Are you sure you want to delete ${selectedTransactionIds.length} selected transaction(s)? This action cannot be undone.`
                : "Are you sure you want to delete this transaction? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              {deletingTransactionId === "bulk" ? `Delete ${selectedTransactionIds.length} Transaction(s)` : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Edit Dialog */}
      {showBulkEditDialog && (
        <BulkEditDialog
          transactions={transactions}
          selectedIds={selectedTransactionIds}
          open={showBulkEditDialog}
          onOpenChange={setShowBulkEditDialog}
          onSave={handleBulkEditSave}
        />
      )}
    </>
  )
}
