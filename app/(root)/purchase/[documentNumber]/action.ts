"use server";

import { prisma } from "@/lib/prisma";
import {
  AccountPayable,
  Inventory,
  Price,
  TransactionItem,
} from "@prisma/client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editPurchase(
  formData: FormData,
  transactionItem: Partial<
    TransactionItem & { inventory?: Inventory & { prices?: Price[] } }
  >[],
  ap: AccountPayable,
  documentNumber: string
) {
  const dateFormData = formData.get("date");
  const date = new Date(dateFormData as string);
  const sales: Partial<TransactionItem>[] = transactionItem.map((item) => ({
    ...item,
    inventory: undefined,
    transactionId: undefined,
    accountPayable: undefined,
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
    type: "AP",
    accountPayableId: ap.id,
    creditAmount: sales.reduce(
      (acc, sale) => acc + (sale.debitAmount ? sale.debitAmount : 0),
      0
    ),
    debitAmount: 0,
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

  revalidatePath(`/purchase/${documentNumber}`);
  revalidatePath(`/purchase`);
  redirect(`/purchase`);
}
