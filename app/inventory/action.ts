"use server";

import { prisma } from "@/lib/prisma";

export async function getInventories() {
  const inventory = await prisma.inventory.findMany({
    include: {
      prices: {},
    },
  });
  return inventory;
}
