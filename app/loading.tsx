import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <>
      <div className="p-4"></div>
      <div className="m-2 mx-auto h-auto min-h-[500px] w-full max-w-4xl rounded-lg bg-slate-200 p-3"></div>
    </>
  );
}
