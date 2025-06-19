import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { content, senderId, receiverId } = body

  const message = await prisma.message.create({
    data: {
      content,
      senderId,
      receiverId,
    },
  })

  return NextResponse.json(message)
}
