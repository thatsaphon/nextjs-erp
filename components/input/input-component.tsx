import React from "react"

type Props = {
  children?: React.ReactNode
  type?: string
  label?: string
  name?: string
}

export default function InputComponent({
  children,
  type = "text",
  label,
  name,
}: Props) {
  if (children)
    return (
      <>
        {label && (
          <label htmlFor={name}>
            {label}
            <div>{children}</div>
          </label>
        )}
      </>
    )
  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label}
          <div>
            <input
              name={name}
              className="mt-1 w-full rounded-md p-3"
              type={type}
            />
          </div>
        </label>
      )}
      {!label && (
        <div>
          <input
            name={name}
            className="mt-1 w-full rounded-md p-3"
            type={type}
          />
        </div>
      )}
    </>
  )
}
