import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import PurchaseFormComponent from "../purchase-form";
import { createPurchase } from "./action";

type Props = {};

export default async function NewSalesPage({}: Props) {
  const aps = await prisma.accountPayable.findMany({});
  if (!aps) return <>Not Found</>;
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/purchase"}>
          {`<`} ย้อนกลับ
          {/* <button className="rounded-md bg-slate-700 p-2 text-slate-100">
          </button> */}
        </Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <PurchaseFormComponent
          aps={aps}
          purchase={[]}
          submit={async (data, transactionItem, ap) => {
            "use server";
            await createPurchase(data, transactionItem, ap);
          }}></PurchaseFormComponent>
      </div>
    </>
  );
}
