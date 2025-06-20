// src/app/api/logout/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Token eksik" }, { status: 400 });
  }

  // Token'ı null yap veya kaldır
  await prisma.user.updateMany({
    where: {
      sessiontoken: token,
    },
    data: {
      sessiontoken: null,
    },
  });

  return NextResponse.json({ message: "Çıkış başarılı" });
}
