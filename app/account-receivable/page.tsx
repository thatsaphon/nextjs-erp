import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import AccountReceivableTableComponent from "./account-receivable-table";

type Props = {};

export default async function AccountReceivablePage({}: Props) {
  const ar = await prisma.accountReceivable.findMany({});
  return (
    <>
      <div className="p-4">
        <Link href={"/account-receivable/new"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            สร้างลูกหนี้
          </button>
        </Link>
      </div>
      <div className="m-2 mx-auto h-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        {/* <InventoryTable inventory={inventory}></InventoryTable> */}
        <AccountReceivableTableComponent ar={ar} />
      </div>
    </>
  );
}
