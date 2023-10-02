import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AccountReceivable } from "@prisma/client";

export async function POST(request: NextRequest) {
  // AccountReceivable
  //   const search: AccountReceivable = {
  //     taxId: "",
  //   };
  // type searchAR = typeof AccountRecei
  const { taxId, name, address, phone, remark } = await request.json();
  const ars = await prisma.accountReceivable.findMany({
    where: {
      OR: [
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
  return NextResponse.json(ars);
}
