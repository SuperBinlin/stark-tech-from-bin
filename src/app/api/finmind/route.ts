import { NextRequest, NextResponse } from 'next/server'

const FINMIND_TOKEN = process.env.FINMIND_API_TOKEN
const AUTH_HEADER = FINMIND_TOKEN ? `Bearer ${FINMIND_TOKEN}` : undefined

export async function POST(request: NextRequest) {
  try {
    const { url: targetUrl, method = 'GET' } = await request.json()

    const fetchOptions: RequestInit = { method }
    if (AUTH_HEADER) {
      fetchOptions.headers = { Authorization: AUTH_HEADER }
    }

    const finmindResponse = await fetch(targetUrl, fetchOptions)
    if (!finmindResponse.ok) {
      throw new Error(`FinMind API Error with status ${finmindResponse.status}`)
    }

    const payload = await finmindResponse.json()
    return NextResponse.json(payload)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[FinMind proxy] Error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
