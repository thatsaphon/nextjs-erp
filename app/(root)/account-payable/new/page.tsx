import Link from "next/link"
import React from "react"
import { createAccountPayable } from "./action"
import AccountPayableFormComponent from "../account-payable-form"

type Props = {}

export default function NewAccountPayablePage({}: Props) {
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/account-payable"}>{`<`} ย้อนกลับ</Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <AccountPayableFormComponent
          submit={async (data) => {
            "use server"
            await createAccountPayable(data)
          }}
        />
      </div>
    </>
  )
}
