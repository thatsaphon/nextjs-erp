import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import PurchaseTableComponent from "./purchase-table";
import { transformToPurchaseTableModel } from "@/model/PurchaseTableModel";

type Props = {};

export const revalidate = 3600;
export default async function SalesListPage({}: Props) {
  const purchaseList = await prisma.transaction.findMany({
    where: {
      type: { in: ["GoodsPurchase"] },
    },
    include: {
      transactionItems: {
        include: { accountPayable: {}, inventory: {} },
      },
    },
  });
  const purchaseTable = purchaseList.map(transformToPurchaseTableModel);
  return (
    <>
      <div className="p-4">
        <Link href={"/purchase/new"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            สร้างรายการขาย
          </button>
        </Link>
      </div>
      <div className="m-2 mx-auto h-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <PurchaseTableComponent
          purchaseTable={purchaseTable}></PurchaseTableComponent>
      </div>
    </>
  );
}
