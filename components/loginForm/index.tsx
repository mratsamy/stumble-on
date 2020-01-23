import React, { useState, useRef } from "react"

import "./form.module.css"
import TextField from "~components/textField"
import MessageSection from "~components/messages"

export default function Form({ children }) {
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

    const handleSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
        event.preventDefault()

        validatePassword()
        validateEmail()
    }

    return (
        <div className="login-form" onSubmit={handleSubmit}>
            {children}
            <MessageSection messages={ErrorMessages} messageType="error" />
            <form action="post">
                <TextField
                    isValid={isEmailValid}
                    ref={emailRef}
                    focusOnRender
                    type="email"
                    id="email"
                    label="Email"
                    placeholder="Email"
                />
                <br />
                <TextField
                    isValid={isPasswordValid}
                    ref={passwordRef}
                    type="password"
                    id="password"
                    label="Password"
                    placeholder="Password"
                />
                <br />
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
}
