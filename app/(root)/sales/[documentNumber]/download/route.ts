import { prisma } from "@/lib/prisma";
import { jsPDF } from "jspdf";

export async function GET(
  request: Request,
  { params }: { params: { documentNumber: string } }
) {
  console.log(params);
  //   const transaction = await prisma.transaction.findFirst({
  //     where: { documentNumber: params.documentNumber },
  //   });

  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  const pdfBlob = doc.output("blob");
  return new Response(pdfBlob, {
    headers: {
      "Content-type": "application/pdf",
      "Content-Disposition": "attachment",
    },
  });
}
