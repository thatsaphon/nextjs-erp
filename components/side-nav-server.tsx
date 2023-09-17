import { findFirstInvoice } from "@/api/findFirstInvoice"
import dayjs from "dayjs"
import SideNavClientComponent from "./client/side-nav-client"

type Props = {}

export default async function SideNavMainComponent({}: Props) {
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

  return <SideNavClientComponent monthList={monthList} />
}
