import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ message: 'Geçersiz e-posta veya şifre.' }, { status: 401 })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return NextResponse.json({ message: 'Geçersiz e-posta veya şifre.' }, { status: 401 })
  }

  // Buraya oturum yönetimi eklenebilir (şimdilik yazmıyoruz)
  return NextResponse.json({ message: 'Giriş başarılı', user })
}
