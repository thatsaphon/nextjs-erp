"use client";

import React, {
  Fragment,
  useState,
  KeyboardEvent,
  FocusEventHandler,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import InputComponent from "./input-component";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { AccountReceivable } from "@prisma/client";
import SearchARDialog from "../dialog/search-ar-dialog";
import SearchARFromDBDDialog from "../dialog/search-from-dbd-dialog";

type Props = {
  type?: string;
  label?: string;
  name?: string;
};

const SearchARInput = ({ type = "text", label, name }: Props) => {
  const [value, setValue] = useState("");
  const [dialogType, setDialogType] = useState<
    "search-ar" | "create-ar" | "search-from-dbd"
  >("search-ar");
  const [open, setOpen] = useState(false);
  const [arList, setArList] = useState<AccountReceivable[]>([]);
  const [error, setError] = useState("");
  const [isFocus, SetIsFocus] = useState(false);
  const debouncedSearch = useDebouncedCallback(async (value) => {
    if (value.length > 3) searchAr(value);
  }, 500);

  const debounceBlur = useDebouncedCallback(async () => {
    SetIsFocus(false);
  }, 500);

  const searchAr = async (value: string) => {
    const res = await fetch(`/api/ar/${value}`, {
      next: { revalidate: 3600, tags: ["ar", value] },
    });
    setArList(await res.json());
  };

  const onOpen = (open: boolean) => {
    setOpen(open);
  };

  const onSelectAR = (ar: AccountReceivable) => {
    setValue(`${ar.name}`);
    setError("");
  };

  const onBlur = async (arInput: string) => {
    // if (!arInput) return setError("จำเป็นต้องเลือกลูกค้า");
    // const res = await fetch(`/api/ar/${arInput}`, {
    //   next: { revalidate: 3600, tags: ["ar", arInput] },
    // });
    // const ars = await res.json();
    // if (!ars.length) return setError("ไม่พบลูกค้า");
    // setValue(ars[0].name);
    // setError("");
  };

  async function handleSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "ฦ" || e.key === "?") && e.target instanceof Element) {
      e.preventDefault();
      setDialogType("search-ar");
      onOpen(true);
    }
  }

  async function onClickSearchFromDBD() {
    console.log("click");
    setDialogType("search-from-dbd");
    onOpen(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(open) => onOpen(open)}>
      <label htmlFor={name}>
        <span className="font-semibold">{label}</span>
        <div className="relative">
          <input
            onKeyDown={handleSearchKeyDown}
            onBlur={(e) => {
              debounceBlur();
              onBlur(e.target.value);
            }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              debouncedSearch(e.target.value);
            }}
            name={name}
            className="mt-1 w-full rounded-md p-3"
            type={type}
            onFocus={() => SetIsFocus(true)}
          />
          <div className={`absolute top-full w-full ${!isFocus && "hidden"}`}>
            <div className="z-1 mt-1 w-full rounded-md border-2 border-black bg-white">
              {arList.map((ar, index) => (
                <p
                  key={index}
                  className="cursor-pointer rounded-md p-2 hover:bg-cyan-100"
                >
                  <button>{ar.name}</button>
                </p>
              ))}
              {arList.length !== 0 && (
                <p className="border-b-2 border-slate-300"></p>
              )}
              <p className="cursor-pointer p-2 hover:bg-cyan-100">
                <button type="button">สร้างลูกค้าใหม่</button>
              </p>
              <p
                className="cursor-pointer rounded-bl-md p-2 hover:bg-cyan-100"
                onClick={onClickSearchFromDBD}
              >
                <button type="button">ค้นหาจากกรมพัฒนาธุรกิจการค้า</button>
              </p>
            </div>
          </div>
        </div>
        {/* {error && <p className="text-red-600">{error}</p>}
        {!error && <p></p>} */}
      </label>
      {dialogType === "search-ar" && <SearchARDialog onSelectAR={onSelectAR} />}
      {dialogType === "search-from-dbd" && <SearchARFromDBDDialog />}
      {/* <Dialog.Portal>
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
      </Dialog.Portal> */}
    </Dialog.Root>
  );
};

export default SearchARInput;
