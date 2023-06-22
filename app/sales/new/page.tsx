import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import SalesFormComponent from "../sales-form";
import { createNewSales } from "./action";

type Props = {};

export default async function NewSalesPage({}: Props) {
  const ars = await prisma.accountReceivable.findMany({});
  if (!ars) return <>Not Found</>;
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/sales"}>
          {`<`} ย้อนกลับ
          {/* <button className="rounded-md bg-slate-700 p-2 text-slate-100">
          </button> */}
        </Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <SalesFormComponent
          ars={ars}
          sales={[]}
          submit={async (data, transactionItem, ar) => {
            "use server";
            await createNewSales(data, transactionItem, ar);
          }}></SalesFormComponent>
      </div>
    </>
  );
}
