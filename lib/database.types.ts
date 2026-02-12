export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          color: string
          icon: string
          id: string
          label: string
          type: string
        }
        Insert: {
          color: string
          icon: string
          id: string
          label: string
          type: string
        }
        Update: {
          color?: string
          icon?: string
          id?: string
          label?: string
          type?: string
        }
        Relationships: []
      }
      chat_channels: {
        Row: {
          description: string | null
          id: string
          member_count: number
          name: string
        }
        Insert: {
          description?: string | null
          id: string
          member_count?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          member_count?: number
          name?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          author_avatar: string | null
          author_id: string | null
          author_name: string
          channel_id: string
          content: string
          created_at: string
          id: string
        }
        Insert: {
          author_avatar?: string | null
          author_id?: string | null
          author_name: string
          channel_id: string
          content: string
          created_at?: string
          id: string
        }
        Update: {
          author_avatar?: string | null
          author_id?: string | null
          author_name?: string
          channel_id?: string
          content?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "chat_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          active_nomads: number
          air_quality: number | null
          cafe_count: number
          created_at: string
          current_temp: number | null
          description: string | null
          dislike_count: number
          feels_like: number | null
          gallery_urls: string[] | null
          hero_image_url: string | null
          id: string
          internet_speed: number
          like_count: number
          monthly_cost: number
          name: string
          name_en: string
          overall_score: number
          rank: number
          region: string
          review_count: number
          slug: string
          thumbnail_url: string | null
          transit_score: number
          updated_at: string
          weather_icon: string | null
        }
        Insert: {
          active_nomads?: number
          air_quality?: number | null
          cafe_count?: number
          created_at?: string
          current_temp?: number | null
          description?: string | null
          dislike_count?: number
          feels_like?: number | null
          gallery_urls?: string[] | null
          hero_image_url?: string | null
          id: string
          internet_speed?: number
          like_count?: number
          monthly_cost: number
          name: string
          name_en: string
          overall_score: number
          rank: number
          region: string
          review_count?: number
          slug: string
          thumbnail_url?: string | null
          transit_score?: number
          updated_at?: string
          weather_icon?: string | null
        }
        Update: {
          active_nomads?: number
          air_quality?: number | null
          cafe_count?: number
          created_at?: string
          current_temp?: number | null
          description?: string | null
          dislike_count?: number
          feels_like?: number | null
          gallery_urls?: string[] | null
          hero_image_url?: string | null
          id?: string
          internet_speed?: number
          like_count?: number
          monthly_cost?: number
          name?: string
          name_en?: string
          overall_score?: number
          rank?: number
          region?: string
          review_count?: number
          slug?: string
          thumbnail_url?: string | null
          transit_score?: number
          updated_at?: string
          weather_icon?: string | null
        }
        Relationships: []
      }
      city_badges: {
        Row: {
          badge_id: string
          city_id: string
          display_order: number
        }
        Insert: {
          badge_id: string
          city_id: string
          display_order?: number
        }
        Update: {
          badge_id?: string
          city_id?: string
          display_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "city_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_badges_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      city_details: {
        Row: {
          best_seasons: string[] | null
          city_id: string
          cons: string[] | null
          long_description: string | null
          pros: string[] | null
          recommended_stay: string | null
        }
        Insert: {
          best_seasons?: string[] | null
          city_id: string
          cons?: string[] | null
          long_description?: string | null
          pros?: string[] | null
          recommended_stay?: string | null
        }
        Update: {
          best_seasons?: string[] | null
          city_id?: string
          cons?: string[] | null
          long_description?: string | null
          pros?: string[] | null
          recommended_stay?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "city_details_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: true
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      city_likes: {
        Row: {
          city_id: string
          created_at: string | null
          id: string
          type: string
          user_id: string
        }
        Insert: {
          city_id: string
          created_at?: string | null
          id?: string
          type: string
          user_id: string
        }
        Update: {
          city_id?: string
          created_at?: string | null
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_likes_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_comments: {
        Row: {
          author_avatar: string | null
          author_id: string | null
          author_name: string
          content: string
          created_at: string
          id: string
          like_count: number
          post_id: string
        }
        Insert: {
          author_avatar?: string | null
          author_id?: string | null
          author_name: string
          content: string
          created_at?: string
          id: string
          like_count?: number
          post_id: string
        }
        Update: {
          author_avatar?: string | null
          author_id?: string | null
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          like_count?: number
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          author_avatar: string | null
          author_id: string | null
          author_name: string
          category: string
          comment_count: number
          content: string
          created_at: string
          id: string
          is_pinned: boolean | null
          like_count: number
          title: string
          view_count: number
        }
        Insert: {
          author_avatar?: string | null
          author_id?: string | null
          author_name: string
          category: string
          comment_count?: number
          content: string
          created_at?: string
          id: string
          is_pinned?: boolean | null
          like_count?: number
          title: string
          view_count?: number
        }
        Update: {
          author_avatar?: string | null
          author_id?: string | null
          author_name?: string
          category?: string
          comment_count?: number
          content?: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          like_count?: number
          title?: string
          view_count?: number
        }
        Relationships: []
      }
      guides: {
        Row: {
          category: string
          content: string | null
          created_at: string
          id: string
          read_time: number | null
          slug: string
          summary: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          id: string
          read_time?: number | null
          slug: string
          summary?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          id?: string
          read_time?: number | null
          slug?: string
          summary?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      meetup_attendees: {
        Row: {
          avatar: string | null
          id: string
          joined_at: string
          meetup_id: string
          name: string
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          id: string
          joined_at?: string
          meetup_id: string
          name: string
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          id?: string
          joined_at?: string
          meetup_id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meetup_attendees_meetup_id_fkey"
            columns: ["meetup_id"]
            isOneToOne: false
            referencedRelation: "meetups"
            referencedColumns: ["id"]
          },
        ]
      }
      meetups: {
        Row: {
          agenda: string[] | null
          category: string
          city_id: string | null
          city_name: string
          created_at: string
          date: string
          description: string | null
          host_avatar: string | null
          host_name: string | null
          id: string
          image_url: string | null
          location_address: string | null
          location_name: string | null
          long_description: string | null
          max_attendees: number | null
          requirements: string[] | null
          rsvp_count: number
          tags: string[] | null
          title: string
        }
        Insert: {
          agenda?: string[] | null
          category: string
          city_id?: string | null
          city_name: string
          created_at?: string
          date: string
          description?: string | null
          host_avatar?: string | null
          host_name?: string | null
          id: string
          image_url?: string | null
          location_address?: string | null
          location_name?: string | null
          long_description?: string | null
          max_attendees?: number | null
          requirements?: string[] | null
          rsvp_count?: number
          tags?: string[] | null
          title: string
        }
        Update: {
          agenda?: string[] | null
          category?: string
          city_id?: string | null
          city_name?: string
          created_at?: string
          date?: string
          description?: string | null
          host_avatar?: string | null
          host_name?: string | null
          id?: string
          image_url?: string | null
          location_address?: string | null
          location_name?: string | null
          long_description?: string | null
          max_attendees?: number | null
          requirements?: string[] | null
          rsvp_count?: number
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetups_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string | null
          current_location: string | null
          email: string | null
          id: string
          joined_at: string
          nickname: string | null
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          current_location?: string | null
          email?: string | null
          id: string
          joined_at?: string
          nickname?: string | null
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          current_location?: string | null
          email?: string | null
          id?: string
          joined_at?: string
          nickname?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          city_id: string
          content: string
          created_at: string
          helpful: number
          id: string
          rating: number
          stay_duration: string | null
          user_avatar: string | null
          user_id: string | null
          user_name: string
          visit_date: string | null
        }
        Insert: {
          city_id: string
          content: string
          created_at?: string
          helpful?: number
          id: string
          rating: number
          stay_duration?: string | null
          user_avatar?: string | null
          user_id?: string | null
          user_name: string
          visit_date?: string | null
        }
        Update: {
          city_id?: string
          content?: string
          created_at?: string
          helpful?: number
          id?: string
          rating?: number
          stay_duration?: string | null
          user_avatar?: string | null
          user_id?: string | null
          user_name?: string
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      visited_cities: {
        Row: {
          city_id: string
          city_name: string
          city_slug: string
          duration: string | null
          id: string
          user_id: string
          visited_at: string
        }
        Insert: {
          city_id: string
          city_name: string
          city_slug: string
          duration?: string | null
          id?: string
          user_id: string
          visited_at?: string
        }
        Update: {
          city_id?: string
          city_name?: string
          city_slug?: string
          duration?: string | null
          id?: string
          user_id?: string
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "visited_cities_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          address: string | null
          city_id: string
          has_outlet: boolean | null
          id: string
          name: string
          open_hours: string | null
          price_range: string | null
          rating: number | null
          type: string
          wifi_speed: number | null
        }
        Insert: {
          address?: string | null
          city_id: string
          has_outlet?: boolean | null
          id: string
          name: string
          open_hours?: string | null
          price_range?: string | null
          rating?: number | null
          type: string
          wifi_speed?: number | null
        }
        Update: {
          address?: string | null
          city_id?: string
          has_outlet?: boolean | null
          id?: string
          name?: string
          open_hours?: string | null
          price_range?: string | null
          rating?: number | null
          type?: string
          wifi_speed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workspaces_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_stats: {
        Row: {
          meetups_attended: number | null
          reviews_count: number | null
          user_id: string | null
          visited_cities_count: number | null
        }
        Insert: {
          meetups_attended?: never
          reviews_count?: never
          user_id?: string | null
          visited_cities_count?: never
        }
        Update: {
          meetups_attended?: never
          reviews_count?: never
          user_id?: string | null
          visited_cities_count?: never
        }
        Relationships: []
      }
    }
    Functions: {
      toggle_city_like: {
        Args: { p_city_id: string; p_type: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
