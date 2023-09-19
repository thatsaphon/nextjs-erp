import { prisma } from "@/lib/prisma"
import Link from "next/link"
import React from "react"
import PurchaseFormComponent from "../purchase-form"
import { editPurchase } from "./action"

type Props = { params: { documentNumber: string } }

export const revalidate = 3600
export default async function EditSalesPage({
  params: { documentNumber },
}: Props) {
  const aps = await prisma.accountPayable.findMany({})
  const transaction = await prisma.transaction.findFirst({
    where: { type: { in: ["GoodsPurchase"] }, documentNumber },
    include: {
      transactionItems: {
        include: {
          inventory: { include: { prices: {} } },
          accountPayable: {},
        },
      },
    },
  })
  const salesItemOnly =
    transaction?.transactionItems.filter((item) => item.type === "Inventory") ||
    []
  const ap = transaction?.transactionItems.find(
    (item) => item.type === "AP"
  )?.accountPayable

  if (!aps || !transaction || !ap) return <>Not Found</>
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/purchase"}>{`<`} ย้อนกลับ</Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <PurchaseFormComponent
          aps={aps}
          purchase={salesItemOnly}
          ap={ap}
          submit={async (data, transactionItem, ap, documentNumber) => {
            "use server"
            if (!documentNumber)
              throw new Error("ไม่พบเลขที่เอกสารที่ต้องการแก้ไข")
            await editPurchase(data, transactionItem, ap, documentNumber)
          }}
          documentNumber={documentNumber}
          date={transaction.date}
        />
      </div>
    </>
  )
}
