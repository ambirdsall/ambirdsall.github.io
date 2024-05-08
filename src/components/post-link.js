import React from "react"
import { Link } from "gatsby"

import "./post-link.css"

const datestamp = date => {
  const { year, month, day } = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(new Date(date))
    .filter(part => part.type !== "literal")
    .reduce((acc, part) => {
      acc[part.type] = part.value
      return acc
    }, {})

  return `${year}-${month}-${day}`
}

const PostLink = ({
  post: {
    frontmatter: { path, date, title },
  },
}) => (
  <div className="post-link">
    <Link to={path}>{title}</Link>
    <span className="post-link-date">{datestamp(date)}</span>
  </div>
)
export default PostLink
