import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const ar = await prisma.accountReceivable.findFirst({
    where: { taxId: { contains: params.slug } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(ar);
}
