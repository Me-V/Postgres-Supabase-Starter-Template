// app/api/submit-form/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type FormData = {
  name?: string;
  email?: string;
};

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json();

    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: { name, email },
    });

    return NextResponse.json({ message: "Saved", submission });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON or server error" },
      { status: 500 }
    );
  }
}
