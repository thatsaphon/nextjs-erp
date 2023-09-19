import { findFirstInvoice } from "@/api/findFirstInvoice"
import SalesSideNavClientComponent from "@/components/side-nav/sales-side-nav-client"
import SideNavMainComponent from "@/components/side-nav/side-nav-server"
import dayjs from "dayjs"
import React from "react"

export default async function SalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const getMonthListSinceFirstInvoice = (date: Date | undefined) => {
    if (!date) return [dayjs().format("MMM/YY")]
    const firstInvoiceDate = dayjs(date)
    const currentDate = dayjs()
    const monthYearList = []
    let currentMonthYear = firstInvoiceDate.clone()

    while (
      currentMonthYear.isBefore(currentDate, "month") ||
      currentMonthYear.isSame(currentDate, "month")
    ) {
      // Format the current month and year and add it to the array
      monthYearList.push(currentMonthYear.format("MMM/YY"))

      // Move to the next month
      currentMonthYear = currentMonthYear.add(1, "month")
    }
    return monthYearList
  }

  const firstInvoice = await findFirstInvoice()
  const monthList = getMonthListSinceFirstInvoice(firstInvoice?.date)
  return (
    <div className="flex h-full w-full">
      <div className="h-full w-48 bg-slate-200 p-2">
        <SalesSideNavClientComponent monthList={monthList} />
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}
