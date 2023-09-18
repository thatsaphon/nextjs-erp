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
        <div>
          {label && (
            <label htmlFor={name}>
              {label}
              <div>{children}</div>
            </label>
          )}
        </div>
      </>
    )
  return (
    <>
      <div>
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
      </div>
    </>
  )
}
