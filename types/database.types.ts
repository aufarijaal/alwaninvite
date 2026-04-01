export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      audios: {
        Row: {
          id: number;
          title: string;
          artist: string | null;
          is_premium: boolean;
          created_at: string;
          is_active: boolean;
          source_type: string;
          url: string;
        };
        Insert: {
          id?: never;
          title: string;
          artist?: string | null;
          is_premium: boolean;
          created_at?: string;
          is_active: boolean;
          source_type?: string;
          url: string;
        };
        Update: {
          id?: never;
          title?: string;
          artist?: string | null;
          is_premium?: boolean;
          created_at?: string;
          is_active?: boolean;
          source_type?: string;
          url?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          plan: string;
          plan_expires_at: string | null;
          email: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          plan?: string;
          plan_expires_at?: string | null;
          email: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          plan?: string;
          plan_expires_at?: string | null;
          email?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string | null;
          plan: string;
          status: string;
          payment_provider: string;
          payment_reference: string;
          amount: number | null;
          currency: string | null;
          started_at: string | null;
          ended_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          plan?: string;
          status: string;
          payment_provider: string;
          payment_reference: string;
          amount?: number | null;
          currency?: string | null;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          plan?: string;
          status?: string;
          payment_provider?: string;
          payment_reference?: string;
          amount?: number | null;
          currency?: string | null;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      themes: {
        Row: {
          id: number;
          name: string;
          is_premium: boolean;
          slug: string;
          created_at: string;
          is_active: boolean;
          preview_image_url: string | null;
        };
        Insert: {
          id?: never;
          name: string;
          is_premium?: boolean;
          slug: string;
          created_at?: string;
          is_active?: boolean;
          preview_image_url?: string | null;
        };
        Update: {
          id?: never;
          name?: string;
          is_premium?: boolean;
          slug?: string;
          created_at?: string;
          is_active?: boolean;
          preview_image_url?: string | null;
        };
        Relationships: [];
      };
      weddings: {
        Row: {
          id: number;
          created_at: string;
          user_id: string | null;
          slug: string;
          title: string | null;
          language: string;
          theme_id: number | null;
          published: boolean;
          bride_callname: string;
          bride_fullname: string;
          bride_info_1: string | null;
          bride_info_2: string | null;
          bride_info_3: string | null;
          groom_callname: string;
          groom_fullname: string;
          groom_info_1: string | null;
          groom_info_2: string | null;
          groom_info_3: string | null;
          events: Json;
          gifts: Json;
          livestream_platform: string | null;
          livestream_url: string | null;
          livestream_event_date: string | null;
          livestream_start_time: string | null;
          livestream_is_active: boolean;
          audio_id: number | null;
          autoplay: boolean;
          loop: boolean;
          is_active: boolean;
          wa_message_template: string | null;
          user_config: Json | null;
        };
        Insert: {
          id?: never;
          created_at?: string;
          user_id?: string | null;
          slug: string;
          title?: string | null;
          language?: string;
          theme_id?: number | null;
          published?: boolean;
          bride_callname: string;
          bride_fullname: string;
          bride_info_1?: string | null;
          bride_info_2?: string | null;
          bride_info_3?: string | null;
          groom_callname: string;
          groom_fullname: string;
          groom_info_1?: string | null;
          groom_info_2?: string | null;
          groom_info_3?: string | null;
          events?: Json;
          gifts?: Json;
          livestream_platform?: string | null;
          livestream_url?: string | null;
          livestream_event_date?: string | null;
          livestream_start_time?: string | null;
          livestream_is_active?: boolean;
          audio_id?: number | null;
          autoplay?: boolean;
          loop?: boolean;
          is_active?: boolean;
          wa_message_template?: string | null;
          user_config?: Json | null;
        };
        Update: {
          id?: never;
          created_at?: string;
          user_id?: string | null;
          slug?: string;
          title?: string | null;
          language?: string;
          theme_id?: number | null;
          published?: boolean;
          bride_callname?: string;
          bride_fullname?: string;
          bride_info_1?: string | null;
          bride_info_2?: string | null;
          bride_info_3?: string | null;
          groom_callname?: string;
          groom_fullname?: string;
          groom_info_1?: string | null;
          groom_info_2?: string | null;
          groom_info_3?: string | null;
          events?: Json;
          gifts?: Json;
          livestream_platform?: string | null;
          livestream_url?: string | null;
          livestream_event_date?: string | null;
          livestream_start_time?: string | null;
          livestream_is_active?: boolean;
          audio_id?: number | null;
          autoplay?: boolean;
          loop?: boolean;
          is_active?: boolean;
          wa_message_template?: string | null;
          user_config?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "weddings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "weddings_theme_id_fkey";
            columns: ["theme_id"];
            isOneToOne: false;
            referencedRelation: "themes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "weddings_audio_id_fkey";
            columns: ["audio_id"];
            isOneToOne: false;
            referencedRelation: "audios";
            referencedColumns: ["id"];
          },
        ];
      };
      user_images: {
        Row: {
          id: number;
          url: string;
          user_id: string;
          metadata: {
            original_name: string;
            size: number;
            type: string;
            width: number | null;
            height: number | null;
          } | null;
          created_at: string | null;
        };
        Insert: {
          id?: never;
          url: string;
          user_id: string;
          metadata?: {
            original_name: string;
            size: number;
            type: string;
            width: number | null;
            height: number | null;
          } | null;
          created_at?: string | null;
        };
        Update: {
          id?: never;
          url?: string;
          user_id?: string;
          metadata?: {
            original_name: string;
            size: number;
            type: string;
            width: number | null;
            height: number | null;
          } | null;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_images_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      wishes: {
        Row: {
          id: number;
          attendance: string | null;
          wedding_id: string;
          created_at: string;
          guest_name: string;
          guest_count: number;
          message: string | null;
        };
        Insert: {
          id?: never;
          attendance?: string | null;
          wedding_id?: string;
          created_at?: string;
          guest_name: string;
          guest_count?: number;
          message?: string | null;
        };
        Update: {
          id?: never;
          attendance?: string | null;
          wedding_id?: string;
          created_at?: string;
          guest_name?: string;
          guest_count?: number;
          message?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Helper types for easier usage
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Inserts<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type Updates<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Specific table type aliases for convenience
export type Audio = Tables<"audios">;
export type Profile = Tables<"profiles">;
export type Subscription = Tables<"subscriptions">;
export type Theme = Tables<"themes">;
export type Wedding = Tables<"weddings">;
export type Wish = Tables<"wishes">;
export type UserImage = Tables<"user_images">;
