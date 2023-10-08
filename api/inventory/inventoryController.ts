"use server";
import { prisma } from "@/lib/prisma";

export const searchInventory = async (search: string) => {
  const inventories = await prisma.inventory.findMany({
    include: {
      prices: {},
    },
    where: {
      OR: [
        {
          code: { contains: search },
        },
        {
          name: { contains: search },
        },
      ],
    },
  });
  return inventories;
};

export const searchInventoryByCode = async (code: string) => {
  const filterBarcode = await prisma.price.findFirst({
    where: { barcode: code },
  });

  if (!filterBarcode) return null;
  const inventory = await prisma.inventory.findFirst({
    include: { prices: {} },
    where: { id: filterBarcode.inventoryId },
  });
  return inventory;
};
