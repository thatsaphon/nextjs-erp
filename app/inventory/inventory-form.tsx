"use client";

import { Inventory, Price } from "@prisma/client";
import React, { useState, useTransition } from "react";

type Props = {
  submit: (formData: FormData) => Promise<void>;
  inventory?: Inventory & { prices: Price[] };
};

export default function InventoryFormComponent({ submit, inventory }: Props) {
  let [isPending, startTransition] = useTransition();
  const [priceCount, setPriceCount] = useState(
    (inventory && inventory?.prices.length - 1) || 0
  );
  const deleteItem = () => {
    setPriceCount((prev) => prev - 1);
  };
  const mainPrice = inventory?.prices.find(
    ({ barcode }) => inventory.code === barcode
  );
  const otherPrices = inventory?.prices.filter(
    ({ barcode }) => inventory.code !== barcode
  );
  console.log(otherPrices);
  console.log(priceCount);

  return (
    <form
      className="flex h-full flex-col justify-between"
      action={(data) => {
        startTransition(async () => {
          await submit(data);
        });
      }}>
      <div className="mb-2 flex w-full flex-col items-end justify-between gap-2 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="code" className="ml-2 text-gray-700 ">
            รหัสสินค้า
          </label>
          <input
            type="text"
            id="code"
            defaultValue={inventory?.code}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="code"
            placeholder="รหัสสินค้า"
          />
        </div>
        <div className="relative flex-1">
          <label htmlFor="name" className="ml-2 text-gray-700 ">
            ชื่อสินค้า
          </label>
          <input
            type="text"
            id="name"
            defaultValue={inventory?.name}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="name"
            placeholder="ชื่อสินค้า"
          />
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col justify-between gap-2 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="barcode" className="ml-2 text-gray-700 ">
            รหัสขาย
          </label>
          <input
            type="text"
            disabled
            id="barcode"
            defaultValue={mainPrice?.barcode}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-300"
            name="prices[0]"
            placeholder="Default Value"
          />
        </div>
        <div className="relative flex-1">
          <label htmlFor="quantity" className="ml-2 text-gray-700 ">
            จำนวน
          </label>
          <input
            type="number"
            id="quantity"
            defaultValue={mainPrice?.quantity}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="prices[0]"
            placeholder="จำนวน"
          />
        </div>
        <div className="relative flex-1">
          <label htmlFor="unit" className="ml-2 text-gray-700 ">
            หน่วย
          </label>
          <input
            type="text"
            id="unit"
            defaultValue={mainPrice?.unit}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="prices[0]"
            placeholder="หน่วย"
          />
        </div>
        <div className="relative flex-1">
          <label htmlFor="price" className="ml-2 text-gray-700 ">
            ราคา
          </label>
          <input
            type="number"
            id="price"
            defaultValue={mainPrice?.price}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="prices[0]"
            placeholder="ราคา"
          />
        </div>
        <div className="relative w-[24px]"></div>
      </div>

      {Array.from(Array(priceCount).keys()).map((i) => (
        <div
          key={i + 1}
          className="mb-2 flex w-full flex-col justify-between gap-2 lg:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              id="barcode"
              defaultValue={
                otherPrices && otherPrices[i] && otherPrices[i].barcode
              }
              className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              name={`prices[${i + 1}]`}
              placeholder="รหัสขาย"
            />
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              id="quantity"
              defaultValue={
                otherPrices && otherPrices[i] && otherPrices[i].quantity
              }
              className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              name={`prices[${i + 1}]`}
              placeholder="จำนวน"
            />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              id="unit"
              defaultValue={
                otherPrices && otherPrices[i] && otherPrices[i].unit
              }
              className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              name={`prices[${i + 1}]`}
              placeholder="หน่วย"
            />
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              id="price"
              defaultValue={
                otherPrices && otherPrices[i] && otherPrices[i].price
              }
              className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              name={`prices[${i + 1}]`}
              placeholder="ราคา"
            />
          </div>
          <button
            type="button"
            onClick={() => deleteItem()}
            className="w-[24px]">
            DEL
          </button>
        </div>
      ))}
      <div className="mr-3 flex justify-center">
        <button
          type="button"
          onClick={() => setPriceCount((prev) => prev + 1)}
          className="rounded-lg  bg-indigo-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 ">
          Add
        </button>
      </div>
      <div className="mr-3 flex justify-end">
        <button
          type="submit"
          className="rounded-lg  bg-indigo-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 ">
          ยืนยัน
        </button>
      </div>
    </form>
  );
}
