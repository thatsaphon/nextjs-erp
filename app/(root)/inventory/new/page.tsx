import Link from "next/link";
import React, { useState, useTransition } from "react";
import { createInventory } from "./action";
import InventoryFormComponent from "../inventory-form";

type Props = {};

export default function NewInventory({}: Props) {
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
        <InventoryFormComponent submit={createInventory} />
      </div>
    </>
  );
}
