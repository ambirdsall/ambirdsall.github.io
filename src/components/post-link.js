import React from "react"
import { Link } from "gatsby"
import numberToColor from "../utils/number-to-color"

import "./post-link.css"

const year = date => new Date(date).getFullYear()
const datestamp = date => new Date(date).toISOString().slice(0, 10)

const PostLink = ({
  post: {
    frontmatter: { path, date, title },
  },
}) => (
  <div className="post-link">
    <Link to={path} style={{ color: numberToColor(year(date)) }}>
      {title}
    </Link>
    <span className="post-link-date">{datestamp(date)}</span>
  </div>
)
export default PostLink
