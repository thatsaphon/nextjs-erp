"use client";

import { CreateAR, createAR, searchAR } from "@/api/ar/arController";
import { Company } from "@/api/searchFromVAT";
import { AccountReceivable } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { Fragment, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  onConfirm: (ar: CreateAR) => void;
  selectedCompany?: Company;
};

export default function CreateARDialog({ onConfirm, selectedCompany }: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            console.log(data.get("address"));
            const name = data.get("name")?.toString();
            const address = data.get("address")?.toString();
            const phone = data.get("phone")?.toString();
            const taxId = data.get("taxId")?.toString();
            const remark = data.get("remark")?.toString();
            onConfirm({
              name: name ?? "",
              address: address ?? "",
              phone: phone ?? "",
              taxId: taxId ?? "",
              remark: remark ?? "",
            });
          }}
        >
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            สร้างลูกค้า
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal"></Dialog.Description>

          <div>
            <label htmlFor="name">
              ชื่อ
              <input
                type="text"
                className="my-1 w-full rounded-md border-2 border-black p-3"
                name="name"
                defaultValue={
                  selectedCompany
                    ? `${selectedCompany?.titleName} ${selectedCompany?.Name}`
                    : ""
                }
              />
            </label>
            <label htmlFor="address">
              ที่อยู่
              <input
                type="text"
                className="my-1 w-full rounded-md border-2 border-black p-3"
                name="address"
                defaultValue={selectedCompany?.Address}
              />
            </label>
            <label htmlFor="">
              เลขประจำตัวผู้เสียภาษี
              <input
                type="text"
                className="my-1 w-full rounded-md border-2 border-black p-3"
                name="taxId"
                defaultValue={selectedCompany?.Id13}
              />
            </label>
            <label htmlFor="phone">
              โทร
              <input
                type="text"
                className="my-1 w-full rounded-md border-2 border-black p-3"
                name="phone"
              />
            </label>
            <label htmlFor="remark">
              หมายเหตุ
              <input
                type="text"
                className="my-1 w-full rounded-md border-2 border-black p-3"
                name="remark"
              />
            </label>
          </div>

          <div className="mt-[25px] flex justify-end">
            <button
              type="submit"
              className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Save changes
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
