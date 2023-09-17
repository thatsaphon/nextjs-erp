"use server"

import { prisma } from "@/lib/prisma"

export const findFirstInvoice = async () => {
  const firstInvoice = await prisma.transaction.findFirst({
    orderBy: { date: "asc" },
    select: { date: true },
  })
  return firstInvoice
}
