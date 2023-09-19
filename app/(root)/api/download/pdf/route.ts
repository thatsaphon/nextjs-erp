import ejs from "ejs"
import { NextResponse } from "next/server"
// import puppeteer from "puppeteer"

type Props = {
  req: Request
  params: {}
}

export async function GET(req: Request) {
  return NextResponse.json({ data: "hello world" })
  // return (async () => {
  //   const browser = await puppeteer.launch({ headless: "new" })
  //   const page = await browser.newPage()
  //   const html = await ejs.renderFile(
  //     "./api/example.html.ejs",
  //     { body: "hello world" },
  //     { async: true }
  //   )
  //   // Replace 'example.html' with the path to your HTML file or a URL.
  //   await page.setContent(html)
  //   // You can customize the PDF output by modifying the options.
  //   const pdfOptions: PDFOptions = {
  //     path: "output.pdf", // Output file path
  //     format: "A4", // Page format
  //     printBackground: true, // Include background graphics
  //   }
  //   const pdf = await page.pdf(pdfOptions)
  //   await browser.close()
  //   return new Response(pdf, {
  //     headers: {
  //       "Content-type": "application/pdf",
  //       "Content-Disposition": "attachment",
  //     },
  //   })
  // })()
}
