export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          account_type: 'residential' | 'commercial'
          full_name: string
          business_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          account_type?: 'residential' | 'commercial'
          full_name: string
          business_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_type?: 'residential' | 'commercial'
          full_name?: string
          business_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          street_address: string
          city: string
          state: string
          zip_code: string
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          street_address: string
          city: string
          state: string
          zip_code: string
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          street_address?: string
          city?: string
          state?: string
          zip_code?: string
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      marketing_preferences: {
        Row: {
          id: string
          user_id: string
          newsletter_subscribed: boolean
          how_heard: 'search' | 'social' | 'referral' | 'other'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          newsletter_subscribed?: boolean
          how_heard?: 'search' | 'social' | 'referral' | 'other'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          newsletter_subscribed?: boolean
          how_heard?: 'search' | 'social' | 'referral' | 'other'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: 'residential' | 'commercial'
    }
  }
}