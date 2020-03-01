import React, { useState } from "react"
import { useMutation } from "react-apollo-hooks"
import gql from "graphql-tag"
import { useRouter } from "next/router"

import LoginForm from "~components/loginForm"
import Layout from "~components/Layout"

type Props = {}

const SignInMutation = gql`
    mutation SignInMutation($email: String!, $password: String!) {
        signIn(email: $email, password: $$password) {
            user {
                id
                email
                displayName
            }
        }
    }
`

interface SignIn {
    user: {
        id: string
        email: string
        displayName: string
    }
}

type Form = EventTarget & {
    email: HTMLInputElement
    password: HTMLInputElement
}

function Login(props: Props) {
    const router = useRouter()
    const [signIn] = useMutation<{ signIn: SignIn }, { email: string; password: string }>(SignInMutation)
    const [errorMessages, setErrorMessages] = useState<Array<string>>()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const {
            email: { value: email },
            password: { value: password },
        } = event.target as Form
        return

        try {
            const { data } = await signIn({
                variables: {
                    email,
                    password,
                },
            })

            if (data.signIn.user) {
                router.push("/")
            }
        } catch (error) {
            // setErrorMessage(getErrorMessage(error))
        }
    }

    return (
        <Layout title="Login">
            <LoginForm handleSubmit={handleSubmit} errors={errorMessages}>
                <h1>Login Form</h1>
            </LoginForm>
        </Layout>
    )
}

export default Login
