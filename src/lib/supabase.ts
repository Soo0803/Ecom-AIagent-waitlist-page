import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// A simple validation to ensure we don't crash Supabase client on initialization during build
const isValidUrl = (url: string) => {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
};

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
    if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️ Supabase environment variables are missing or invalid. Deployment may fail to connect to DB.');
    }
}

// Fallback to a valid URL structure if missing to prevent build-time crashes, 
// but use actual values if they exist and are valid.
export const supabase = createClient(
    isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);
