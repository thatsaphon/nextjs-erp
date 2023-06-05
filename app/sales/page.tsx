import Link from "next/link";
import React from "react";

type Props = {};

export default function SalesListPage({}: Props) {
  return (
    <div className="p-4">
      <Link href={"/sales/new"}>
        <button className="rounded-md bg-slate-700 p-2 text-slate-100">
          สร้างรายการขาย
        </button>
      </Link>
    </div>
  );
}
