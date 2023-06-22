import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import SalesFormComponent from "../sales-form";
import { editSales } from "./action";

type Props = { params: { documentNumber: string } };

export default async function EditSalesPage({
  params: { documentNumber },
}: Props) {
  const ars = await prisma.accountReceivable.findMany({});
  if (!ars) return <>Not Found</>;
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/sales"}>{`<`} ย้อนกลับ</Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <SalesFormComponent
          ars={ars}
          sales={[]}
          submit={async (data, transactionItem, ar) => {
            "use server";
            editSales(data, transactionItem, ar);
          }}></SalesFormComponent>
      </div>
    </>
  );
}
