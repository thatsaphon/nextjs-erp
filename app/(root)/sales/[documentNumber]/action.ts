"use server";

import { prisma } from "@/lib/prisma";
import {
  AccountReceivable,
  Inventory,
  Price,
  TransactionItem,
} from "@prisma/client";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editSales(
  formData: FormData,
  transactionItem: Partial<
    TransactionItem & { inventory?: Inventory & { prices?: Price[] } }
  >[],
  ar: AccountReceivable,
  documentNumber: string
) {
  const dateFormData = formData.get("date");
  const date = new Date(dateFormData as string);
  const sales: Partial<TransactionItem>[] = transactionItem.map((item) => ({
    ...item,
    inventory: undefined,
    transactionId: undefined,
    accountReceivable: undefined,
    type: "Inventory",
    unitQuantity: +(item.unitQuantity as number),
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
  await prisma.transaction.update({
    where: { documentNumber },
    data: {
      date: date,
      transactionItems: {
        deleteMany: {},
        createMany: { data: sales },
      },
    },
  });

  revalidatePath(`/sales/${documentNumber}`);
  revalidatePath(`/sales`);
  redirect(`/sales`);
}
