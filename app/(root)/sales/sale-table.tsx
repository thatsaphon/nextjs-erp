"use client"
import {
  AccountReceivable,
  Inventory,
  Transaction,
  TransactionItem,
} from "@prisma/client"
import dayjs from "dayjs"
import Link from "next/link"
import React, { Fragment, useEffect, useState } from "react"

type Props = {
  salesList: (Transaction & {
    transactionItems: (TransactionItem & {
      inventory: Inventory | null
      accountReceivable: AccountReceivable | null
    })[]
  } & { isExpanded?: boolean })[]
}

export default function SalesTableComponent({ salesList }: Props) {
  const [list, setList] = useState(salesList)

  useEffect(() => {
    setList(salesList)
  }, [salesList])

  const onExpand = (index: number) => {
    // salesList[index].isExpanded = !salesList[index].isExpanded
    const newList = list.map((sale, i) =>
      index === i ? { ...sale, isExpanded: !list[index].isExpanded } : sale
    )
    setList(newList)
  }

  return (
    <>
      <div className="mb-2 grid grid-cols-[repeat(6,1fr)_60px] gap-2 border-b-2 border-slate-500 font-bold">
        <div className="col-span-1">วันที่</div>
        <div className="col-span-2">เลขที่</div>
        <div className="col-span-2">ลูกค้า</div>
        <div className="col-span-1 text-right">รวม</div>
        <div className="col-span-1 col-end-8"></div>
      </div>
      {list.map((sale, index) => (
        <div
          className={`grid grid-cols-[repeat(6,1fr)_60px] gap-2 hover:cursor-pointer hover:bg-slate-300 ${
            sale.isExpanded &&
            " border-b-2 border-slate-500 bg-slate-300 py-1 hover:bg-slate-400"
          }`}
          onClick={() => onExpand(index)}
          key={index}>
          <div className="col-span-1 col-start-1">
            {dayjs(sale.date).format("YYYY/MM/DD")}
          </div>
          <div className="col-span-2">{sale.documentNumber}</div>
          <div className="col-span-2">
            {
              sale.transactionItems.find((item) => item.accountReceivableId)
                ?.accountReceivable?.name
            }
          </div>
          <div className="col-span-1 text-right">
            {sale.transactionItems
              .find((item) => item.accountReceivableId)
              ?.debitAmount.toLocaleString()}
          </div>
          <Link href={`./sales/${sale.documentNumber}`}>Edit</Link>
          {/* <div className="pointer-events-none">
          </div> */}
          {/* <div className="col-span-1">Edit</div> */}
          {sale.isExpanded && (
            <div className="col-span-7 mx-auto grid w-[80%] grid-cols-[repeat(6,1fr)_60px]">
              <div className="col-start-1 font-bold">id</div>
              <div className="col-span-2 font-bold">ชื่อสินค้า</div>
              <div className="font-bold">ราคา</div>
              <div className="font-bold">จำนวน</div>
              <div className="font-bold">รวม</div>
              {sale.transactionItems
                .filter((item) => item.inventoryId)
                .map((item, index) => (
                  <Fragment key={index}>
                    <div className="col-start-1">{item.inventory?.id}</div>
                    <div className="col-span-2">{item.inventory?.name}</div>
                    <div>{item.inventoryPricePerUnit}</div>
                    <div>{`${item.unitQuantity} ${item.inventoryUnit}`}</div>
                    <div>{item.creditAmount.toLocaleString()}</div>
                  </Fragment>
                ))}
            </div>
          )}
          {/* <div className="col-span-7 border-b-2 border-slate-500"></div> */}
        </div>
      ))}
    </>
  )
}
