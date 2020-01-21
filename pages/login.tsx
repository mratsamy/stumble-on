import React from "react"

import Layout from "~components/layout"
import Form from "~components/form/form"

type Props = {}

function Login(props: Props) {
    return (
        <Layout title={"Login"}>
            <Form />
        </Layout>
    )
}

export default Login
