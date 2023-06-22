import React from "react";
import AccountPayableFormComponent from "../account-payable-form";
import Link from "next/link";
import { editAccountPayable } from "./action";
import { prisma } from "@/lib/prisma";

type Props = { params: { id: number } };

export default async function AccountPayableDetailPage({ params }: Props) {
  const ap = await prisma.accountPayable.findFirst({
    where: { id: +params.id },
  });
  if (!ap) return <>Not Found</>;
  return (
    <>
      <div className="mx-auto mt-4 flex w-full max-w-6xl justify-end">
        <Link href={"/account-payable"}>{`<`} ย้อนกลับ</Link>
      </div>
      <div className="m-2 mx-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3">
        <AccountPayableFormComponent
          ap={ap}
          submit={async (data) => {
            "use server";
            await editAccountPayable(data, params.id);
          }}
        />
      </div>
    </>
  );
}
