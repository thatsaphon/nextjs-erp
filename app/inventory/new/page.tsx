"use client";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { createInventory } from "./action";
import { useRouter } from "next/navigation";

type Props = {};

export default function NewInventory({}: Props) {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const [priceCount, setPriceCount] = useState(0);
  const deleteItem = () => {
    setPriceCount((prev) => prev - 1);
  };

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
        <form
          className="flex h-full flex-col justify-between"
          action={(data) => {
            startTransition(async () => {
              const res = await createInventory(data);
              router.push(`/inventory/${res.code}`);
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
                  className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  name={`prices[${i + 1}]`}
                  placeholder="รหัสขาย"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  id="quantity"
                  className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  name={`prices[${i + 1}]`}
                  placeholder="จำนวน"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  id="unit"
                  className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  name={`prices[${i + 1}]`}
                  placeholder="หน่วย"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  id="price"
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
      </div>
    </>
  );
}
