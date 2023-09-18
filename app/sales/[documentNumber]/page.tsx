import { prisma } from "@/lib/prisma"
import Link from "next/link"
import React from "react"
import SalesFormComponent from "../sales-form"
import { editSales } from "./action"
import InputComponent from "@/components/input/input-component"
import SearchInputComponent from "@/components/input/search-input-component"

type Props = { params: { documentNumber: string } }

export const revalidate = 3600
export default async function EditSalesPage({
  params: { documentNumber },
}: Props) {
  console.log(documentNumber)
  const ars = await prisma.accountReceivable.findMany({})
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
  })
  const salesItemOnly =
    transaction?.transactionItems.filter((item) => item.type === "Inventory") ||
    []
  const ar = transaction?.transactionItems.find(
    (item) => item.type === "AR"
  )?.accountReceivable

  if (!ars || !transaction || !ar) return <>Not Found</>
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/sales"}>{`<`} ย้อนกลับ</Link>
      </div>
      <div className="m-2 ml-5 mr-5 h-auto rounded-lg bg-slate-200 p-3">
        <div className="grid grid-cols-2">
          <SearchInputComponent label="ลูกค้า" name="ar"></SearchInputComponent>
        </div>
        <div className="mt-3">
          {/* <SalesFormComponent
            ars={ars}
            sales={salesItemOnly}
            ar={ar}
            submit={async (data, transactionItem, ar, documentNumber) => {
              "use server"
              if (!documentNumber)
                throw new Error("ไม่พบเลขที่เอกสารที่ต้องการแก้ไข")
              await editSales(data, transactionItem, ar, documentNumber)
            }}
            documentNumber={documentNumber}
            date={transaction.date}
          /> */}
        </div>
      </div>
    </>
  )
}
