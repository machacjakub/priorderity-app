import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {createClient} from "@supabase/supabase-js";

export const dynamic = 'force-dynamic'

export async function GET() {
    // Create a Supabase client configured to use cookies
    const supabase = createRouteHandlerClient({ cookies })
    
    // This assumes you have a `todos` table in Supabase. Check out
    // the `Create Table and seed with data` section of the README 👇
    // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
    const { data: done } = await supabase.from('done-activities').select()

    return NextResponse.json(done)
}