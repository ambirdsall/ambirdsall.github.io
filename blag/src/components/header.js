import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa"

import "./header.css"

const IconBar = _props => (
  <div className="icon-bar">
    <a href="https:www.github.com/ambirdsall"><FaGithub/></a>
    <a href="https:www.linkedin.com/in/ambirdsall"><FaLinkedin/></a>
    <a href="https:www.twitter.com/gobslapped"><FaTwitter/></a>
  </div>
)

const Header = ({ pageTitle, withIcons }) => {
  const icons = withIcons
        ? <IconBar/>
        : <></>

  return <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{
        margin: "1em auto",
        textAlign: 'left',
        fontWeight: 400,
        fontSize: '3.14159em',
        maxWidth: '70%',
        height: '100%',
        letterSpacing: '7px',
      }}>
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
