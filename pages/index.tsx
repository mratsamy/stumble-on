import React from "react"

import Layout from "~components/Layout"

const Home = () => {
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

export default Home
