"use client";

import {
  AccountPayable,
  Inventory,
  Price,
  TransactionItem,
} from "@prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import React, { useState, KeyboardEvent, useEffect } from "react";
import { searchInventories } from "./action";
import InventorySearchInputComponent from "./inventory-search-input";

const columnHelper = createColumnHelper<
  Partial<TransactionItem> & { inventory?: Inventory & { prices?: Price[] } }
>();

type Props = {
  aps: AccountPayable[];
  purchase: (TransactionItem & {
    inventory:
      | (Inventory & {
          prices: Price[];
        })
      | null;
  })[];
  submit: (
    formData: FormData,
    transactionItem: Partial<
      TransactionItem & { inventory?: Inventory & { prices?: Price[] } }
    >[],
    ap: AccountPayable,
    documentNumber?: string
  ) => Promise<void>;
  ap?: AccountPayable;
  documentNumber?: string;
  date?: Date;
};

export default function PurchaseFormComponent({
  aps,
  purchase,
  submit,
  ap,
  documentNumber,
  date,
}: Props) {
  const [selectedAp, setSelectedAp] = useState<AccountPayable | null>(ap);
  const [searchResult, setSearchResult] = useState<
    (Inventory & { prices?: Price[] })[]
  >([]);
  const [tableState, setTableState] = useState<
    (TransactionItem & {
      inventory:
        | (Inventory & {
            prices: Price[];
          })
        | null;
    })[]
  >([...purchase]);

  const columns = [
    columnHelper.accessor((item) => item.inventory?.code, {
      cell: (info) => info.getValue(),
      id: "inventoryCode",
      header: () => <div className="text-left">รหัสสินค้า</div>,
    }),
    columnHelper.accessor((item) => item.inventory?.name, {
      cell: (info) => info.getValue(),
      id: "inventoryName",
      header: () => <div className="text-left">ชื่อสินค้า</div>,
    }),
    columnHelper.accessor((item) => item, {
      cell: (info) => {
        const initialValue = info.getValue().inventoryUnit;
        const [value, setValue] = React.useState<string>(initialValue || "");
        React.useEffect(() => {
          setValue(initialValue || "");
        }, [initialValue]);
        return (
          <select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              info.table.options.meta?.updateData(
                info.row.index,
                info.column.id,
                e.target.value
              );
            }}>
            {info.getValue().inventory?.prices?.map((price, i) => (
              <option
                key={i}
                id={`${info.getValue().inventory?.code}-price-${i}`}
                value={price.unit}>
                {`${price.unit} (${price.quantity})`}
              </option>
            ))}
          </select>
        );
      },
      id: "inventoryUnit",
      header: () => <div className="text-left">หน่วย</div>,
    }),
    columnHelper.accessor("unitQuantity", {
      cell: (info) => {
        const initialValue = info.getValue();
        const [value, setValue] = React.useState<number>(initialValue || 0);
        React.useEffect(() => {
          setValue(initialValue || 0);
        }, [initialValue]);

        return (
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            onBlur={(e) => {
              info.table.options.meta?.updateData(
                info.row.index,
                info.column.id,
                +e.target.value
              );
            }}
          />
        );
      },
      header: () => <div className="text-left">จำนวน</div>,
    }),
    columnHelper.accessor("inventoryPricePerUnit", {
      cell: (info) => {
        const initialValue = info.getValue();
        const [value, setValue] = React.useState<number>(initialValue || 0);
        React.useEffect(() => {
          setValue(initialValue || 0);
        }, [initialValue]);

        return (
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            onBlur={(e) => {
              info.table.options.meta?.updateData(
                info.row.index,
                info.column.id,
                +e.target.value
              );
            }}
          />
        );
      },
      header: () => <div className="text-left">ราคา</div>,
    }),
    columnHelper.accessor((item) => item.debitAmount || item.creditAmount, {
      cell: (info) => info.getValue(),
      id: "total",
      header: () => <div className="text-left">รวม</div>,
    }),
  ];

  const table = useReactTable({
    data: tableState,
    columns,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // Skip page index reset until after next rerender
        setTableState((old) =>
          old
            .map((row, index) => {
              if (index === rowIndex) {
                if (row.inventory && columnId === "inventoryUnit") {
                  const priceUnit = row.inventory.prices?.find(
                    (price) =>
                      (columnId === "inventoryUnit"
                        ? value
                        : row.inventoryUnit) === price.unit
                  );
                  if (priceUnit) {
                    row.inventoryPricePerUnit = priceUnit.price;
                    row.inventoryUnitQuantity = priceUnit.quantity;
                  }
                }
                return {
                  ...old[rowIndex]!,
                  inventoryPricePerUnit: row.inventoryPricePerUnit,
                  [columnId]: value,
                };
              }
              return row;
            })
            .map((row, index) => {
              if (row.inventoryPricePerUnit && row.unitQuantity) {
                row.debitAmount = row.inventoryPricePerUnit * row.unitQuantity;
              }
              return row;
            })
        );
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  function handleArKeyDown(e: KeyboardEvent<HTMLButtonElement>, total: number) {
    if (e.code === "ArrowUp" && e.target instanceof Element) {
      if (e.target.id === "ar-0") return;
      document.getElementById(`ar-${+e.target.id.split("-")[1] + -1}`)?.focus();
    }
    if (e.code === "ArrowDown" && e.target instanceof Element) {
      if (e.target.id === `ar-${total - 1}`) return;
      document.getElementById(`ar-${+e.target.id.split("-")[1] + 1}`)?.focus();
    }
  }

  async function handleNewItemKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (
      (e.code === "ArrowDown" ||
        e.code === "Enter" ||
        e.code === "NumpadEnter") &&
      e.target instanceof Element
    ) {
      e.preventDefault();
      const inventories = await searchInventories(e.target.value);
      setSearchResult(inventories);
      setTimeout(() => {
        document.getElementById(`search-0`)?.focus();
      }, 100);
    }
  }

  function handleClickSearchResult(
    inventory: Inventory & {
      prices?: Price[];
    }
  ) {
    pushNew(inventory);
  }

  async function handleSearchResultKeyDown(
    e: KeyboardEvent<HTMLButtonElement>,
    total: number,
    inventory: Inventory & { prices?: Price[] }
  ) {
    if (e.code === "Enter" || e.code === "Tab") {
      e.preventDefault();
      pushNew(inventory);
    }

    if (e.code === "ArrowUp" && e.target instanceof Element) {
      if (e.target.id === "search-0") return;
      document
        .getElementById(`search-${+e.target.id.split("-")[1] + -1}`)
        ?.focus();
    }
    if (e.code === "ArrowDown" && e.target instanceof Element) {
      if (e.target.id === `search-${total - 1}`) return;
      document
        .getElementById(`search-${+e.target.id.split("-")[1] + 1}`)
        ?.focus();
    }
  }
  function pushNew(
    inventory: Inventory & {
      prices?: Price[];
    }
  ) {
    setTableState((prev) => {
      const newSales = [...prev];
      newSales.push({
        inventory,
        unitQuantity: 1,
        inventoryUnit: inventory.prices && inventory.prices[0].unit,
        inventoryUnitQuantity: inventory.prices && inventory.prices[0].quantity,
        inventoryPricePerUnit:
          inventory.prices && inventory.prices.length
            ? inventory.prices[0].price
            : 0,
        debitAmount:
          inventory.prices && inventory.prices.length
            ? inventory.prices[0].price
            : 0,
      });
      return newSales;
    });
    setSearchResult([]);
  }

  return (
    <>
      <div>{documentNumber}</div>
      <form
        className="flex h-full flex-col justify-between"
        action={async (data) => {
          if (!selectedAp) throw new Error("ไม่ได้เลือกลูกค้า");
          await submit(data, tableState, selectedAp, documentNumber);
        }}>
        <div className="flex w-full flex-col justify-between gap-2 lg:flex-row">
          <div className="relative flex-1">
            <label htmlFor="ar" className="text-gray-700">
              ลูกค้า
            </label>
            {!selectedAp && (
              <input
                type="text"
                id="ar"
                className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                name="ar"
                placeholder="ลูกค้า"
              />
            )}
            {!selectedAp && (
              <div className="absolute z-10 min-h-[200px] w-full overflow-scroll bg-white">
                {aps.map((ar, i) => (
                  <button
                    key={i}
                    id={`ar-${i}`}
                    onClick={() => setSelectedAp(ar)}
                    type="button"
                    onKeyDown={(e) => handleArKeyDown(e, aps.length)}
                    className="w-full p-2 text-left hover:bg-slate-200 focus:bg-slate-200 focus:outline-none">
                    {ar.name}
                  </button>
                ))}
              </div>
            )}
            {selectedAp && (
              <div className="p-2 font-semibold">
                {selectedAp.name}
                <span
                  className="ml-2 cursor-pointer text-blue-500 underline"
                  onClick={() => setSelectedAp(null)}>
                  เปลี่ยน
                </span>
              </div>
            )}
          </div>
          <div className="relative flex-1">
            <label htmlFor="date" className="text-gray-700">
              วันที่
            </label>
            <input
              type="date"
              id="date"
              defaultValue={dayjs(date).format("YYYY-MM-DD")}
              className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              name="date"
              placeholder="วันที่"
            />
          </div>
        </div>
        <div className="mt-2 flex w-full flex-1 justify-between gap-2">
          <div className="flex-1 rounded-md bg-white"></div>
        </div>

        <div className="flex w-full flex-col justify-between gap-2 bg-white lg:flex-row">
          <div className="relative flex-1 ">
            {true && (
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="">
                      {headerGroup.headers.map((header, i) => (
                        <th
                          key={header.id}
                          className={`bg-blue-500 ${
                            i === 0 ? "rounded-l-md" : ""
                          } ${
                            i === headerGroup.headers.length - 1
                              ? "rounded-r-md"
                              : ""
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-b-2 border-b-slate-300">
                    <td className="relative">
                      <input
                        type="text"
                        id="search"
                        className="w-full"
                        onKeyDown={(e) => handleNewItemKeyDown(e)}
                      />
                      {!!searchResult.length && (
                        <InventorySearchInputComponent
                          handleClickSearchResult={handleClickSearchResult}
                          handleSearchResultKeyDown={handleSearchResultKeyDown}
                          searchResult={searchResult}
                        />
                      )}
                    </td>
                    <td>
                      <input type="text" disabled />{" "}
                    </td>
                    <td>
                      <input type="text" disabled />{" "}
                    </td>
                    <td>
                      <input type="number" disabled />{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="mr-3 flex justify-end">
          <button
            type="submit"
            className="rounded-lg  bg-indigo-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 ">
            ยืนยัน
          </button>
        </div>
      </form>
    </>
  );
}
