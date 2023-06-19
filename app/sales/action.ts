"use server";

import { prisma } from "@/lib/prisma";

export async function searchInventories(search: string, page?: number) {
  const inventories = await prisma.inventory.findMany({
    where: {
      OR: [{ code: { contains: search } }, { name: { contains: search } }],
    },
    include: { prices: {} },
    take: 10,
    skip: page,
  });

  return inventories;
}
