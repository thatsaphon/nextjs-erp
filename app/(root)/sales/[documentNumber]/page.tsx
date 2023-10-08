import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import SearchARInput from "@/components/input/search-ar-input";
import SalesItemsComponent from "../sales-items";
import dayjs from "dayjs";
import { updateSales } from "@/api/transaction-item/sales";

type Props = { params: { documentNumber: string } };

export const revalidate = 3600;
export default async function EditSalesPage({
  params: { documentNumber },
}: Props) {
  const ars = await prisma.accountReceivable.findMany({});
  const transaction = await prisma.transaction.findFirst({
    where: { type: { in: ["CashSales", "CreditSales"] }, documentNumber },
    include: {
      transactionItems: {
        include: {
          inventory: { include: { prices: {} } },
          accountReceivable: {},
        },
      },
    },
  });
  const salesItemOnly =
    transaction?.transactionItems.filter((item) => item.type === "Inventory") ||
    [];
  const ar = transaction?.transactionItems.find(
    (item) => item.type === "AR"
  )?.accountReceivable;

  if (!ars || !transaction || !ar) return <>Not Found</>;
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/sales"}>{`<`} ย้อนกลับ</Link>
      </div>
      <div className="m-2 ml-5 mr-5 h-auto rounded-lg bg-slate-200 p-3">
        <form action={updateSales}>
          <input type="text" hidden name="id" defaultValue={transaction.id} />
          <div className="grid grid-cols-2 gap-3">
            <label className="col-start-2" htmlFor="documentNumber">
              <span className="font-semibold">เลขที่เอกสาร</span>
              <input
                className="mt-1 w-full rounded-md p-2.5"
                type="text"
                name="documentNumber"
                defaultValue={transaction.documentNumber}
              />
            </label>
            <SearchARInput name="ar" label="ชื่อลูกค้า" ar={ar}></SearchARInput>
            <label htmlFor="date">
              <span className="font-semibold">วันที่</span>
              <input
                type="date"
                name="date"
                className="mt-1 w-full rounded-md p-2.5"
                defaultValue={dayjs().format("YYYY-MM-DD")}
              />
            </label>
          </div>
          <SalesItemsComponent salesItems={salesItemOnly} />
        </form>
      </div>
    </>
  );
}
