"use client";

import { AccountReceivable } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState, KeyboardEvent } from "react";

type Props = { ars: AccountReceivable[] };

export default function SalesFormComponent({ ars }: Props) {
  const [searchBox, setSearchBox] = useState("");
  const [selectedAr, setSelectedAr] = useState<AccountReceivable | null>();

  function keyDown(e: KeyboardEvent<HTMLButtonElement>, total: number) {
    if (e.code === "ArrowUp" && e.target instanceof Element) {
      if (e.target.id === "ar-0") return;
      document.getElementById(`ar-${+e.target.id.split("-")[1] + -1}`)?.focus();
    }
    if (e.code === "ArrowDown" && e.target instanceof Element) {
      if (e.target.id === `ar-${total - 1}`) return;
      document.getElementById(`ar-${+e.target.id.split("-")[1] + 1}`)?.focus();
    }
  }

  return (
    <>
      <form className="flex h-full flex-col justify-between" action="">
        <div className="flex w-full flex-col justify-between gap-2 lg:flex-row">
          <div className="relative flex-1">
            <label htmlFor="ar" className="text-gray-700">
              ลูกค้า
            </label>
            {!selectedAr && (
              <input
                type="text"
                id="ar"
                className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                name="ar"
                placeholder="ลูกค้า"
              />
            )}
            {!selectedAr && (
              <div className="absolute min-h-[200px] w-full overflow-scroll bg-white">
                {ars.map((ar, i) => (
                  <button
                    key={i}
                    id={`ar-${i}`}
                    onClick={() => setSelectedAr(ar)}
                    type="button"
                    onKeyDown={(e) => keyDown(e, ars.length)}
                    className="w-full p-2 text-left hover:bg-slate-200 focus:bg-slate-200 focus:outline-none">
                    {ar.name}
                  </button>
                ))}
              </div>
            )}
            {selectedAr && (
              <div className="p-2 font-semibold">
                {selectedAr.name}
                <span
                  className="ml-2 cursor-pointer text-blue-500 underline"
                  onClick={() => setSelectedAr(null)}>
                  เปลี่ยน
                </span>
              </div>
            )}
          </div>
          <div className="relative flex-1">
            <label htmlFor="date" className="text-gray-700">
              วันที่
            </label>
            {/* {console.log(
              new Date(new Date().getTime() + 420 * 60000).toISOString().slice(0,10)
            )} */}
            <input
              type="date"
              id="date"
              defaultValue={dayjs().format("YYYY-MM-DD")}
              className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              name="date"
              placeholder="วันที่"
            />
          </div>
        </div>
        <div className="mt-2 flex w-full flex-1 justify-between gap-2">
          <div className="flex-1 rounded-md bg-white"></div>
        </div>
        <div className="mr-3 flex justify-end">
          <button
            type="button"
            className="rounded-lg  bg-indigo-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 ">
            ยืนยัน
          </button>
        </div>
      </form>
    </>
  );
}
