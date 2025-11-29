import { NextResponse } from 'next/server'
import { db, licenses, users } from '@thin-air/db'
import { eq, desc } from 'drizzle-orm'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from root .env
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

export async function GET() {
    try {
        // TODO: Add auth check
        // Join with users to get email if possible, but for now just list licenses
        const allLicenses = await db.select().from(licenses).orderBy(desc(licenses.createdAt))
        return NextResponse.json(allLicenses)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch licenses' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        // TODO: Add auth check
        const body = await request.json()

        if (!body.key || !body.type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const newLicense = await db.insert(licenses).values({
            key: body.key,
            type: body.type,
            status: 'active',
            expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        }).returning()

        return NextResponse.json(newLicense[0])
    } catch (error) {
        console.error('License creation error:', error)
        return NextResponse.json({ error: 'Failed to create license' }, { status: 500 })
    }
}
