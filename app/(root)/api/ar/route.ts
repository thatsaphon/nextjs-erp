import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const ars = await prisma.accountReceivable.findMany({
    orderBy: { name: "asc" },
  })
  return NextResponse.json(ars)
}
