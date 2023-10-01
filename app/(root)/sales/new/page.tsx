import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { createNewSales } from "./action";
import SalesFormComponent from "../sales-form";
import SearchARInput from "@/components/input/search-ar-input";
import dayjs from "dayjs";
import { Separator } from "@radix-ui/react-separator";
import SalesItemsComponent from "../sales-items";

type Props = {};

export default async function NewSalesPage({}: Props) {
  const ars = await prisma.accountReceivable.findMany({});
  if (!ars) return <>Not Found</>;
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/sales"}>
          {`<`} ย้อนกลับ
          {/* <button className="rounded-md bg-slate-700 p-2 text-slate-100">
          </button> */}
        </Link>
      </div>
      <div className="m-2 ml-5 mr-5 h-auto rounded-lg bg-slate-200 p-3">
        <form action="">
          <div className="grid grid-cols-2 gap-3">
            <SearchARInput name="ar" label="ชื่อลูกค้า"></SearchARInput>
            <label htmlFor="date">
              <span className="font-semibold">วันที่</span>
              <input
                type="date"
                name="date"
                className="mt-1 w-full rounded-md p-2.5"
                defaultValue={dayjs().format("YYYY-MM-DD")}
              />
            </label>
          </div>
          <SalesItemsComponent />
        </form>
      </div>
    </>
  );
}
