import { NextResponse } from "next/server";
import prisma from "@/script/prismaclient";
import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions as NextAuthOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  return NextResponse.json(user?.profile ?? null);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, age, address, profileImageUrl } = body;

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: { name: name ?? undefined },
    create: { email: session.user.email, name: name ?? "", password: "" },
  });

  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: { age, address, profileImageUrl },
    create: { userId: user.id, age, address, profileImageUrl },
  });

  return NextResponse.json(profile);
}