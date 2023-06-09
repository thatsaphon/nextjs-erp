"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createInventory(formData: FormData) {
  let code = formData.get("code");
  if (!code) throw new Error("no code");
  let name = formData.get("name");
  if (!name) throw new Error("no name");

  let prices = [];
  let i = 0;
  while (1) {
    let [barcode, quantity, unit, price] = formData.getAll(`prices[${i}]`);
    if (i === 0) {
      [quantity, unit, price] = formData.getAll(`prices[${i}]`);
      barcode = code;
    }
    if (barcode === "" && quantity === "" && unit === "" && price === "")
      throw new Error(`ใส่ราคาช่องที่ ${i + 1} ไม่ครบ`);
    if (!(barcode || quantity || unit || price)) break;
    if (!(barcode && quantity && unit && +price.toString() >= 0))
      throw new Error(`ใส่ราคาช่องที่ ${i + 1} ไม่ครบ`);
    let objPrice = {
      barcode: barcode.toString(),
      quantity: +quantity.toString(),
      unit: unit.toString(),
      price: +price.toString(),
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    prices.push(objPrice);
    i++;
  }

  const result = await prisma.inventory.create({
    data: {
      code: code.toString(),
      name: name.toString(),
      createdDate: new Date(),
      updatedDate: new Date(),
      prices: {
        createMany: {
          data: prices,
        },
      },
    },
  });
  redirect(`/inventory`);
}
