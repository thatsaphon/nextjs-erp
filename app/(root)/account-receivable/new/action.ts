"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createAccountReceivable(formData: FormData) {
  const name = formData.get("name")?.toString();
  const address = formData.get("address")?.toString();
  const phone = formData.get("phone")?.toString();
  const taxId = formData.get("taxId")?.toString();
  const remark = formData.get("taxId")?.toString();

  if (!name) throw new Error("ชื่อไม่สามารถเว้นว่างได้");

  await prisma.accountReceivable.create({
    data: {
      name,
      address,
      phone,
      taxId,
      remark,
      createdDate: new Date(),
      updatedDate: new Date(),
    },
  });

  redirect("/account-receivable");
}
