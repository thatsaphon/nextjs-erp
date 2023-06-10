"use client";

import { Inventory, Price } from "@prisma/client";
import {
  ColumnDef,
  ExpandedState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import React, { useState } from "react";

const columnHelper = createColumnHelper<
  Partial<Inventory> & { prices?: Price[] } & Partial<Price>
>();

const columns = [
  columnHelper.accessor((row) => row.code || row.barcode, {
    id: "code",
    cell: ({ row, getValue }) => (
      <div
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          paddingLeft: `${row.depth * 2}rem`,
        }}>
        <>
          {row.getCanExpand() && row.depth == 0 ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}>
              {row.getIsExpanded() ? "👇" : "👉"}
            </button>
          ) : row.depth == 0 ? (
            "⚠️"
          ) : (
            ""
          )}{" "}
          {getValue()}
        </>
      </div>
    ),
    header: "รหัสสินค้า",
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "ชื่อสินค้า",
  }),
  //   columnHelper.group({
  //     header: "หน่วย",
  //     columns:[

  //     ]
  //   }),
  columnHelper.accessor(
    (row) => (row.unit ? `${row.unit}(${row.quantity})` : ""),
    {
      cell: (info) => info.getValue(),
      header: "หน่วย",
    }
  ),
  columnHelper.accessor((row) => (row.unit ? `${row.price}` : ""), {
    cell: (info) => info.getValue(),
    header: "ราคา",
  }),
  columnHelper.accessor("code", {
    header: "",
    id: "link",
    cell: (info) =>
      info.getValue() ? (
        <Link href={`./inventory/${info.getValue()}`}>Edit</Link>
      ) : (
        <></>
      ),
  }),
];

type Props = { inventory: Partial<Inventory> & { prices: Price[] }[] };

export default function InventoryTable({ inventory }: Props) {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const table = useReactTable({
    data: inventory,
    columns,
    state: {
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row) => row.prices,
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
              {console.log(row.getVisibleCells())}
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
