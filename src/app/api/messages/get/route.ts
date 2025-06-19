// app/api/messages/get/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { user1Id, user2Id } = await req.json();

  if (!user1Id || !user2Id) {
    return NextResponse.json({ message: "Kullanıcı bilgileri eksik." }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json({ messages });
}
