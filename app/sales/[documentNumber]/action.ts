"use server";

import { prisma } from "@/lib/prisma";
import {
  AccountReceivable,
  Inventory,
  Price,
  TransactionItem,
} from "@prisma/client";

import dayjs from "dayjs";
import { redirect } from "next/dist/client/components/navigation";

export async function editSales(
  formData: FormData,
  transactionItem: Partial<
    TransactionItem & { inventory?: Inventory & { prices?: Price[] } }
  >[],
  ar: AccountReceivable
) {
  const lastInv = await prisma.transaction.findFirst({
    where: { documentNumber: { contains: `SO${dayjs().format("YYYYMMDD")}` } },
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
    type: "AR",
    accountReceivableId: ar.id,
    debitAmount: sales.reduce(
      (acc, sale) => acc + (sale.creditAmount ? sale.creditAmount : 0),
      0
    ),
    creditAmount: 0,
  });

  await prisma.transaction.create({
    data: {
      date: new Date(),
      remark: "",
      type: "CreditSales",
      documentNumber: `SO${dayjs().format("YYYYMMDD")}${newDocNumber}`,
      transactionItems: { createMany: { data: sales } },
    },
  });

  redirect(`/sales`);
}
