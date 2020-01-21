import React from "react"
import Head from "next/head"

import Nav from "~components/layout/nav"

type Props = {
    title?: string
    children: React.ReactNode
}

const Layout = ({ title, children }: Props) => {
    return (
        <div>
            <Head>
                <title>Stumble On{title.length ? ` | ${title}` : ""}</title>
                <link rel="icon" href="favicon.ico" />
            </Head>
            <Nav />
            <div>{children}</div>
        </div>
    )
}

Layout.defaultProps = {
    title: "",
} as Partial<Props>

export default Layout
