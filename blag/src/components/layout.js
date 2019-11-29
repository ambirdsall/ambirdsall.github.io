/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
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

  return <Header withIcons>
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
}

const Layout = ({ children, defaultHeader }) => {
  return (
    <>
      {defaultHeader ? <DefaultHeader/> : <Nothing/>}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, ya boy
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
