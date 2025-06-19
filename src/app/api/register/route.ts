import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const { firstname, lastname, email, password, birthDate } = await request.json()

  if (!firstname || !lastname || !email || !password || !birthDate) {
    return NextResponse.json({ message: 'Tüm alanlar zorunludur.' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const existingUser = await prisma.user.findUnique({
  where: { email },
})

if (existingUser) {
  return NextResponse.json({ message: "Bu e-posta zaten kayıtlı." }, { status: 400 })
}

  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      birthDate: new Date(birthDate),
    },
  })

  return NextResponse.json({ message: 'Kayıt başarılı', user })
}
