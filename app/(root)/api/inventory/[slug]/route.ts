import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const inventories = await prisma.inventory.findFirst({
    include: {
      prices: {},
    },
    where: {
      code: { contains: params.slug },
    },
  });
  return NextResponse.json({ inventories });
}
