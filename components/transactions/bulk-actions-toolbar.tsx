"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Download, Edit, X } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"

interface BulkActionsToolbarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onBulkDelete: () => void
  onBulkEdit: () => void
  onExport: () => void
}

export function BulkActionsToolbar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onBulkDelete,
  onBulkEdit,
  onExport,
}: BulkActionsToolbarProps) {
  if (selectedCount === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeOut" } }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex items-center justify-between p-3 bg-muted/50 border rounded-lg mb-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Badge variant="secondary" className="font-medium">
              {selectedCount} of {totalCount} selected
            </Badge>
          </motion.div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onSelectAll}>
              <Checkbox id="select-all" />
              <span className="ml-2 text-sm font-medium">Select All</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" onClick={onBulkEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Selected
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </motion.div>

          <Separator orientation="vertical" className="h-6" />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="destructive" size="sm" onClick={onBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="sm" onClick={onClearSelection} className="ml-2">
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
