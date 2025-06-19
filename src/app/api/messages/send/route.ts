// app/api/messages/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ message: "Eksik veri var." }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });

    return NextResponse.json({ message: "Mesaj gönderildi.", data: message });
  } catch (err) {
    console.error("Mesaj gönderim hatası:", err);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
