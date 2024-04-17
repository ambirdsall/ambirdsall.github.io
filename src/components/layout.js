/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import Nothing from "./nothing"

import "./layout.css"
import "./prism-overrides.css"

const DefaultHeader = _ => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Header withIcons>
      <h1>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {data.site.siteMetadata.title}
        </Link>
      </h1>
    </Header>
  )
}

const Layout = ({ children, defaultHeader }) => {
  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints) {
      document.body.classList.add("touch-device")
    }
  }, [])

  return (
    <>
      {defaultHeader ? <DefaultHeader /> : <Nothing />}
      <div className="container">
        <main>{children}</main>
        <footer
          style={{
            color: "#bbb",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} Alex Birdsall
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
