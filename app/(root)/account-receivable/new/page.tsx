import Link from "next/link"
import React from "react"
import AccountReceivableFormComponent from "../account-receivable-form"
import { createAccountReceivable } from "./action"

type Props = {}

export default function NewAccountReceivablePage({}: Props) {
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/account-receivable"}>{`<`} ย้อนกลับ</Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <AccountReceivableFormComponent
          submit={async (data) => {
            "use server"
            await createAccountReceivable(data)
          }}
        />
      </div>
    </>
  )
}
