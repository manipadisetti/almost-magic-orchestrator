import { NextResponse } from 'next/server'
import { db, coupons } from '@thin-air/db'
import { eq, desc } from 'drizzle-orm'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from root .env
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

export async function GET() {
    try {
        // TODO: Add auth check
        const allCoupons = await db.select().from(coupons).orderBy(desc(coupons.createdAt))
        return NextResponse.json(allCoupons)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        // TODO: Add auth check
        const body = await request.json()

        // Basic validation
        if (!body.code || !body.type || !body.value) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const newCoupon = await db.insert(coupons).values({
            code: body.code.toUpperCase(),
            type: body.type,
            value: Number(body.value),
            maxUses: body.maxUses ? Number(body.maxUses) : null,
            expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        }).returning()

        return NextResponse.json(newCoupon[0])
    } catch (error) {
        console.error('Coupon creation error:', error)
        return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 })
    }
}
