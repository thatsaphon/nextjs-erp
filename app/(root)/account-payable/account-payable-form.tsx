"use client";

import { AccountPayable, AccountReceivable } from "@prisma/client";
import React, { useTransition } from "react";

type Props = {
  submit: (formData: FormData) => Promise<void>;
  ap?: AccountPayable;
};

export default function AccountPayableFormComponent({ submit, ap }: Props) {
  let [isPending, startTransition] = useTransition();
  return (
    <form className="flex h-full flex-col justify-between" action={submit}>
      <div className="mb-2 flex w-full flex-col items-end justify-between gap-2 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="name" className="ml-2 text-gray-700 ">
            ชื่อเจ้าหนี้
          </label>
          <input
            type="text"
            id="name"
            defaultValue={ap && ap.name}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="name"
            placeholder="ชื่อเจ้าหนี้"
          />
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col items-end justify-between gap-2 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="address" className="ml-2 text-gray-700 ">
            ที่อยู่
          </label>
          <input
            type="text"
            id="address"
            defaultValue={ap?.address || ""}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="address"
            placeholder="ที่อยู่"
          />
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col items-end justify-between gap-2 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="phone" className="ml-2 text-gray-700 ">
            โทร
          </label>
          <input
            type="text"
            id="phone"
            defaultValue={ap?.phone || ""}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="phone"
            placeholder="โทร"
          />
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col items-end justify-between gap-2 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="taxId" className="ml-2 text-gray-700 ">
            เลขผู้เสียภาษี
          </label>
          <input
            type="text"
            id="taxId"
            defaultValue={ap?.taxId || ""}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="taxId"
            placeholder="เลขผู้เสียภาษี"
          />
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col items-end justify-between gap-2 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="remark" className="ml-2 text-gray-700 ">
            หมายเหตุ
          </label>
          <input
            type="text"
            id="remark"
            defaultValue={ap?.remark || ""}
            className="h-12 w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            name="remark"
            placeholder="หมายเหตุ"
          />
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
  );
}
