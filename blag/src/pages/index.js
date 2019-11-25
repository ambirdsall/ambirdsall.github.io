import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import PostLink from "../components/post-link"
import { Section, Aside } from "../utils/text"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
        .filter(edge => edge.node.frontmatter.published !== null)
        .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <Section>this is a Demo section</Section>
    <p>
      Welcome to this here site<Aside>it's trying really hard to be be a good site</Aside>.
    </p>

    {Posts}

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
 }

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }
`
