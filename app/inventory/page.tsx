import { prisma } from "@/lib/prisma";
import { Inventory, Price } from "@prisma/client";
import Link from "next/link";
import { getInventories } from "./action";
import InventoryTable from "./inventory-table";

type Props = {};

export const revalidate = 3600;
export default async function InventoryList({}: Props) {
  const inventory = await prisma.inventory.findMany({
    include: {
      prices: {},
    },
  });
  return (
    <>
      <div className="p-4">
        <Link href={"/inventory/new"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            สร้างสินค้า
          </button>
        </Link>
      </div>
      <div className="m-2 mx-auto h-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <InventoryTable inventory={inventory}></InventoryTable>
      </div>
    </>
  );
}
