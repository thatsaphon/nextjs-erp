"use server";

import { prisma } from "@/lib/prisma";
import {
  AccountPayable,
  AccountReceivable,
  Inventory,
  Price,
  TransactionItem,
} from "@prisma/client";

import dayjs from "dayjs";
import { redirect } from "next/navigation";

export async function createPurchase(
  formData: FormData,
  transactionItem: Partial<
    TransactionItem & { inventory?: Inventory & { prices?: Price[] } }
  >[],
  ap: AccountPayable
) {
  const lastInv = await prisma.transaction.findFirst({
    where: { documentNumber: { contains: `RI${dayjs().format("YYYYMMDD")}` } },
    orderBy: { documentNumber: "desc" },
    select: { documentNumber: true },
  });
  let lastNumber = `000`;
  if (lastInv?.documentNumber) {
    lastNumber = lastInv.documentNumber.slice(-3);
  }
  const newDocNumber = `${+lastNumber + 1}`.padStart(3, "0");

  const sales: Partial<TransactionItem>[] = transactionItem.map((item) => ({
    ...item,
    inventory: undefined,
    type: "Inventory",
    quantity:
      item.inventoryUnitQuantity && item.unitQuantity
        ? item.inventoryUnitQuantity * item.unitQuantity
        : item.unitQuantity,
    inventoryId: item.inventory?.id,
    creditAmount: item.creditAmount || 0,
    debitAmount: item.debitAmount || 0,
  }));

  sales.push({
    type: "AP",
    accountPayableId: ap.id,
    creditAmount: sales.reduce(
      (acc, sale) => acc + (sale.debitAmount ? sale.debitAmount : 0),
      0
    ),
    debitAmount: 0,
  });

  await prisma.transaction.create({
    data: {
      date: new Date(),
      remark: "",
      type: "GoodsPurchase",
      documentNumber: `RI${dayjs().format("YYYYMMDD")}${newDocNumber}`,
      transactionItems: { createMany: { data: sales } },
    },
  });
  redirect(`/purchase`);
}
