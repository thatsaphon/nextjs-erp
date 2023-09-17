import React from "react"

// type Props = { params: Record<string,any> };

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
    // <div className="flex h-full w-full">
    //   <div className="h-full w-48 bg-slate-200 p-2">
    //     <ul className="flex flex-col items-center p-2"></ul>
    //   </div>
    //   <div className="w-full">{children}</div>
    // </div>
  )
}
