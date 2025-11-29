import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const dbUrl = process.env.DATABASE_URL
        return NextResponse.json({
            hasDbUrl: !!dbUrl,
            dbUrlPreview: dbUrl ? `${dbUrl.substring(0, 30)}...` : null
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
