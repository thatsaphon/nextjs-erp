// import ejs from "ejs"
// import puppeteer from "puppeteer"

// type Props = {
//   req: Request
//   params: {}
// }

// export default function GET({ req, params }: Props) {
//   return (async () => {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     const html = await ejs.renderFile(
//       "./api/example.html.ejs",
//       { body: "hello world" },
//       { async: true }
//     )

//     // Replace 'example.html' with the path to your HTML file or a URL.
//     await page.setContent(html)

//     // You can customize the PDF output by modifying the options.
//     const pdfOptions: PDFOptions = {
//       path: "output.pdf", // Output file path
//       format: "A4", // Page format
//       printBackground: true, // Include background graphics
//     }

//     const pdf = await page.pdf(pdfOptions)
//     await browser.close()
//     return new Response("test", {
//       headers: {
//         "Content-type": "application/pdf",
//         "Content-Disposition": "attachment",
//       },
//     })
//   })()
// }
