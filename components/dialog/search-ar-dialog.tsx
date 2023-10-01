"use client";

import { AccountReceivable } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { Fragment, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  onSelectAR: (ar: AccountReceivable) => void;
};

export default function SearchARDialog({ onSelectAR }: Props) {
  const [arList, setArList] = useState<AccountReceivable[]>([]);

  const searchAr = async (value: string) => {
    const res = await fetch(`/api/ar/${value}`, {
      next: { revalidate: 3600, tags: ["ar", value] },
    });
    setArList(await res.json());
  };

  useEffect(() => {
    searchAr("");
  }, []);

  const debounced = useDebouncedCallback(async (value) => {
    searchAr(value);
  }, 500);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          ค้นหาลูกหนี้
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal"></Dialog.Description>
        <div className="relative">
          <input
            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] pl-8 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="name"
            onChange={(e) => {
              debounced(e.target.value);
            }}
          />
          <MagnifyingGlassIcon className="absolute left-1 top-1 h-6 w-6" />
        </div>
        {arList.map((ar, index) => (
          <Fragment key={index}>
            <Dialog.Close asChild>
              <button
                className="grid w-full grid-cols-2 gap-1 rounded-md border-b-2 pl-8 text-left hover:cursor-pointer hover:bg-slate-200"
                onClick={() => onSelectAR(ar)}
              >
                <div className="p-2">{ar.name}</div>
                <div className="p-2">{ar.remark}</div>
              </button>
            </Dialog.Close>
          </Fragment>
        ))}
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
