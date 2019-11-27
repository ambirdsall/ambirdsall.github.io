import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import PostLink from "../components/post-link"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  // TODO: group by category
  //       within each category, sort by date
  //       `new Date(/* something in past */) < new Date() === true`
  const Posts = edges
        .filter(edge => edge.node.frontmatter.published !== null)
        .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <Layout>
    <SEO title="Home" />

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
