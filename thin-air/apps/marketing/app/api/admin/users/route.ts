import { NextResponse } from 'next/server'
import { db, users } from '@thin-air/db'
import { eq, desc } from 'drizzle-orm'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from root .env
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

export async function GET() {
    try {
        // TODO: Add auth check
        const allUsers = await db.select().from(users).orderBy(desc(users.createdAt))
        return NextResponse.json(allUsers)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        // TODO: Add auth check
        const body = await request.json()

        if (!body.email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        console.log('Creating user:', body)
        const newUser = await db.insert(users).values({
            name: body.name,
            email: body.email,
            role: 'user',
            unlimitedAccess: body.unlimitedAccess || false,
        }).returning()
        console.log('User created:', newUser[0])

        return NextResponse.json(newUser[0])
    } catch (error) {
        console.error('User creation error:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        // TODO: Add auth check
        const body = await request.json()

        if (!body.id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        const updatedUser = await db.update(users)
            .set({ unlimitedAccess: body.unlimitedAccess })
            .where(eq(users.id, body.id))
            .returning()

        return NextResponse.json(updatedUser[0])
    } catch (error) {
        console.error('User update error:', error)
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
}
