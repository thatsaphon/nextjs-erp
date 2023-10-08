"use client";
import SearchInventoryInput from "@/components/input/search-inventory-input";
import React, { Fragment, useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  InventoryPartialWithRelations,
  TransactionItemPartialWithRelations,
} from "@/prisma/generated/zod";

type Props = {
  salesItems?: TransactionItemPartialWithRelations[];
};

export default function SalesItemsComponent({ salesItems = [] }: Props) {
  const [salesItemsInput, setSalesItemsInput] =
    useState<TransactionItemPartialWithRelations[]>(salesItems);
  const [showLastItem, setShowLastItem] = useState(true);
  const deleteItem = (index: number) => {
    const temp = salesItemsInput.filter((_, i) => i !== index);
    setSalesItemsInput(temp);
  };
  useEffect(() => {
    if (salesItemsInput.length > 0) {
      document
        ?.getElementsByName("quantity")
        [document.getElementsByName("quantity").length - 1]?.focus();
    }
  }, [salesItemsInput.length]);
  const setInventoryPricesToList = (
    inventoryPrices: InventoryPartialWithRelations,
    barcode: string
  ) => {
    if (!inventoryPrices.prices) return null;
    let index = inventoryPrices.prices.findIndex(
      (price) => price.barcode === barcode
    );
    if (index === -1) index = 0;
    const newList = {
      type: "Inventory",
      inventory: inventoryPrices,
      quantity: inventoryPrices.prices[index].quantity,
      unitQuantity: 1,
      inventoryPricePerUnit: inventoryPrices.prices[index].price,
      inventoryUnit: inventoryPrices.prices[index].unit,
      inventoryUnitQuantity: inventoryPrices.prices[index].quantity,
      inventoryBarcode: inventoryPrices.prices[index].barcode,
    };
    return newList;
  };
  const onSelectNewBarcode = (barcode: string, index: number) => {
    // const newInventoryPrice =
    const newItem = setInventoryPricesToList(
      salesItemsInput[index].inventory,
      barcode
    );
    if (!newItem) return;
    itemChanged(newItem, index);
  };
  const onQuantityChanged = (quantity: number, index: number) => {
    const newItem = salesItemsInput[index];
    newItem.unitQuantity = quantity;
    itemChanged(newItem, index);
  };
  const onPriceChanged = (price: number, index: number) => {
    const newItem = salesItemsInput[index];
    newItem.inventoryPricePerUnit = price;
    itemChanged(newItem, index);
  };
  const itemChanged = (
    item: TransactionItemPartialWithRelations,
    index: number
  ) => {
    const newItem = [...salesItemsInput];
    newItem[index] = item;
    setSalesItemsInput(newItem);
    console.log(newItem[index]);
    console.log(salesItemsInput[index]);
  };
  return (
    <>
      <div className="mt-5 grid grid-cols-[1fr_2fr_repeat(4,100px)_40px] gap-3 p-2">
        <div className="font-semibold">รหัสสินค้า</div>
        <div className="font-semibold">ชื่อสินค้า</div>
        <div className="text-right font-semibold">จำนวน</div>
        <div className="text-right font-semibold">หน่วย</div>
        <div className="text-right font-semibold">ราคาต่อหน่วย</div>
        <div className="text-right font-semibold">ราคารวม</div>
        <div className="text-right font-semibold"></div>
        {salesItemsInput.map((sales, index) => (
          <Fragment key={index}>
            <select
              className="rounded-md p-2 text-right"
              name="code"
              id="code"
              value={sales.inventoryBarcode || ""}
              onChange={(e) => onSelectNewBarcode(e.target.value, index)}
            >
              {sales.inventory?.prices?.map((option) => (
                <option key={option.barcode} value={option.barcode}>
                  {option.barcode}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="inventoryId"
              value={sales.inventoryId || 0}
              hidden
            />
            <span className="rounded-md p-2 ">{sales.inventory?.name}</span>
            <input
              className="rounded-md p-2 text-right"
              type="number"
              name="quantity"
              id="quantity"
              value={sales.unitQuantity || 1}
              onChange={(e) => onQuantityChanged(+e.target.value, index)}
              onFocus={(e) => e.target.select()}
            />
            <input
              type="number"
              hidden
              value={sales.inventoryUnitQuantity || 1}
              name="inventoryUnitQuantity"
            />
            <input
              type="text"
              name="unit"
              hidden
              value={sales.inventoryUnit || ""}
            />
            <select
              className="rounded-md p-2 text-right"
              id="unit"
              value={sales.inventoryBarcode || ""}
              onChange={(e) => onSelectNewBarcode(e.target.value, index)}
            >
              {sales.inventory?.prices?.map((option) => (
                <option key={option.unit} value={option.barcode}>
                  {option.unit}
                </option>
              ))}
            </select>
            <input
              className="rounded-md p-2 text-right"
              type="number"
              name="price"
              value={sales.inventoryPricePerUnit || ""}
              onChange={(e) => onPriceChanged(+e.target.value, index)}
              onFocus={(e) => e.target.select()}
            />
            <span className="rounded-md p-2 text-right">
              {(
                sales.inventoryPricePerUnit * sales.unitQuantity
              ).toLocaleString()}
            </span>
            <button className="p-2" onClick={() => deleteItem(index)}>
              <TrashIcon className="h-6 w-6" />
            </button>
          </Fragment>
        ))}
        {showLastItem && (
          <Fragment>
            <SearchInventoryInput
              inventorySelected={(inventoryPrices, barcode) => {
                if (!inventoryPrices.prices) return;
                let index = inventoryPrices.prices.findIndex(
                  (price) => price.barcode === barcode
                );
                if (index === -1) index = 0;

                const newSalesItemsInput: TransactionItemPartialWithRelations[] =
                  [
                    ...salesItemsInput,
                    {
                      type: "Inventory",
                      inventory: inventoryPrices,
                      quantity: inventoryPrices.prices[index].quantity,
                      unitQuantity: 1,
                      inventoryPricePerUnit:
                        inventoryPrices.prices[index].price,
                      inventoryUnit: inventoryPrices.prices[index].unit,
                      inventoryUnitQuantity:
                        inventoryPrices.prices[index].quantity,
                      inventoryBarcode: inventoryPrices.prices[index].barcode,
                      inventoryId: +inventoryPrices.prices[index].inventoryId,
                    },
                  ];
                setSalesItemsInput(newSalesItemsInput);
              }}
            />
            <span className="rounded-md p-2 "></span>
            <input className="rounded-md p-2 text-right" type="number" />
            <select
              className="rounded-md p-2 text-right"
              name=""
              id=""
            ></select>
            <input className="rounded-md p-2 text-right" type="number" />
            <span className="rounded-md text-right"></span>
          </Fragment>
        )}
        <span className="col-start-5 text-right font-bold">รวม</span>
        <span className="col-start-6 text-right font-bold">
          {salesItemsInput
            .reduce((acc, sales) => {
              acc += sales.unitQuantity * sales.inventoryPricePerUnit;
              return acc;
            }, 0)
            .toLocaleString()}
        </span>
        <button
          type="submit"
          className="col-start-6 w-[100px] rounded-md bg-green-600 p-2 font-bold text-white"
        >
          ยืนยัน
        </button>
      </div>
    </>
  );
}
