import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const id = parseInt(params.userId)
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 })

  return NextResponse.json(user)
}
