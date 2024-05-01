import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"

import "./blog-post.css"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  children,
}) {
  const { mdx } = data // data.markdownRemark holds your post data
  const { frontmatter } = mdx
  return (
    <>
      <Header plaid withIcons={false}>
        <h1>{frontmatter.title}</h1>
        <h3 className="blog-post-date">
          {new Date(frontmatter.date).toDateString()}
        </h3>
      </Header>
      <div className="blog-post-container">
        <div className="blog-post">
          <div className="blog-post-content">{children}</div>
        </div>
      </div>
    </>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date
        path
        title
      }
    }
  }
`
