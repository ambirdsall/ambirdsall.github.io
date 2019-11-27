import React from "react"
import { graphql } from "gatsby"
import "./blog-post.css"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
      <div className="blog-post-container">
      <div className="blog-post">
      <h1>{frontmatter.title}</h1>
      <h3 className="blog-post-date">{new Date(frontmatter.date).toDateString()}</h3>
      <div
    className="blog-post-content"
    dangerouslySetInnerHTML={{ __html: html }}
      />
      </div>
      </div>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        path
        title
      }
    }
  }
`
