"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Download, Edit, X, CheckSquare } from "lucide-react"

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
    <div className="flex items-center justify-between p-3 bg-muted/50 border rounded-lg mb-4">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="font-medium">
          {selectedCount} of {totalCount} selected
        </Badge>

        <div className="flex items-center gap-1">
          {selectedCount < totalCount && (
            <Button variant="ghost" size="sm" onClick={onSelectAll}>
              <CheckSquare className="h-4 w-4 mr-2" />
              Select All
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onBulkEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Selected
        </Button>

        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="destructive" size="sm" onClick={onBulkDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Selected
        </Button>
      </div>
    </div>
  )
}
