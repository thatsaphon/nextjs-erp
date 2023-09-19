import { prisma } from "@/lib/prisma";
import Link from "next/link";
import InventoryTable from "./inventory-table";

type Props = {};

export const revalidate = 3600;
export default async function InventoryList({}: Props) {
  const inventory = await prisma.inventory.findMany({
    include: {
      prices: {},
    },
    orderBy: { updatedDate: "desc" },
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
