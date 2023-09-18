"use client"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React, { useTransition } from "react"

type Props = { monthList?: string[] }

export default function SideNavClientComponent({ monthList }: Props) {
  const path = usePathname()
  const query = useSearchParams()

  if (path.split("?")[0] === "/sales")
    return (
      <>
        <div className="text-center">เดือน</div>
        <div className="flex w-full flex-col">
          {monthList &&
            monthList.map((value, index) => (
              <Link
                href={`/sales?month=${value.split("/")[0]}&year=${
                  value.split("/")[1]
                }`}
                className={`grid grid-cols-2 gap-1 ${
                  query.get("month") + "/" + query.get("year") === value ||
                  (!query.get("month") && index === monthList.length - 1)
                    ? `pointer-events-none bg-slate-300`
                    : `hover:cursor-pointer hover:bg-slate-300`
                }`}
                key={index}>
                <div className="text-right">{value.split("/")[0]}</div>
                <div className="text-left">{value.split("/")[1]}</div>
              </Link>
            ))}
        </div>
      </>
    )

  return <div>SideNavClientComponent</div>
}
