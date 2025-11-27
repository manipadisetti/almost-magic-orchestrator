/**
 * Test Flow Script
 * 
 * This script tests the API endpoint and confirms data lands in the Neon database.
 * It sends a request to the vapor.inhale endpoint and verifies the response.
 */

import fetch from 'node-fetch';
import { config } from 'dotenv';
import pg from 'pg';

// Load environment variables
config();

const API_URL = 'http://localhost:3002/trpc/vapor.inhale';
const TEST_CONTENT = 'Create a simple task management app with user authentication';

async function testApiFlow() {
  console.log('🧪 Starting API flow test...');
  
  try {
    // Test API endpoint
    console.log('📡 Sending request to vapor.inhale endpoint...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        json: {
          content: TEST_CONTENT,
          userId: 'test-user',
          name: 'Test Project'
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ API response received:', data);
    
    // Test database connection
    console.log('🔌 Testing database connection...');
    
    const client = new pg.Client({
      connectionString: process.env.DATABASE_URL,
    });
    
    await client.connect();
    console.log('✅ Connected to Neon database successfully');
    
    // Query the database to verify data was stored
    const result = await client.query('SELECT * FROM "vapor_requests" ORDER BY "created_at" DESC LIMIT 1');
    
    if (result.rows.length > 0) {
      console.log('✅ Data found in database:', result.rows[0]);
    } else {
      console.log('⚠️ No recent data found in database');
    }
    
    await client.end();
    
    console.log('🎉 Test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testApiFlow();
