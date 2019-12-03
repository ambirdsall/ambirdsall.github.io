import React from "react"
import { Link } from "gatsby"
import numberToColor from "../utils/number-to-color"

import "./post-link.css"

const year = node => new Date(node.frontmatter.date).getFullYear()

const PostLink = ({ post }) => (
  <div className="post-link">
  <Link to={post.frontmatter.path} style={{color: numberToColor(year(post))}}>
      {post.frontmatter.title}
    </Link>
  </div>
)
export default PostLink
