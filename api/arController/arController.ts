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
