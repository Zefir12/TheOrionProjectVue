//export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

import { Json } from "@/lib/types/json";

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                    extensions?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
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
                    bought_date: string | null;
                    bought_item_id: number | null;
                    created_at: string;
                    expiration_date: string | null;
                    finished_date: string | null;
                    id: number;
                    item_seller: number | null;
                    price: number | null;
                };
                Insert: {
                    bought_date?: string | null;
                    bought_item_id?: number | null;
                    created_at?: string;
                    expiration_date?: string | null;
                    finished_date?: string | null;
                    id?: number;
                    item_seller?: number | null;
                    price?: number | null;
                };
                Update: {
                    bought_date?: string | null;
                    bought_item_id?: number | null;
                    created_at?: string;
                    expiration_date?: string | null;
                    finished_date?: string | null;
                    id?: number;
                    item_seller?: number | null;
                    price?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "bought_items_bought_item_id_fkey";
                        columns: ["bought_item_id"];
                        isOneToOne: false;
                        referencedRelation: "bought_items_types";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "bought_items_item_seller_fkey";
                        columns: ["item_seller"];
                        isOneToOne: false;
                        referencedRelation: "item_sellers";
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
                    tags: string | null;
                    user_id: string | null;
                };
                Insert: {
                    content_amount?: number | null;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    tags?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    content_amount?: number | null;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    tags?: string | null;
                    user_id?: string | null;
                };
                Relationships: [];
            };
            food: {
                Row: {
                    created_at: string | null;
                    food_amount: number;
                    food_id: number;
                    id: number;
                    intake_time_accuracy: number | null;
                    meal_id: string | null;
                    time_of_intake: string | null;
                    user_id: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    food_amount: number;
                    food_id: number;
                    id?: number;
                    intake_time_accuracy?: number | null;
                    meal_id?: string | null;
                    time_of_intake?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    food_amount?: number;
                    food_id?: number;
                    id?: number;
                    intake_time_accuracy?: number | null;
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
                    }
                ];
            };
            food_combos: {
                Row: {
                    content: Json;
                    created_at: string;
                    id: number;
                    name: string | null;
                    user_id: string | null;
                };
                Insert: {
                    content: Json;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    content?: Json;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    user_id?: string | null;
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
                    tags: Json | null;
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
                    tags?: Json | null;
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
                    tags?: Json | null;
                    user_id?: string | null;
                    water_percentage?: number;
                };
                Relationships: [];
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
            item_sellers: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string | null;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string | null;
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
    storage: {
        Tables: {
            buckets: {
                Row: {
                    allowed_mime_types: string[] | null;
                    avif_autodetection: boolean | null;
                    created_at: string | null;
                    file_size_limit: number | null;
                    id: string;
                    name: string;
                    owner: string | null;
                    owner_id: string | null;
                    public: boolean | null;
                    updated_at: string | null;
                };
                Insert: {
                    allowed_mime_types?: string[] | null;
                    avif_autodetection?: boolean | null;
                    created_at?: string | null;
                    file_size_limit?: number | null;
                    id: string;
                    name: string;
                    owner?: string | null;
                    owner_id?: string | null;
                    public?: boolean | null;
                    updated_at?: string | null;
                };
                Update: {
                    allowed_mime_types?: string[] | null;
                    avif_autodetection?: boolean | null;
                    created_at?: string | null;
                    file_size_limit?: number | null;
                    id?: string;
                    name?: string;
                    owner?: string | null;
                    owner_id?: string | null;
                    public?: boolean | null;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
            migrations: {
                Row: {
                    executed_at: string | null;
                    hash: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    executed_at?: string | null;
                    hash: string;
                    id: number;
                    name: string;
                };
                Update: {
                    executed_at?: string | null;
                    hash?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            objects: {
                Row: {
                    bucket_id: string | null;
                    created_at: string | null;
                    id: string;
                    last_accessed_at: string | null;
                    metadata: Json | null;
                    name: string | null;
                    owner: string | null;
                    owner_id: string | null;
                    path_tokens: string[] | null;
                    updated_at: string | null;
                    user_metadata: Json | null;
                    version: string | null;
                };
                Insert: {
                    bucket_id?: string | null;
                    created_at?: string | null;
                    id?: string;
                    last_accessed_at?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                    owner?: string | null;
                    owner_id?: string | null;
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    user_metadata?: Json | null;
                    version?: string | null;
                };
                Update: {
                    bucket_id?: string | null;
                    created_at?: string | null;
                    id?: string;
                    last_accessed_at?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                    owner?: string | null;
                    owner_id?: string | null;
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    user_metadata?: Json | null;
                    version?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "objects_bucketId_fkey";
                        columns: ["bucket_id"];
                        isOneToOne: false;
                        referencedRelation: "buckets";
                        referencedColumns: ["id"];
                    }
                ];
            };
            s3_multipart_uploads: {
                Row: {
                    bucket_id: string;
                    created_at: string;
                    id: string;
                    in_progress_size: number;
                    key: string;
                    owner_id: string | null;
                    upload_signature: string;
                    user_metadata: Json | null;
                    version: string;
                };
                Insert: {
                    bucket_id: string;
                    created_at?: string;
                    id: string;
                    in_progress_size?: number;
                    key: string;
                    owner_id?: string | null;
                    upload_signature: string;
                    user_metadata?: Json | null;
                    version: string;
                };
                Update: {
                    bucket_id?: string;
                    created_at?: string;
                    id?: string;
                    in_progress_size?: number;
                    key?: string;
                    owner_id?: string | null;
                    upload_signature?: string;
                    user_metadata?: Json | null;
                    version?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "s3_multipart_uploads_bucket_id_fkey";
                        columns: ["bucket_id"];
                        isOneToOne: false;
                        referencedRelation: "buckets";
                        referencedColumns: ["id"];
                    }
                ];
            };
            s3_multipart_uploads_parts: {
                Row: {
                    bucket_id: string;
                    created_at: string;
                    etag: string;
                    id: string;
                    key: string;
                    owner_id: string | null;
                    part_number: number;
                    size: number;
                    upload_id: string;
                    version: string;
                };
                Insert: {
                    bucket_id: string;
                    created_at?: string;
                    etag: string;
                    id?: string;
                    key: string;
                    owner_id?: string | null;
                    part_number: number;
                    size?: number;
                    upload_id: string;
                    version: string;
                };
                Update: {
                    bucket_id?: string;
                    created_at?: string;
                    etag?: string;
                    id?: string;
                    key?: string;
                    owner_id?: string | null;
                    part_number?: number;
                    size?: number;
                    upload_id?: string;
                    version?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey";
                        columns: ["bucket_id"];
                        isOneToOne: false;
                        referencedRelation: "buckets";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey";
                        columns: ["upload_id"];
                        isOneToOne: false;
                        referencedRelation: "s3_multipart_uploads";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            can_insert_object: {
                Args: {
                    bucketid: string;
                    name: string;
                    owner: string;
                    metadata: Json;
                };
                Returns: undefined;
            };
            extension: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            filename: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            foldername: {
                Args: {
                    name: string;
                };
                Returns: string[];
            };
            get_size_by_bucket: {
                Args: Record<PropertyKey, never>;
                Returns: {
                    size: number;
                    bucket_id: string;
                }[];
            };
            list_multipart_uploads_with_delimiter: {
                Args: {
                    bucket_id: string;
                    prefix_param: string;
                    delimiter_param: string;
                    max_keys?: number;
                    next_key_token?: string;
                    next_upload_token?: string;
                };
                Returns: {
                    key: string;
                    id: string;
                    created_at: string;
                }[];
            };
            list_objects_with_delimiter: {
                Args: {
                    bucket_id: string;
                    prefix_param: string;
                    delimiter_param: string;
                    max_keys?: number;
                    start_after?: string;
                    next_token?: string;
                };
                Returns: {
                    name: string;
                    id: string;
                    metadata: Json;
                    updated_at: string;
                }[];
            };
            operation: {
                Args: Record<PropertyKey, never>;
                Returns: string;
            };
            search: {
                Args: {
                    prefix: string;
                    bucketname: string;
                    limits?: number;
                    levels?: number;
                    offsets?: number;
                    search?: string;
                    sortcolumn?: string;
                    sortorder?: string;
                };
                Returns: {
                    name: string;
                    id: string;
                    updated_at: string;
                    created_at: string;
                    last_accessed_at: string;
                    metadata: Json;
                }[];
            };
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

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
      ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;
