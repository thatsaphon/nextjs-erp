"use client";

import { AccountReceivable } from "@prisma/client";
import {
  createColumnHelper,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

const columnHelper = createColumnHelper<AccountReceivable>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    id: "id",
    header: () => <div className="text-left">ID</div>,
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    id: "name",
    header: () => <div className="text-left">ชื่อลูกค้า</div>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <div className="text-right">
        <Link href={`./account-receivable/${info.getValue()}`}>Edit</Link>
      </div>
    ),
    id: "editButton",
    header: () => <div></div>,
  }),
];

type Props = {
  ar: AccountReceivable[];
};

export default function AccountReceivableTableComponent({ ar }: Props) {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const table = useReactTable({
    data: ar,
    columns,
    state: {
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });
  return (
    <>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header, i) => (
                <th
                  key={header.id}
                  className={`bg-blue-500 ${i === 0 ? "rounded-l-md" : ""} ${
                    i === headerGroup.headers.length - 1 ? "rounded-r-md" : ""
                  }`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} className="border-b-2 border-b-slate-300">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
