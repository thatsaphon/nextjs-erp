import Link from "next/link";
import React from "react";

type Props = {};

export default function NewSalesPage({}: Props) {
  return (
    <>
      <div className="ml-4 mt-4">
        <Link href={"/sales"}>
          <button className="rounded-md bg-slate-700 p-2 text-slate-100">
            ย้อนกลับ
          </button>
        </Link>
      </div>
      <div className="m-2 mx-auto h-full w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <form className="flex h-full flex-col justify-between" action="">
          <div className="flex w-full flex-col justify-between gap-2 lg:flex-row">
            <div className="relative flex-1">
              <label htmlFor="ar" className="text-gray-700">
                ลูกค้า
              </label>
              <input
                type="text"
                id="ar"
                className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                name="ar"
                placeholder="ลูกค้า"
              />
            </div>
            <div className="relative flex-1">
              <label htmlFor="date" className="text-gray-700">
                วันที่
              </label>
              <input
                type="date"
                id="date"
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
      </div>
    </>
  );
}
