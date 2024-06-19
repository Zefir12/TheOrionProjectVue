export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
        Tables: {
            bloodpressure: {
                Row: {
                    created_at: string;
                    diastolic: number | null;
                    id: number;
                    systolic: number | null;
                };
                Insert: {
                    created_at?: string;
                    diastolic?: number | null;
                    id?: number;
                    systolic?: number | null;
                };
                Update: {
                    created_at?: string;
                    diastolic?: number | null;
                    id?: number;
                    systolic?: number | null;
                };
                Relationships: [];
            };
            bloodwork: {
                Row: {
                    BAS: number | null;
                    "BAS%": number | null;
                    created_at: string;
                    date: string | null;
                    EOS: number | null;
                    "EOS%": number | null;
                    glucose: number | null;
                    Hb: number | null;
                    Ht: number | null;
                    id: number;
                    "IG#": number | null;
                    "IG%": number | null;
                    LYMPH: number | null;
                    "LYMPH%": number | null;
                    MCH: number | null;
                    MCHC: number | null;
                    MCV: number | null;
                    MONO: number | null;
                    "MONO%": number | null;
                    MPV: number | null;
                    "NRBC#": number | null;
                    "NRBC%": number | null;
                    OB: number | null;
                    PLT: number | null;
                    RBC: number | null;
                    RDW: number | null;
                    "RDW-SD": number | null;
                    SEG: number | null;
                    "SEG%": number | null;
                    WBC: number | null;
                };
                Insert: {
                    BAS?: number | null;
                    "BAS%"?: number | null;
                    created_at?: string;
                    date?: string | null;
                    EOS?: number | null;
                    "EOS%"?: number | null;
                    glucose?: number | null;
                    Hb?: number | null;
                    Ht?: number | null;
                    id?: number;
                    "IG#"?: number | null;
                    "IG%"?: number | null;
                    LYMPH?: number | null;
                    "LYMPH%"?: number | null;
                    MCH?: number | null;
                    MCHC?: number | null;
                    MCV?: number | null;
                    MONO?: number | null;
                    "MONO%"?: number | null;
                    MPV?: number | null;
                    "NRBC#"?: number | null;
                    "NRBC%"?: number | null;
                    OB?: number | null;
                    PLT?: number | null;
                    RBC?: number | null;
                    RDW?: number | null;
                    "RDW-SD"?: number | null;
                    SEG?: number | null;
                    "SEG%"?: number | null;
                    WBC?: number | null;
                };
                Update: {
                    BAS?: number | null;
                    "BAS%"?: number | null;
                    created_at?: string;
                    date?: string | null;
                    EOS?: number | null;
                    "EOS%"?: number | null;
                    glucose?: number | null;
                    Hb?: number | null;
                    Ht?: number | null;
                    id?: number;
                    "IG#"?: number | null;
                    "IG%"?: number | null;
                    LYMPH?: number | null;
                    "LYMPH%"?: number | null;
                    MCH?: number | null;
                    MCHC?: number | null;
                    MCV?: number | null;
                    MONO?: number | null;
                    "MONO%"?: number | null;
                    MPV?: number | null;
                    "NRBC#"?: number | null;
                    "NRBC%"?: number | null;
                    OB?: number | null;
                    PLT?: number | null;
                    RBC?: number | null;
                    RDW?: number | null;
                    "RDW-SD"?: number | null;
                    SEG?: number | null;
                    "SEG%"?: number | null;
                    WBC?: number | null;
                };
                Relationships: [];
            };
            bought_items: {
                Row: {
                    bought_item_id: number | null;
                    created_at: string;
                    expiration_date: string | null;
                    finished_date: string | null;
                    id: number;
                };
                Insert: {
                    bought_item_id?: number | null;
                    created_at?: string;
                    expiration_date?: string | null;
                    finished_date?: string | null;
                    id?: number;
                };
                Update: {
                    bought_item_id?: number | null;
                    created_at?: string;
                    expiration_date?: string | null;
                    finished_date?: string | null;
                    id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "bought_items_bought_item_id_fkey";
                        columns: ["bought_item_id"];
                        isOneToOne: false;
                        referencedRelation: "bought_items_types";
                        referencedColumns: ["id"];
                    }
                ];
            };
            bought_items_types: {
                Row: {
                    content_amount: number | null;
                    created_at: string;
                    id: number;
                    name: string | null;
                    price: number | null;
                    seller_id: number | null;
                    tags: string | null;
                };
                Insert: {
                    content_amount?: number | null;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    price?: number | null;
                    seller_id?: number | null;
                    tags?: string | null;
                };
                Update: {
                    content_amount?: number | null;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    price?: number | null;
                    seller_id?: number | null;
                    tags?: string | null;
                };
                Relationships: [];
            };
            food: {
                Row: {
                    created_at: string | null;
                    food_amount: number;
                    food_id: number;
                    id: number;
                    meal_id: string | null;
                    time_of_intake: string | null;
                    user_id: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    food_amount: number;
                    food_id: number;
                    id?: number;
                    meal_id?: string | null;
                    time_of_intake?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    food_amount?: number;
                    food_id?: number;
                    id?: number;
                    meal_id?: string | null;
                    time_of_intake?: string | null;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "food_food_id_fkey";
                        columns: ["food_id"];
                        isOneToOne: false;
                        referencedRelation: "food_types";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_food_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            food_combos: {
                Row: {
                    content: Json;
                    created_at: string;
                    id: number;
                    name: string | null;
                };
                Insert: {
                    content: Json;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                };
                Update: {
                    content?: Json;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                };
                Relationships: [];
            };
            food_types: {
                Row: {
                    carbs: number;
                    created_at: string | null;
                    fat: number;
                    fat_saturated: number;
                    fibre: number;
                    id: number;
                    kcal: number;
                    name: string | null;
                    nova_score: number | null;
                    nutri_score: number | null;
                    portion_weigth: number;
                    protein: number;
                    prototype: boolean;
                    salt: number;
                    servings: string | null;
                    sugar: number;
                    user_id: string | null;
                    water_percentage: number;
                };
                Insert: {
                    carbs?: number;
                    created_at?: string | null;
                    fat?: number;
                    fat_saturated?: number;
                    fibre?: number;
                    id?: number;
                    kcal?: number;
                    name?: string | null;
                    nova_score?: number | null;
                    nutri_score?: number | null;
                    portion_weigth?: number;
                    protein?: number;
                    prototype?: boolean;
                    salt?: number;
                    servings?: string | null;
                    sugar?: number;
                    user_id?: string | null;
                    water_percentage?: number;
                };
                Update: {
                    carbs?: number;
                    created_at?: string | null;
                    fat?: number;
                    fat_saturated?: number;
                    fibre?: number;
                    id?: number;
                    kcal?: number;
                    name?: string | null;
                    nova_score?: number | null;
                    nutri_score?: number | null;
                    portion_weigth?: number;
                    protein?: number;
                    prototype?: boolean;
                    salt?: number;
                    servings?: string | null;
                    sugar?: number;
                    user_id?: string | null;
                    water_percentage?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_food_types_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            h: {
                Row: {
                    amount: string | null;
                    created_at: string | null;
                    date: string | null;
                    duration: string | null;
                    id: number;
                    satisfacion: number | null;
                };
                Insert: {
                    amount?: string | null;
                    created_at?: string | null;
                    date?: string | null;
                    duration?: string | null;
                    id?: number;
                    satisfacion?: number | null;
                };
                Update: {
                    amount?: string | null;
                    created_at?: string | null;
                    date?: string | null;
                    duration?: string | null;
                    id?: number;
                    satisfacion?: number | null;
                };
                Relationships: [];
            };
            health: {
                Row: {
                    action_name: string | null;
                    created_at: string | null;
                    description: string | null;
                    id: number;
                    time_of_action: string | null;
                };
                Insert: {
                    action_name?: string | null;
                    created_at?: string | null;
                    description?: string | null;
                    id?: number;
                    time_of_action?: string | null;
                };
                Update: {
                    action_name?: string | null;
                    created_at?: string | null;
                    description?: string | null;
                    id?: number;
                    time_of_action?: string | null;
                };
                Relationships: [];
            };
            health_problems: {
                Row: {
                    created_at: string | null;
                    description: string | null;
                    id: number;
                };
                Insert: {
                    created_at?: string | null;
                    description?: string | null;
                    id?: number;
                };
                Update: {
                    created_at?: string | null;
                    description?: string | null;
                    id?: number;
                };
                Relationships: [];
            };
            hygiene: {
                Row: {
                    action_name: string | null;
                    created_at: string | null;
                    id: number;
                    time_of_action: string | null;
                };
                Insert: {
                    action_name?: string | null;
                    created_at?: string | null;
                    id?: number;
                    time_of_action?: string | null;
                };
                Update: {
                    action_name?: string | null;
                    created_at?: string | null;
                    id?: number;
                    time_of_action?: string | null;
                };
                Relationships: [];
            };
            medicine: {
                Row: {
                    created_at: string;
                    description: string | null;
                    id: number;
                    type: string | null;
                };
                Insert: {
                    created_at?: string;
                    description?: string | null;
                    id?: number;
                    type?: string | null;
                };
                Update: {
                    created_at?: string;
                    description?: string | null;
                    id?: number;
                    type?: string | null;
                };
                Relationships: [];
            };
            mental: {
                Row: {
                    created_at: string | null;
                    happines: number | null;
                    id: number;
                    stress: number | null;
                    tiredness: number | null;
                };
                Insert: {
                    created_at?: string | null;
                    happines?: number | null;
                    id?: number;
                    stress?: number | null;
                    tiredness?: number | null;
                };
                Update: {
                    created_at?: string | null;
                    happines?: number | null;
                    id?: number;
                    stress?: number | null;
                    tiredness?: number | null;
                };
                Relationships: [];
            };
            pisswork: {
                Row: {
                    "amorphic crystals": number | null;
                    bacteria: string | null;
                    bilirubina: number | null;
                    Color: string | null;
                    created_at: string;
                    date: string;
                    erytrocytes: number | null;
                    glucose: number | null;
                    id: number;
                    "keton bodies": number | null;
                    leukocytes: number | null;
                    nitrates: number | null;
                    pH: number | null;
                    protein: number | null;
                    "slime lines": string | null;
                    transparency: string | null;
                    urobilinogen: string | null;
                    weight: number | null;
                };
                Insert: {
                    "amorphic crystals"?: number | null;
                    bacteria?: string | null;
                    bilirubina?: number | null;
                    Color?: string | null;
                    created_at?: string;
                    date?: string;
                    erytrocytes?: number | null;
                    glucose?: number | null;
                    id?: number;
                    "keton bodies"?: number | null;
                    leukocytes?: number | null;
                    nitrates?: number | null;
                    pH?: number | null;
                    protein?: number | null;
                    "slime lines"?: string | null;
                    transparency?: string | null;
                    urobilinogen?: string | null;
                    weight?: number | null;
                };
                Update: {
                    "amorphic crystals"?: number | null;
                    bacteria?: string | null;
                    bilirubina?: number | null;
                    Color?: string | null;
                    created_at?: string;
                    date?: string;
                    erytrocytes?: number | null;
                    glucose?: number | null;
                    id?: number;
                    "keton bodies"?: number | null;
                    leukocytes?: number | null;
                    nitrates?: number | null;
                    pH?: number | null;
                    protein?: number | null;
                    "slime lines"?: string | null;
                    transparency?: string | null;
                    urobilinogen?: string | null;
                    weight?: number | null;
                };
                Relationships: [];
            };
            sleep: {
                Row: {
                    alarm_used: boolean;
                    CreatedAt: string | null;
                    Id: number;
                    SleepLength: string | null;
                    SleepStartTime: string | null;
                    WakeUpTime: string;
                };
                Insert: {
                    alarm_used?: boolean;
                    CreatedAt?: string | null;
                    Id?: number;
                    SleepLength?: string | null;
                    SleepStartTime?: string | null;
                    WakeUpTime: string;
                };
                Update: {
                    alarm_used?: boolean;
                    CreatedAt?: string | null;
                    Id?: number;
                    SleepLength?: string | null;
                    SleepStartTime?: string | null;
                    WakeUpTime?: string;
                };
                Relationships: [];
            };
            supplements: {
                Row: {
                    amount: number;
                    created_at: string;
                    id: number;
                    supplement: number | null;
                    time_of_intake: string | null;
                };
                Insert: {
                    amount: number;
                    created_at?: string;
                    id?: number;
                    supplement?: number | null;
                    time_of_intake?: string | null;
                };
                Update: {
                    amount?: number;
                    created_at?: string;
                    id?: number;
                    supplement?: number | null;
                    time_of_intake?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "supplements_supplement_fkey";
                        columns: ["supplement"];
                        isOneToOne: false;
                        referencedRelation: "supplements_types";
                        referencedColumns: ["id"];
                    }
                ];
            };
            supplements_types: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string | null;
                    portion_weight: number;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    portion_weight?: number;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    portion_weight?: number;
                };
                Relationships: [];
            };
            weight: {
                Row: {
                    created_at: string | null;
                    id: number;
                    user_id: string | null;
                    weight: number | null;
                };
                Insert: {
                    created_at?: string | null;
                    id?: number;
                    user_id?: string | null;
                    weight?: number | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: number;
                    user_id?: string | null;
                    weight?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_weight_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
      ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"] : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
      ? PublicSchema["Enums"][PublicEnumNameOrOptions]
      : never;
