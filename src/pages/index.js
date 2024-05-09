import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostLink from "../components/post-link"
import Triangle from "../components/triangle"
import newestFirst from "../utils/newest-first"

import "./index.css"

const IndexPage = ({
  data: {
    allMdx: { edges },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  // Group the posts by topic, with each topic sorted by recency of post.
  // Is it inefficient to sort the entire topic each time a single post is added? Yes.
  // Do I care, given that the slow stuff happens once, at build time? No.
  const postsByTopic = edges
    .map(e => e.node)
    .reduce((topics, n) => {
      const { topic } = n.frontmatter

      // nobody likes to evaluate `undefined.push(n)`
      topics[topic] = topics[topic] || []

      topics[topic].push(n)
      topics[topic].sort((a, b) => newestFirst(a, b))

      return topics
    }, {})

  // Order the topics by date of most recent post
  const Posts = Object.values(postsByTopic)
    .sort((a, b) => newestFirst(a[0], b[0]))
    .map(postList => {
      const { topic } = postList[0].frontmatter

      return (
        <div key={topic}>
          <h3>{topic}</h3>
          <div>
            {postList.map(node => (
              <PostLink key={node.id} post={node} />
            ))}
          </div>
        </div>
      )
    })

  // TODO: handle post volume in a sane way. There should be reasonable caps on category length and
  // number on the root page; there should be a separate blag/ index route with a comprehensive
  // list; and there should be a fuzzy search for specific posts (maybe just on posts index page).
  // Just by title? Title and category? Title, category, AND FULL TEXT???? That may be flying too
  // close to the sun.
  return (
    <Layout>
      <Seo title="Home" />
      <Triangle />
      <h2 className="subtitle">html &lt; thoughts &gt; browser</h2>
      {Posts}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            path
            topic
            title
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
