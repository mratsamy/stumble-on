import React, { useRef } from "react"

import "./input.module.css"

type Props = {
    type: "text" | "password" | "email"
    id: string
    label: string
    placeholder?: string
    ref?: React.MutableRefObject<any>
    name?: string | false
}

export default function Input(props: Props): React.FunctionComponentElement<Props> {
    const { type, ref = useRef(null), id, label, placeholder = "", name = false } = props

    const elementName = name || id

    return (
        <React.Fragment>
            <label className={"react-input-label"} htmlFor={elementName}>
                {label}
            </label>
            <input
                className={"react-input-input"}
                name={elementName}
                id={id}
                ref={ref}
                type={type}
                placeholder={placeholder}
            />
        </React.Fragment>
    )
}
