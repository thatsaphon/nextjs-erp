import { Inventory, Price } from "@prisma/client";
import React, { useState, KeyboardEvent } from "react";

type Props = {
  handleClickSearchResult: (
    inventory: Inventory & {
      prices?: Price[];
    }
  ) => void;
  handleSearchResultKeyDown: (
    e: KeyboardEvent<HTMLButtonElement>,
    total: number,
    inventory: Inventory & { prices?: Price[] }
  ) => {};
  searchResult: (Inventory & { prices?: Price[] })[];
};

export default function InventorySearchInputComponent({
  handleClickSearchResult,
  handleSearchResultKeyDown,
  searchResult,
}: Props) {
  return (
    <div className="absolute flex h-[100px] w-full flex-col overflow-y-scroll bg-white">
      {searchResult.map((inventory, i) => (
        <button
          key={i}
          type="button"
          id={`search-${i}`}
          className="text-left"
          onClick={() => handleClickSearchResult(inventory)}
          onKeyDown={(e) =>
            handleSearchResultKeyDown(e, searchResult.length, inventory)
          }>
          {inventory.name}
        </button>
      ))}
    </div>
  );
}
