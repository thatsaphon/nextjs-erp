import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const ars = await prisma.accountReceivable.findMany({
    where: { name: { contains: params.slug } },
  })
  console.log(request.nextUrl.searchParams)
  //   console.log(request)
  //   console.log(ars)
  return NextResponse.json(ars)
}
