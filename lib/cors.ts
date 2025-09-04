import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-production-domain.com',
]

export function withCORS(response: NextResponse, request: NextRequest): NextResponse {
  const origin = request.headers.get('origin') || ''
  const isAllowed = allowedOrigins.includes(origin)

  response.headers.set('Access-Control-Allow-Origin', isAllowed ? origin : '')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  return response
}

export function corsOptionsResponse(): NextResponse {
  const response = new NextResponse(null, { status: 204 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}
