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
import { useDebouncedCallback } from "use-debounce";
import { AccountReceivable } from "@prisma/client";
import SearchARDialog from "../dialog/search-ar-dialog";
import SearchARFromDBDDialog from "../dialog/search-from-dbd-dialog";
import { Company } from "@/api/searchFromVAT";
import CreateARDialog from "../dialog/create-ar-dialog";
import {
  CreateAR,
  createAR,
  searchAR,
  searchARByTaxID,
} from "@/api/ar/arController";

type Props = {
  type?: string;
  label?: string;
  name?: string;
  ar?: AccountReceivable;
};

const SearchARInput = ({ type = "text", label, name, ar }: Props) => {
  const [id, setId] = useState<number | undefined>(ar?.id);
  const [value, setValue] = useState(ar?.name || "");
  const [dialogType, setDialogType] = useState<
    "search-ar" | "create-ar" | "search-from-dbd"
  >("search-ar");
  const [open, setOpen] = useState(false);
  const [arList, setArList] = useState<AccountReceivable[]>([]);
  const [error, setError] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();
  const debouncedSearch = useDebouncedCallback(
    async (value) => {
      fetchAr(value);
    },
    1000
    // { leading: true }
  );

  const debounceBlur = useDebouncedCallback(async () => {
    if (
      document.getElementById("drop-down") &&
      document.getElementById("drop-down")?.contains(document.activeElement)
    ) {
      debounceBlur();
      return;
    }
    setIsFocus(false);
  }, 500);

  const fetchAr = async (value: string) => {
    if (!value) {
      const ars = await searchAR({});
      setArList(ars);
    }
    if (value) {
      const ars = await searchAR({ name: value });
      setArList(ars);
    }
  };

  const onOpen = (open: boolean) => {
    setOpen(open);
  };

  const onSelectARFromDropDown = (ar: AccountReceivable) => {
    setValue(ar.name);
    setId(ar.id);
    document.getElementsByName("date")[0]?.focus();
  };

  const onSelectARFromDialog = (ar: AccountReceivable) => {
    setValue(`${ar.name}`);
    setId(ar.id);
    document.getElementsByName("date")[0]?.focus();
    setError("");
  };

  const onSelectCompanyFromDialog = async (company: Company) => {
    setOpen(false);
    setSelectedCompany(company);
    const isExist = await searchARByTaxID(company.IDs13);
    if (!isExist) {
      setDialogType("create-ar");
      setOpen(true);
    }
  };

  const onCreateNewAr = () => {
    setSelectedCompany(undefined);
    setDialogType("create-ar");
    setOpen(true);
  };

  const onConfirmCreateAr = async (ar: CreateAR) => {
    setOpen(false);
    const result = await createAR(ar);
    setValue(result.name);
    setId(result.id);
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
    setDialogType("search-from-dbd");
    onOpen(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(open) => onOpen(open)}>
      <label htmlFor={name}>
        <span className="font-semibold">{label}</span>
        <div className="relative">
          <input
            hidden
            type="number"
            name={"ar-code"}
            value={id || 0}
            onChange={(e) => {
              setId(+e.target.value);
            }}
          />
          <input
            onKeyDown={handleSearchKeyDown}
            onBlur={(e) => {
              debounceBlur();
            }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              debouncedSearch(e.target.value);
            }}
            name={name}
            className="mt-1 w-full rounded-md p-3"
            type={type}
            onFocus={() => setIsFocus(true)}
          />
          <div
            id="drop-down"
            className={`absolute top-full z-10 w-full ${!isFocus && "hidden"}`}
          >
            <div className="z-1 mt-1 w-full rounded-md border-2 border-black bg-white">
              {arList.map((ar, index) => (
                <p
                  key={index}
                  className="cursor-pointer rounded-md hover:bg-cyan-100"
                  onClick={() => onSelectARFromDropDown(ar)}
                >
                  <button
                    type="button"
                    className="w-full p-2 text-left focus:bg-slate-200 focus:outline-none"
                    onFocusCapture={debounceBlur}
                    onBlur={() => debounceBlur()}
                  >
                    {ar.name}
                  </button>
                </p>
              ))}
              {arList.length !== 0 && (
                <p className="border-b-2 border-slate-300"></p>
              )}
              <p
                onClick={onCreateNewAr}
                className="cursor-pointer hover:bg-cyan-100"
              >
                <button
                  className="w-full p-2 text-left focus:bg-slate-200 focus:outline-none"
                  type="button"
                >
                  สร้างลูกค้าใหม่
                </button>
              </p>
              <p
                className="cursor-pointer rounded-bl-md hover:bg-cyan-100"
                onClick={onClickSearchFromDBD}
              >
                <button
                  className="w-full p-2 text-left focus:bg-slate-200 focus:outline-none"
                  type="button"
                >
                  ค้นหาจากกรมพัฒนาธุรกิจการค้า
                </button>
              </p>
            </div>
          </div>
        </div>
        {/* {error && <p className="text-red-600">{error}</p>}
        {!error && <p></p>} */}
      </label>
      {dialogType === "search-ar" && (
        <SearchARDialog onSelectAR={onSelectARFromDialog} open={open} />
      )}
      {dialogType === "search-from-dbd" && (
        <SearchARFromDBDDialog onSelectCompany={onSelectCompanyFromDialog} />
      )}
      {dialogType === "create-ar" && (
        <CreateARDialog
          onConfirm={onConfirmCreateAr}
          selectedCompany={selectedCompany}
        />
      )}
    </Dialog.Root>
  );
};

export default SearchARInput;
