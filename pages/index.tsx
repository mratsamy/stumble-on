import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import Layout from "~components/Layout"
import { withApollo } from "~lib/apollo"

const HELLO_QUERY = gql`
    query HelloQuery {
        sayHello
    }
`

const Home = () => {
    const { data, loading, error } = useQuery(HELLO_QUERY)

    console.log(data)

    return (
        <Layout title="Home">
            <div className="hero">
                <h1 className="title">Level up your life!</h1>
            </div>

            <style jsx>{`
                .hero {
                    width: 100%;
                    color: #333;
                }
                .title {
                    text-align: center;
                    margin: 0;
                    width: 100%;
                    padding-top: 80px;
                    line-height: 1.15;
                    font-size: 48px;
                }
            `}</style>
        </Layout>
    )
}

export default withApollo(Home)
