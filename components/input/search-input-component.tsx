"use client"
import React, { ChangeEvent, useState, KeyboardEvent } from "react"
import InputComponent from "./input-component"
import { useDebounce, useDebouncedCallback } from "use-debounce"
import next from "next/types"

type Props = {
  type?: string
  label?: string
  name?: string
}

export default function SearchInputComponent({
  type = "text",
  label,
  name,
}: Props) {
  const [value, setValue] = useState("")
  const [debouncedValue] = useDebounce(value, 500)
  const debounced = useDebouncedCallback(
    // function
    async (value) => {
      // console.log(value)
      await fetch(`/api/ar/${value}`, {
        next: { revalidate: 3600, tags: ["ar", value] },
      })
      setValue(value)
    },
    // delay in ms
    500
  )

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setValue(e.target.value)
  }

  async function handleSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    console.log(e)
    if ((e.key === "ฦ" || e.code === "?") && e.target instanceof Element) {
      e.preventDefault()

      //   const inventories = await searchInventories(e.target.value)
      //   setSearchResult(inventories)
      //   setTimeout(() => {
      //     document.getElementById(`search-0`)?.focus()
      //   }, 100)
    }
  }

  return (
    <InputComponent type={type} label={label}>
      <input
        type="text"
        className="mt-1 w-full rounded-md p-3"
        onChange={(e) => debounced(e.target.value)}
        onKeyDown={handleSearchKeyDown}
      />
      <input type="text" hidden name={name} />
    </InputComponent>
  )
}
