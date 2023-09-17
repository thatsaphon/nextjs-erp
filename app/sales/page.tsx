import Link from "next/link"
import React, { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import SalesTableComponent from "./sale-table"
import dayjs from "dayjs"
import SalesListLoading from "./loading"

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 3600
export default async function SalesListPage({ params, searchParams }: Props) {
  let month = dayjs()
  if (searchParams.month && searchParams.year) {
    month = dayjs(searchParams.month + "20" + searchParams.year)
  }

  const salesList = await prisma.transaction.findMany({
    where: {
      type: { in: ["CashSales", "CreditSales"] },
      date: {
        gte: month.startOf("month").toDate(),
        lte: month.endOf("month").toDate(),
      },
    },
    include: {
      transactionItems: {
        include: { accountReceivable: {}, inventory: {} },
      },
    },
  })
  console.log(salesList.length)

  return (
    <>
      <div className="p-4">
        <Link href={"/sales/new"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            สร้างรายการขาย
          </button>
        </Link>
      </div>
      <div className="m-2 ml-5 mr-5 h-auto min-h-[500px] rounded-lg bg-slate-200 p-3">
        <Suspense fallback={<SalesListLoading />}>
          <SalesTableComponent salesList={salesList}></SalesTableComponent>
        </Suspense>
      </div>
    </>
  )
}
