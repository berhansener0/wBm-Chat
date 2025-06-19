import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.user.delete({ where: { id } })
  return NextResponse.json({ message: 'Silindi' })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const { role } = await request.json()

  // Örnek: admin kendi rolünü değiştiremesin
  if (id === 1) {
    return NextResponse.json({ error: 'Kendi rolünü değiştiremezsin' }, { status: 403 })
  }

  await prisma.user.update({ where: { id }, data: { role } })
  return NextResponse.json({ message: 'Rol güncellendi' })
}
