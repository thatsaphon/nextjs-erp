import React from "react";
import AccountPayableTableComponent from "./account-payable-table";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {};

export const revalidate = 3600;
export default async function AccountPayablePage({}: Props) {
  const ap = await prisma.accountPayable.findMany({});
  return (
    <>
      <div className="p-4">
        <Link href={"/account-payable/new"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            สร้างเจ้าหนี้
          </button>
        </Link>
      </div>
      <div className="m-2 mx-auto h-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <AccountPayableTableComponent ap={ap} />
      </div>
    </>
  );
}
