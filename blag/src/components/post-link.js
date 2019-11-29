import React from "react"
import { Link } from "gatsby"
import "./post-link.css"

const PostLink = ({ post }) => (
  <div className="post-link">
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title}
    </Link>
  </div>
)
export default PostLink
