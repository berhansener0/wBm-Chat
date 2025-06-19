import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { receiverId: string } }) {
  const receiverId = parseInt(params.receiverId)
  const senderId = 1 // geçici olarak oturum açan kullanıcı

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
orderBy: { createdAt: 'desc' } as any
  })

  return NextResponse.json(messages)
}
