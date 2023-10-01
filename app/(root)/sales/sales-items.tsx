"use client";
import SearchInventoryInput from "@/components/input/search-inventory-input";
import { Inventory, Price } from "@prisma/client";
import React, { Fragment, useState } from "react";

type SalesItems = {
  code: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  option: { code: string; unit: string; pricePerUnit: number }[];
};

type InventoryPrices = Inventory & { prices: Price[] };

type Props = {
  salesItems?: SalesItems[];
};

export default function SalesItemsComponent({ salesItems = [] }: Props) {
  const [salesItemsInput, setSalesItemsInput] = useState(salesItems);
  const [showLastItem, setShowLastItem] = useState(true);
  return (
    <>
      <div className="mt-5 grid grid-cols-[1fr_2fr_repeat(4,100px)] gap-3 p-2">
        <div className="font-semibold">รหัสสินค้า</div>
        <div className="font-semibold">ชื่อสินค้า</div>
        <div className="text-right font-semibold">จำนวน</div>
        <div className="text-right font-semibold">หน่วย</div>
        <div className="text-right font-semibold">ราคาต่อหน่วย</div>
        <div className="text-right font-semibold">ราคารวม</div>
        {salesItemsInput.map((sales, index) => (
          <Fragment key={index}>
            {/* <input
              className="rounded-md p-2 "
              type="text"
              defaultValue={sales.code}
            /> */}
            <select
              className="rounded-md p-2 text-right"
              name=""
              id=""
              defaultValue={sales.code}
            >
              {sales.option.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.code}
                </option>
              ))}
            </select>
            <span className="rounded-md p-2 ">{sales.name}</span>
            <input
              className="rounded-md p-2 text-right"
              type="number"
              defaultValue={sales.quantity}
            />
            <select
              className="rounded-md p-2 text-right"
              name=""
              id=""
              defaultValue={sales.unit}
            >
              {sales.option.map((option) => (
                <option key={option.unit} value={option.unit}>
                  {option.unit}
                </option>
              ))}
            </select>
            <input
              className="rounded-md p-2 text-right"
              type="number"
              defaultValue={sales.pricePerUnit}
            />
            <span className="rounded-md text-right">
              {(sales.pricePerUnit * sales.quantity).toLocaleString()}
            </span>
          </Fragment>
        ))}
        {showLastItem && (
          <Fragment>
            <SearchInventoryInput
              inventorySelected={(inventoryPrices) => {
                const newSalesItemsInput = [
                  ...salesItemsInput,
                  {
                    code: inventoryPrices.prices[0].barcode,
                    name: inventoryPrices.name,
                    quantity: 1,
                    unit: inventoryPrices.prices[0].unit,
                    pricePerUnit: inventoryPrices.prices[0].price,
                    totalPrice: inventoryPrices.prices[0].price,
                    option: inventoryPrices.prices.map(
                      ({ barcode, unit, price }) => ({
                        code: barcode,
                        unit: unit,
                        pricePerUnit: price,
                      })
                    ),
                  },
                ];
                setSalesItemsInput(newSalesItemsInput);
              }}
            />
            <span className="rounded-md p-2 ">test</span>
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
        <Fragment>
          <span className="col-start-6 text-right">
            {salesItemsInput
              .reduce((acc, sales) => {
                acc += sales.totalPrice;
                return acc;
              }, 0)
              .toLocaleString()}
          </span>
        </Fragment>
      </div>
    </>
  );
}
