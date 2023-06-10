import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";

type Props = {};

export default async function SalesListPage({}: Props) {
  // const result = await prisma.inventory.create({
  //   data: {
  //     code: "test",
  //     name: "test",
  //     createdDate: new Date(),
  //     updatedDate: new Date(),
  //     price: 100,
  //     remark: "test",
  //     quantity: 10,
  //   },
  // });
  return (
    <>
      <div className="p-4">
        <Link href={"/sales/new"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            สร้างรายการขาย
          </button>
        </Link>
      </div>
      <div className="m-2 mx-auto h-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <div className="justify flex px-2 font-bold">
          <span className="mx-2  w-[10px] flex-shrink"></span>
          <span className="mx-2 flex-1">รหัสสินค้า</span>
          <span className="mx-2 flex-1">ชื่อสินค้า</span>
          <span className="mx-2 flex-1">จำนวน</span>
          <span className="mx-2 flex-1">ราคา</span>
          <span className="mx-2 flex-1">รวม</span>
        </div>
        <hr className="border-slate-700" />
        <div className="justify flex px-2">
          <span className="mx-2 w-[10px] flex-shrink text-right">1</span>
          <span className="mx-2 flex-1">รหัสสินค้า</span>
          <span className="mx-2 flex-1">ชื่อสินค้า</span>
          <span className="mx-2 flex-1">จำนวน</span>
          <span className="mx-2 flex-1">ราคา</span>
          <span className="mx-2 flex-1">รวม</span>
        </div>
      </div>
    </>
  );
}
