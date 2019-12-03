import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Legend from "../components/year-color-legend"
import SEO from "../components/seo"
import PostLink from "../components/post-link"
import Triangle from "../components/triangle"
import newestFirst from "../utils/newest-first"

import "./index.css"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
    site: { siteMetadata: { title }},
  },
}) => {
  // Group the posts by topic, with each topic sorted by recency of post.
  // Is it inefficient to sort the entire topic each time a single post is added? Yes.
  // Do I care, given that the slow stuff happens at build time? No.
  const postsByTopic = edges
        .filter(e => !e.node.frontmatter.draft)
        .map(e => e.node)
        .reduce((topics, n) => {
          const { topic } = n.frontmatter

          // nobody likes to evaluate `undefined.push(n)`
          topics[topic] = topics[topic]
            ? topics[topic]
            : []

          topics[topic].push(n)
          topics[topic].sort((a, b) => newestFirst(a, b))

          return topics
        }, {})

  // Order the topics by date of most recent post
  const Posts = Object.values(postsByTopic)
        .sort((a, b) => newestFirst(a[0], b[0]))
        .map(postList => {
          const { topic } = postList[0].frontmatter

          return <>
                   <h3>{topic}</h3>
                   <div>{
                     postList.map(node => <PostLink
                                            key={node.id}
                                            post={node}
                                          />)
                   }</div>
                 </>
        })

  return <Layout defaultHeader={true}>
    <SEO title="Home" />
    <div style={{
      margin: "auto",
      width: "fit-content",
    }}>
      <Triangle/>
      <h2>html &lt; thoughts &gt; browser</h2>
      <Legend/>
      {Posts}
    </div>
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
            topic
            title
            draft
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
