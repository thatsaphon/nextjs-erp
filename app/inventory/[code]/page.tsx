import Link from "next/link";
import React from "react";
import InventoryFormComponent from "../inventory-form";
import { prisma } from "@/lib/prisma";
import { updateInventory } from "./action";

type Props = { params: { code: string } };

export const revalidate = 3600;
export default async function InventoryDetailPage({ params }: Props) {
  const inventory = await prisma.inventory.findFirst({
    where: { code: params.code },
    include: { prices: {} },
  });

  if (!inventory) return <>Not found</>;

  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/inventory"}>
          {`<`} ย้อนกลับ
          {/* <button type="button" className="rounded-md bg-slate-700 p-2 text-slate-100">
        </button> */}
        </Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <InventoryFormComponent
          inventory={inventory}
          submit={async (data) => {
            "use server";
            const res = await updateInventory(data, params.code);
          }}
        />
      </div>
    </>
  );
}
