import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostLink from "../components/post-link"
import Triangle from "../components/triangle"
import newestFirst from "../utils/newest-first"

import "./index.css"

const IntroductoryHeader = () => (
  <introduction>
    <h1>hello, I'm Alex Birdsall</h1>
    <p>I make music, cook food, and build websites and computer programs</p>
    <aside>
      (<a href="/resume">Here is my resumé</a>, if you're a software engineer
      hiring sort)
    </aside>
  </introduction>
)

// Group the posts by topic, with each topic sorted by recency of post.
const postsByTopic = postNodes => {
  const byTopic = postNodes
    .map(e => e.node)
    .reduce((topics, n) => {
      const { topic } = n.frontmatter

      // nobody likes to evaluate `undefined.push(n)`
      topics[topic] = topics[topic] || []

      topics[topic].push({ ...n, topic })
      // Is it inefficient to sort the entire topic each time a single post is added? Yes.
      // Do I care, given that the slow stuff happens once at build time? No.
      topics[topic].sort((a, b) => newestFirst(a, b))

      return topics
    }, {})
  // Order the topic lists by date of most recent post
  return Object.values(byTopic).sort((a, b) => newestFirst(a[0], b[0]))
}

const IndexPage = ({
  data: {
    allMdx: { edges: postNodes },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const Posts = postsByTopic(postNodes).map(postList => {
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

  // I'll figure out sane limits on the home page post listing after it goes insane, not
  // before.
  // TODO: There should be a separate blag/ index route with a comprehensive list and
  // fuzzy search for specific posts (by title? category? full text content? who knows!).
  return (
    <Layout>
      <Seo title="Home" />
      <IntroductoryHeader />
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
