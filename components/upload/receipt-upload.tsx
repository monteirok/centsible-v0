"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Camera, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ReceiptUpload() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle")
  const [extractedData, setExtractedData] = useState<any>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadStatus("uploading")

    // Simulate file upload and OCR processing
    setTimeout(() => {
      setUploadStatus("processing")
      setTimeout(() => {
        setExtractedData({
          merchant: "Starbucks Coffee",
          amount: 4.95,
          date: "2024-01-15",
          category: "Food & Dining",
          items: [{ name: "Grande Latte", price: 4.95 }],
        })
        setUploadStatus("success")
      }, 2000)
    }, 1000)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Receipt or Bank Statement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-muted p-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">Upload your receipt</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your receipt image or PDF, or click to browse
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="relative">
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                  <Input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </Button>
                <Button className="relative">
                  <FileText className="mr-2 h-4 w-4" />
                  Choose File
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Supports JPEG, PNG, and PDF files up to 10MB</p>
            </div>
          </div>

          {uploadStatus !== "idle" && (
            <Alert>
              <div className="flex items-center gap-2">
                {uploadStatus === "uploading" && <Upload className="h-4 w-4 animate-pulse" />}
                {uploadStatus === "processing" && <FileText className="h-4 w-4 animate-pulse" />}
                {uploadStatus === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                {uploadStatus === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                <AlertDescription>
                  {uploadStatus === "uploading" && "Uploading file..."}
                  {uploadStatus === "processing" && "Processing with AI OCR..."}
                  {uploadStatus === "success" && "Receipt processed successfully!"}
                  {uploadStatus === "error" && "Error processing receipt. Please try again."}
                </AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      {extractedData && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Transaction Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="merchant">Merchant</Label>
                <Input id="merchant" value={extractedData.merchant} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" value={extractedData.amount} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" value={extractedData.date} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={extractedData.category} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add any additional notes..." />
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">Save Transaction</Button>
              <Button variant="outline">Edit Details</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
