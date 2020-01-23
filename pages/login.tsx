import React from "react"

import Form from "~components/loginForm"
import Layout from "~components/layout"

type Props = {}

function Login(props: Props) {
    return (
        <Layout title="Login">
            <Form>
                <h1>Login Form</h1>
            </Form>
        </Layout>
    )
}

export default Login
