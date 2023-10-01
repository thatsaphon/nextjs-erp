"use server";
let cookie = "";
export const searchFromDBD = async (search: string) => {
  try {
    let res = await fetch(`https://datawarehouse.dbd.go.th/suggestions`, {
      method: "POST",
      body: JSON.stringify({
        data: search,
      }),
      headers: {
        Cookie: cookie,
      },
    });
    cookie = res.headers.getSetCookie()[0];
    let data = await res.text();
    if (data.trim() === "") return { data: [] };
    if (!data.startsWith("<li>")) {
      res = await fetch(`https://datawarehouse.dbd.go.th/suggestions`, {
        method: "POST",
        body: JSON.stringify({
          data: search,
        }),
        headers: {
          Cookie: cookie,
        },
      });
      data = await res.text();
    }
    if (data.trim() === "") return { data: [] };

    let dataSplit = data.split(":");
    let companies: { id: string; name: string; link: string }[] = [];
    if (dataSplit.length !== 1) {
      for (let i = 0; i < dataSplit.length; i++) {
        if (i % 2 === 0) {
          // 0723535000967
          companies.push({
            id: dataSplit[i].slice(-13),
            name: "",
            link: dataSplit[i].split('<a href="')[1].split('"')[0],
          });
        }
        if (i % 2 === 1) {
          companies[(i - 1) / 2].name = dataSplit[i].trim().split("</span>")[0];
        }
      }
    } else {
      dataSplit = data.split('<a href="');
      for (let i = 1; i < dataSplit.length; i++) {
        const link = dataSplit[i].split('"')[0];
        const name = dataSplit[i]
          .split('"')[1]
          .split("<span>")[1]
          .split("</span>")[0];
        companies.push({
          id: "",
          name: name,
          link,
        });
      }
    }
    return { data: companies };
  } catch (err) {
    return { data: [], error: "error" };
  }
};

// import React from 'react'

// type Props = {}

// function searchFromDBD({}: Props) {
//   return (
//     <div>searchFromDBD</div>
//   )
// }

// export default searchFromDBD
