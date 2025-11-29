import { NextResponse } from 'next/server'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from root .env
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

export async function GET() {
    try {
        // Test 1: Check if DATABASE_URL is loaded
        const dbUrl = process.env.DATABASE_URL

        if (!dbUrl) {
            return NextResponse.json({
                error: 'DATABASE_URL not found',
                cwd: process.cwd(),
                envPath: path.resolve(process.cwd(), '../../.env')
            }, { status: 500 })
        }

        // Test 2: Try to import the db package
        try {
            const { db } = await import('@thin-air/db')

            // Test 3: Try a simple query
            const result = await db.execute('SELECT 1 as test')

            return NextResponse.json({
                success: true,
                hasDbUrl: true,
                dbConnected: true,
                testQuery: result
            })
        } catch (dbError: any) {
            return NextResponse.json({
                error: 'Database connection failed',
                message: dbError.message,
                stack: dbError.stack
            }, { status: 500 })
        }
    } catch (error: any) {
        return NextResponse.json({
            error: 'Test failed',
            message: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
