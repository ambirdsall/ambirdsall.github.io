import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"

const Header = ({ pageTitle, withIcons }) => {
  const icons = withIcons
        ? <h2>[icons go here]</h2>
        : <></>

  return <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0, textAlign: 'center' }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {pageTitle}
        </Link>
      </h1>
      {icons}
    </div>
  </header>
 }

Header.propTypes = {
  pageTitle: PropTypes.string,
  withIcons: PropTypes.bool,
}

Header.defaultProps = {
  pageTitle: ``,
}

export default Header
