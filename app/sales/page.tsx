import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import SalesTableComponent from "./sales-table";
import { transformToSalesTableModel } from "@/model/SalesTableModel";

type Props = {};

export const revalidate = 3600;
export default async function SalesListPage({}: Props) {
  const salesList = await prisma.transaction.findMany({
    where: {
      type: { in: ["CashSales", "CreditSales"] },
    },
    include: {
      transactionItems: {
        include: { accountReceivable: {}, inventory: {} },
      },
    },
  });
  const salesTable = salesList.map(transformToSalesTableModel);
  return (
    <>
      <div className="p-4">
        <Link href={"/sales/new"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            สร้างรายการขาย
          </button>
        </Link>
      </div>
      <div className="m-2 mx-auto h-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <SalesTableComponent salesTable={salesTable}></SalesTableComponent>
      </div>
    </>
  );
}
