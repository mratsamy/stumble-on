import React, { useRef, useEffect } from "react"

import "~components/form/form.module.css"

type Props = {}

export default function Form(props: Props) {
    const emailRef = useRef(null)

    // Set focus to email field on load
    useEffect(() => {
        emailRef.current.focus()
    }, [])

    return (
        <div className="login-form">
            <form action="post">
                <label htmlFor="email"></label>
                <input id="email" name="email" type="email" placeholder="Email" ref={emailRef} />
                <br />I am the form
                <p>test</p>
                Login Screen
            </form>
        </div>
    )
}
