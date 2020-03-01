import React, { useEffect, forwardRef } from "react"

import "./input.module.css"

type Props = {
    type: "text" | "password" | "email"
    id: string
    label: string
    isValid?: boolean
    focusOnRender?: boolean
    placeholder?: string
    name?: string | false
}

const Input = forwardRef((props: Props, ref?: React.MutableRefObject<any>) => {
    const { type, id, label, isValid = true, placeholder = "", name = false, focusOnRender = false } = props

    const elementName = name || id
    const errorCSS = isValid ? "" : " error"

    useEffect(() => {
        focusOnRender && ref.current.focus()
    }, [])

    return (
        <label className={`react-input${errorCSS}`} htmlFor={elementName}>
            {label}

            <input
                className={`react-input${errorCSS}`}
                name={elementName}
                id={id}
                ref={ref}
                type={type}
                placeholder={placeholder}
            />
        </label>
    )
})

export default Input
