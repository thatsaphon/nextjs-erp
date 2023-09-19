"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editAccountPayable(
  formData: FormData,
  updatedId: number
) {
  const name = formData.get("name")?.toString();
  const address = formData.get("address")?.toString();
  const phone = formData.get("phone")?.toString();
  const taxId = formData.get("taxId")?.toString();
  const remark = formData.get("taxId")?.toString();

  if (!name) throw new Error("ชื่อไม่สามารถเว้นว่างได้");

  await prisma.accountPayable.update({
    where: { id: +updatedId },
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

  revalidatePath("/account-payable");
  redirect("/account-payable");
}
