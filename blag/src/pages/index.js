import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Section, Aside } from "../utils/text"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <Section>this is a Demo section</Section>
    <p>
      Welcome to this here site<Aside>it's trying really hard to be be a good site</Aside>.
    </p>

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
