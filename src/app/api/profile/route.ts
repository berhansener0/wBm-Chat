import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  // Basit bir test için sadece ilk kullanıcıyı döndürüyoruz
  const user = await prisma.user.findFirst()

  if (!user) {
    return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 })
  }

  return NextResponse.json(user)
}

