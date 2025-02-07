export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["admin_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["admin_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
          user_id?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          client_name: string
          created_at: string | null
          end_date: string | null
          id: string
          seat_occupied: number
          start_date: string
          status: boolean | null
        }
        Insert: {
          client_name: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          seat_occupied: number
          start_date: string
          status?: boolean | null
        }
        Update: {
          client_name?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          seat_occupied?: number
          start_date?: string
          status?: boolean | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string | null
          department_id: number
          department_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_id?: number
          department_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: number
          department_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      employeedetails: {
        Row: {
          address: string | null
          contact_number: string | null
          created_at: string | null
          department_id: number | null
          designation: string | null
          employee_id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          contact_number?: string | null
          created_at?: string | null
          department_id?: number | null
          designation?: string | null
          employee_id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          contact_number?: string | null
          created_at?: string | null
          department_id?: number | null
          designation?: string | null
          employee_id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employeedetails_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["department_id"]
          },
        ]
      }
      organization_activities: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string
          id: string
          organization_id: string
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description: string
          id?: string
          organization_id: string
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string
          id?: string
          organization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_organization"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_activities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_audit_logs: {
        Row: {
          changed_by: string
          created_at: string | null
          id: string
          new_status: string
          old_status: string | null
          organization_id: string
          reason: string | null
        }
        Insert: {
          changed_by: string
          created_at?: string | null
          id?: string
          new_status: string
          old_status?: string | null
          organization_id: string
          reason?: string | null
        }
        Update: {
          changed_by?: string
          created_at?: string | null
          id?: string
          new_status?: string
          old_status?: string | null
          organization_id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_metrics: {
        Row: {
          active_properties: number | null
          id: string
          last_updated: string | null
          organization_id: string
          total_properties: number | null
          total_users: number | null
        }
        Insert: {
          active_properties?: number | null
          id?: string
          last_updated?: string | null
          organization_id: string
          total_properties?: number | null
          total_users?: number | null
        }
        Update: {
          active_properties?: number | null
          id?: string
          last_updated?: string | null
          organization_id?: string
          total_properties?: number | null
          total_users?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_organization"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_metrics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_users: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          last_status_change: string | null
          name: string
          phone: string | null
          status: Database["public"]["Enums"]["organization_status"]
          status_changed_by: string | null
          status_reason: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_status_change?: string | null
          name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["organization_status"]
          status_changed_by?: string | null
          status_reason?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_status_change?: string | null
          name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["organization_status"]
          status_changed_by?: string | null
          status_reason?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          is_global_admin: boolean | null
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          is_global_admin?: boolean | null
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_global_admin?: boolean | null
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ProjectName: {
        Row: {
          created_at: string
          id: number
          Location: string | null
          Name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          Location?: string | null
          Name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          Location?: string | null
          Name?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address_line: string
          country: string
          created_at: string
          district: string
          id: string
          number_of_units: number
          pincode: string
          property_name: string
          property_type: string
          state: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address_line: string
          country: string
          created_at?: string
          district: string
          id?: string
          number_of_units: number
          pincode: string
          property_name: string
          property_type: string
          state: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address_line?: string
          country?: string
          created_at?: string
          district?: string
          id?: string
          number_of_units?: number
          pincode?: string
          property_name?: string
          property_type?: string
          state?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      SpaceDetail: {
        Row: {
          created_at: string
          id: number
          name: string
          no_of_seats: number | null
          price: number | null
          status: boolean | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          no_of_seats?: number | null
          price?: number | null
          status?: boolean | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          no_of_seats?: number | null
          price?: number | null
          status?: boolean | null
        }
        Relationships: []
      }
      SpaceName: {
        Row: {
          created_at: string
          id: number
          project_id: number | null
          space_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          project_id?: number | null
          space_name: string
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: number | null
          space_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "SpaceName_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ProjectName"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SpaceName_space_name_fkey"
            columns: ["space_name"]
            isOneToOne: true
            referencedRelation: "SpaceName"
            referencedColumns: ["space_name"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_organization: {
        Args: {
          org_id: string
          checking_user_id: string
        }
        Returns: boolean
      }
      is_global_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      is_org_super_admin: {
        Args: {
          user_id: string
          org_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      admin_role: "admin" | "manager"
      organization_status: "active" | "inactive" | "restricted"
      user_role:
        | "global_super_admin"
        | "org_super_admin"
        | "org_admin"
        | "org_manager"
        | "org_user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
