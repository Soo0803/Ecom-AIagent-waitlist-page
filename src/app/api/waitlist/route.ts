import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.businessName || !body.email || !body.frustrations || body.frustrations.length === 0) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('waitlist_leads')
            .insert([
                {
                    name: body.name,
                    business_name: body.businessName,
                    email: body.email,
                    monthly_revenue: body.monthlyRevenue || null,
                    frustrations: body.frustrations,
                    other_frustration: body.otherFrustration || null,
                    automation_needs: body.automationNeeds || null,
                }
            ])
            .select();

        if (error) {
            console.error('Supabase Insert Error:', error);

            // Handle unique email constraint error
            if (error.code === '23505' || error.message.includes('unique constraint')) {
                return NextResponse.json(
                    { error: 'This email is already on the waitlist.' },
                    { status: 409 }
                );
            }

            return NextResponse.json({ error: 'Failed to join waitlist. Please try again later.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: data[0] }, { status: 201 });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
