import React from "react"
import AccountReceivableFormComponent from "../../(root)/account-receivable/account-receivable-form"
import Link from "next/link"
import { editAccountReceivable } from "./action"
import { prisma } from "@/lib/prisma"

type Props = { params: { id: number } }

export default async function AccountReceivableDetailPage({ params }: Props) {
  const ar = await prisma.accountReceivable.findFirst({
    where: { id: +params.id },
  })
  if (!ar) return <>Not Found</>
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/account-receivable"}>{`<`} ย้อนกลับ</Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <AccountReceivableFormComponent
          ar={ar}
          submit={async (data) => {
            "use server"
            await editAccountReceivable(data, params.id)
          }}
        />
      </div>
    </>
  )
}
