import React from "react"
import Head from "next/head"

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
            <div>{children}</div>
        </div>
    )
}

Layout.defaultProps = {
    title: "",
} as Partial<Props>

export default Layout
export { default as Nav } from "~components/layout/nav"
