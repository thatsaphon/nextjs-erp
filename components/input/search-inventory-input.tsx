"use client";

import {
  searchInventory,
  searchInventoryByCode,
} from "@/api/inventory/inventoryController";
import { InventoryPartialWithRelations } from "@/prisma/generated/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";
import React, { Fragment, useState, KeyboardEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

type Props = {
  type?: string;
  label?: string;
  name?: string;
  inventorySelected: (
    inventory: InventoryPartialWithRelations,
    barcode?: string
  ) => void;
};

export default function SearchInventoryInput({
  type = "text",
  label,
  name,
  inventorySelected,
}: Props) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [inventoryList, setInventoryList] = useState<
    InventoryPartialWithRelations[]
  >([]);
  const [error, setError] = useState("");
  const debounced = useDebouncedCallback(async (value) => {
    try {
      const inventories = await searchInventory(value);
      setInventoryList(inventories);
    } catch (err) {
      console.log(err);
    }
  }, 500);

  const onOpen = (open: boolean) => {
    setOpen(open);
    // searchInventory("");
  };

  const onSelectInventory = (inventory: InventoryPartialWithRelations) => {
    setValue("");
    setError("");
    inventorySelected(inventory);
  };

  const onBlur = async (barcode: string) => {
    if (!barcode) return setError("จำเป็นต้องเลือกสินค้า");
    const inventory = await searchInventoryByCode(barcode);
    if (!inventory) return setError("หาสินค้าไม่พบ");
    setValue("");
    setError("");
    inventorySelected(inventory, barcode);
  };

  async function handleSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "ฦ" || e.key === "?") && e.target instanceof Element) {
      e.preventDefault();
      onOpen(true);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(open) => onOpen(open)}>
      <label htmlFor={name} className="relative">
        {label}
        <div>
          <input
            onKeyDown={handleSearchKeyDown}
            onBlur={(e) => onBlur(e.target.value)}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name={name}
            className="w-full rounded-md p-2"
            type={type}
          />
        </div>
        {error && <p className="absolute top-full text-red-600">{error}</p>}
      </label>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            ค้นหาสินค้า
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
          {inventoryList.map((inventory, index) => (
            <Fragment key={index}>
              <Dialog.Close asChild>
                <button
                  className="grid w-full grid-cols-4 gap-1 rounded-md border-b-2 pl-8 text-left hover:cursor-pointer hover:bg-slate-200"
                  onClick={() => onSelectInventory(inventory)}
                >
                  <div className="p-2">
                    {inventory.prices.map(({ barcode }) => (
                      <p key={barcode}>{barcode}</p>
                    ))}
                  </div>
                  <div className="p-2">{inventory.name}</div>
                  <div className="p-2">
                    {inventory.prices.map(({ barcode, quantity, unit }) => (
                      <p key={barcode}>{`${unit} (${quantity})`}</p>
                    ))}
                  </div>
                  <div className="p-2">
                    {inventory.prices.map(({ barcode, price }) => (
                      <p key={price}>{price}</p>
                    ))}
                  </div>
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
    </Dialog.Root>
  );
}
