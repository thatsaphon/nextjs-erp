import Link from "next/link"
import React from "react"

type Props = {}

export default function SalesListLoading({}: Props) {
  return (
    <>
      <div className="p-4">
        <Link href={"/sales/new"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            สร้างรายการขาย
          </button>
        </Link>
      </div>
      <div className="m-2 ml-5 mr-5 h-auto min-h-[500px] rounded-lg bg-slate-200 p-3"></div>
    </>
  )
}
