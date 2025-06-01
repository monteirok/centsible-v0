export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          currency: string
          timezone: string
          notifications_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          currency?: string
          timezone?: string
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          currency?: string
          timezone?: string
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          type: "income" | "expense"
          color: string
          budget_limit: number | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: "income" | "expense"
          color?: string
          budget_limit?: number | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: "income" | "expense"
          color?: string
          budget_limit?: number | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          category_id: string | null
          description: string
          amount: number
          transaction_date: string
          transaction_type: "income" | "expense" | "transfer"
          merchant: string | null
          notes: string | null
          receipt_url: string | null
          is_recurring: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id?: string | null
          description: string
          amount: number
          transaction_date: string
          transaction_type: "income" | "expense" | "transfer"
          merchant?: string | null
          notes?: string | null
          receipt_url?: string | null
          is_recurring?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string | null
          description?: string
          amount?: number
          transaction_date?: string
          transaction_type?: "income" | "expense" | "transfer"
          merchant?: string | null
          notes?: string | null
          receipt_url?: string | null
          is_recurring?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          target_amount: number
          current_amount: number
          target_date: string
          monthly_contribution: number
          status: "active" | "completed" | "paused" | "cancelled"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          target_amount: number
          current_amount?: number
          target_date: string
          monthly_contribution?: number
          status?: "active" | "completed" | "paused" | "cancelled"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          target_amount?: number
          current_amount?: number
          target_date?: string
          monthly_contribution?: number
          status?: "active" | "completed" | "paused" | "cancelled"
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          content: string
          sender: "user" | "ai"
          context: any | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          sender: "user" | "ai"
          context?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          sender?: "user" | "ai"
          context?: any | null
          created_at?: string
        }
      }
    }
  }
}
