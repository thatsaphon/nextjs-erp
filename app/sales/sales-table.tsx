"use client";

import { SalesTableModel } from "@/model/SalesTableModel";
import {
  AccountReceivable,
  Inventory,
  Transaction,
  TransactionItem,
} from "@prisma/client";
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect } from "react";

const columnHelper = createColumnHelper<SalesTableModel>();

const columns = [
  columnHelper.accessor((row) => row, {
    id: "code",
    cell: ({ row, getValue }) => (
      <div
        style={{
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
        </>
      </div>
    ),
    header: "",
  }),
  columnHelper.accessor((row) => row.date, {
    id: "date",
    cell: (info) =>
      info.row.depth === 0 ? dayjs(info.getValue()).format("DD/MM/YYYY") : "",
    header: () => <div className="text-left">วันที่</div>,
  }),
  columnHelper.accessor((row) => row, {
    id: "documentNumber/inventoryName",
    filterFn: (row, columnId, value) => {
      return value !== "*-*";
    },
    enableColumnFilter: true,
    cell: (info) => {
      if (info.row.depth === 0) return info.getValue().documentNumber;
      if (info.row.depth === 1)
        return info.getValue().salesItem?.inventory.name;
    },
    header: () => <div className="text-left">เลขที่</div>,
  }),
  columnHelper.accessor((row) => row, {
    id: "ar",
    cell: (info) =>
      info.row.depth === 0 ? (
        <div>{info.getValue().ar?.name}</div>
      ) : (
        <div>{`${info.getValue().salesItem?.unitQuantity} ${
          info.getValue().salesItem?.inventoryUnit
        } (${info.getValue().salesItem?.inventoryUnitQuantity})`}</div>
      ),
    header: () => <div className="text-left">ลูกค้า</div>,
  }),
  columnHelper.accessor((row) => row, {
    id: "total",
    cell: (info) =>
      info.row.depth === 0 ? (
        <div>{info.getValue().amount?.toLocaleString()}</div>
      ) : (
        <div>{info.getValue().salesItem?.creditAmount?.toLocaleString()}</div>
      ),
    header: () => <div className="text-left">รวม</div>,
  }),
  columnHelper.accessor((row) => row, {
    id: "edit",
    cell: (info) =>
      info.row.depth === 0 ? (
        <Link href={`./sales/${info.getValue().documentNumber}`}>Edit</Link>
      ) : (
        <></>
      ),
    header: "",
  }),
];

type Props = {
  salesTable: SalesTableModel[];
};

export default function SalesTableComponent({ salesTable }: Props) {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const table = useReactTable({
    data: salesTable,
    columns,
    state: {
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row) => row.children,
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    enableFilters: true,
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
