import React from "react"
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa"
import Nothing from "./nothing"

import "./header.css"

const Shh = ({ children }) => <span className="shh">{children}</span>

const IconBar = _props => (
  <div className="icon-bar">
    <a href="https:www.github.com/ambirdsall"><FaGithub/><Shh>github</Shh></a>
    <a href="https:www.linkedin.com/in/ambirdsall"><FaLinkedin/><Shh>linkedin</Shh></a>
    <a href="https:www.twitter.com/gobslapped"><FaTwitter/><Shh>twitter</Shh></a>
  </div>
)

const Header = ({ children, withIcons }) => {
  const icons = withIcons
        ? <IconBar/>
        : <Nothing/>

  return <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      {children}
      {icons}
    </div>
  </header>
 }

export default Header
