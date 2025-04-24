import React, { useEffect } from "react"
import Link from '@docusaurus/Link';

import { Header, Footer } from "@site/src/components/header"
import Nothing from "@site/src/components/nothing"

import "./oldLayout.css"
// import "./prism-overrides.css"

const DefaultHeader = ({title} = {title: ""}) => {
  return (
    <Header>
      <h1>
        <Link
          to="/"
          style={{
            textDecoration: `none`,
          }}
        >
          {title}
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
      </div>
      <Footer withIcons />
    </>
  )
}

export default Layout
