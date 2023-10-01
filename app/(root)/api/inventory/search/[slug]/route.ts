import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const filterInventory = await prisma.inventory.findMany({
    where: {
      name: { contains: params.slug },
    },
  });
  const filterBarcode = await prisma.price.findMany({
    where: { barcode: { contains: params.slug } },
  });

  const ids = [
    ...filterInventory.map((item) => item.id),
    ...filterBarcode.map((item) => item.inventoryId),
  ];
  const inventories = await prisma.inventory.findMany({
    include: { prices: {} },
    where: { id: { in: ids } },
  });

  return NextResponse.json(inventories);
}
