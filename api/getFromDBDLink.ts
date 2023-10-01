"use server";

let cookie = "";
export const getFromDBDLink = async (link: string) => {
  const res = await fetch(`https://datawarehouse.dbd.go.th/${link}`, {
    headers: {
      Cookie: cookie,
    },
  });
  cookie = res.headers.getSetCookie()[0];
  let data = await res.text();
  if (!data.includes(`let profile = "\\/profile\\/tab1`)) {
    const res = await fetch(`https://datawarehouse.dbd.go.th/${link}`, {
      headers: {
        Cookie: cookie,
      },
    });
    data = await res.text();
  }

  if (!data.includes(`let profile = "\\/profile\\/tab1`))
    return { error: "Not Found" };
  let linkVariableIndex = data.indexOf(`let profile = "\\/profile\\/tab1`);
  let newLink = data
    .slice(linkVariableIndex)
    .split('"')[1]
    .replaceAll("\\", "");

  const anotherRes = await fetch(`https://datawarehouse.dbd.go.th/${newLink}`, {
    headers: {
      Cookie: cookie,
    },
  });
  let anotherData = await anotherRes.text();

  //   return anotherRes.text();

  const taxId = anotherData.split("เลขทะเบียนนิติบุคคล: ")[1].slice(0, 13);
  const res2 = await fetch(
    `https://dataapi.moc.go.th/juristic?juristic_id=${taxId}`
  );
  return res2.json();
};
