import React, { useState, useRef } from "react"

import "./form.module.css"
import TextField from "~components/textField"
import MessageSection from "~components/messages"

type Props = {
    children: React.ReactNode
    handleSubmit: (event: React.FormEvent<HTMLFormElement & HTMLDivElement>) => void
    errors: Array<string>
}

export default function Form({ children, handleSubmit }: Props) {
    const ErrorMessages: Map<string, Set<string>> = new Map()

    const [isEmailValid, setIsEmailValid] = useState(true)
    const emailRef = useRef(null)
    const validateEmail = (): void => {
        console.log("email", emailRef.current.value)
        setIsEmailValid(true)
    }

    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const passwordRef = useRef(null)
    const validatePassword = (): void => {
        console.log("password", passwordRef.current.value)
        setIsPasswordValid(false)
    }

    return (
        <div className="login-form" onSubmit={handleSubmit}>
            {children}
            <MessageSection messages={ErrorMessages} messageType="error" />
            <form action="post">
                <div>
                    <TextField
                        isValid={isEmailValid}
                        ref={emailRef}
                        focusOnRender
                        type="email"
                        id="email"
                        label="Email"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <TextField
                        isValid={isPasswordValid}
                        type="password"
                        id="password"
                        label="Password"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <button type={"submit"}>Submit</button>
                </div>
            </form>
        </div>
    )
}
