"use server";

import { prisma } from "@/lib/prisma";
import {
  TransactionCreateInputSchema,
  TransactionItemCreateManyTransactionInputSchema,
  TransactionItemCreateNestedManyWithoutTransactionInputSchema,
  TransactionUpdateInputSchema,
} from "@/prisma/generated/zod";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import {TransactionItemCreateManyTransactionInput} from '@/prisma/generated/zod'
import { z } from "zod";

export const createSales = async (formData: FormData) => {
  const arId = formData.get("ar-code");
  const date = formData.get("date");
  const inventoryId = formData.getAll("inventoryId");
  const inventoryBarcodes = formData.getAll("code");
  const unit = formData.getAll("unit");
  const inventoryUnitQuantity = formData.getAll("inventoryUnitQuantity");
  const unitQuantities = formData.getAll("quantity");
  const prices = formData.getAll("price");
  const salesItems = createSalesItem({
    arId,
    inventoryId,
    inventoryBarcodes,
    unit,
    inventoryUnitQuantity,
    unitQuantities,
    prices,
  });
  const transaction: TransactionCreateInput = {
    date: new Date(date),
    documentNumber: await generateSalesInvoice("SO", date),
    type: "CreditSales",
    remark: "",
    transactionItems: { createMany: { data: salesItems } },
  };
  await prisma.transaction.create({ data: transaction });
  revalidatePath("/sales");
  redirect("/sales");
};

type TransactionCreateInput = z.infer<typeof TransactionCreateInputSchema>;
type TransactionItemCreateMany = z.infer<
  typeof TransactionItemCreateManyTransactionInputSchema
>;
const createSalesItem = ({
  arId,
  inventoryId,
  inventoryBarcodes,
  inventoryUnitQuantity,
  unitQuantities,
  unit,
  prices,
}: {
  arId: string;
  inventoryId: string[];
  inventoryUnitQuantity: string[];
  inventoryBarcodes: string[];
  unitQuantities: string[];
  unit: string[];
  prices: string[];
}) => {
  const inventoryItems: TransactionItemCreateMany[] = [];
  for (let i = 0; i < inventoryBarcodes.length; i++) {
    const inventoryItem: TransactionItemCreateMany = {
      type: "Inventory",
      debitAmount: 0,
      creditAmount: +unitQuantities[i] * +prices[i],
      inventoryId: +inventoryId[i],
      inventoryBarcode: inventoryBarcodes[i],
      inventoryUnit: unit[i],
      inventoryPricePerUnit: +prices[i],
      inventoryUnitQuantity: +inventoryUnitQuantity[i],
      unitQuantity: +unitQuantities[i],
      quantity: +inventoryUnitQuantity[i] + +unitQuantities[i],
    };
    inventoryItems.push(inventoryItem);
  }
  const arItem: TransactionItemCreateMany = {
    type: "AR",
    debitAmount: inventoryItems.reduce(
      (acc, sale) => acc + sale.creditAmount,
      0
    ),
    creditAmount: 0,
    accountReceivableId: +arId,
  };
  return [...inventoryItems, arItem];
};

const generateSalesInvoice = async (prefix: string, date: string) => {
  const todayFormat = `${prefix}${dayjs(date).format("YYYYMMDD")}`;
  const lastInvoice = await prisma.transaction.findFirst({
    where: { documentNumber: { contains: todayFormat } },
    orderBy: { documentNumber: "desc" },
  });
  if (!lastInvoice || !lastInvoice?.documentNumber.includes(todayFormat)) {
    return `${todayFormat}001`;
  }
  return (
    todayFormat +
    (+lastInvoice.documentNumber.slice(-3) + 1).toString().padStart(3, "0")
  );
};

export const updateSales = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  console.log(id);
  if (!id) return;
  const documentNumber = formData.get("documentNumber");
  const arId = formData.get("ar-code");
  const date = formData.get("date");
  const inventoryId = formData.getAll("inventoryId");
  const inventoryBarcodes = formData.getAll("code");
  const unit = formData.getAll("unit");
  const inventoryUnitQuantity = formData.getAll("inventoryUnitQuantity");
  const unitQuantities = formData.getAll("quantity");
  const prices = formData.getAll("price");

  const salesItems = createSalesItem({
    arId,
    inventoryId,
    inventoryBarcodes,
    unit,
    inventoryUnitQuantity,
    unitQuantities,
    prices,
  });
  await prisma.transaction.update({
    where: { id: id },
    data: {
      documentNumber: documentNumber,
      date: new Date(date),
      transactionItems: {
        deleteMany: {},
        createMany: { data: salesItems },
      },
    },
  });
  revalidatePath("/sales");
  redirect("/sales");
};
