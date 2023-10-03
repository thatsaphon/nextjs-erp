"use server";

import { prisma } from "@/lib/prisma";
import { AccountReceivable } from "@prisma/client";

export const searchAR = ({
  taxId,
  name,
  address,
  phone,
  remark,
}: Partial<AccountReceivable>) => {
  return prisma.accountReceivable.findMany({
    where: {
      AND: [
        {
          name: { contains: name || undefined },
        },
        {
          taxId: { contains: taxId || undefined },
        },
        {
          address: { contains: address || undefined },
        },
        {
          phone: { contains: phone || undefined },
        },
        {
          remark: { contains: remark || undefined },
        },
      ],
    },
    orderBy: { name: "asc" },
  });
};

export const searchARByTaxID = (taxId: string) => {
  return prisma.accountReceivable.findFirst({ where: { taxId } });
};

export type CreateAR = Omit<
  AccountReceivable,
  "id" | "createdDate" | "updatedDate"
>;
export const createAR = (ar: CreateAR) => {
  return prisma.accountReceivable.create({
    data: { ...ar, createdDate: new Date(), updatedDate: new Date() },
  });
};
