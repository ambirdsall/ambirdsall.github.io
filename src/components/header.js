import React from "react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import Nothing from "./nothing"

import "./header.css"

const Shh = ({ children }) => <span className="shh">{children}</span>

const IconBar = _props => (
  <div className="icon-bar">
    <a href="https:www.github.com/ambirdsall">
      <FaGithub />
      <Shh>github</Shh>
    </a>
    <a href="https:www.linkedin.com/in/ambirdsall">
      <FaLinkedin />
      <Shh>linkedin</Shh>
    </a>
    <a href="https:www.twitter.com/gobslapped">
      <FaTwitter />
      <Shh>twitter</Shh>
    </a>
  </div>
)

export const Header = ({ children, plaid, withIcons }) => (
  <header className={plaid ? "plaid" : ""}>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `${plaid ? "1.45rem" : 0} 1.0875rem`,
      }}
    >
      {children}
      {withIcons ? <IconBar /> : <Nothing />}
    </div>
  </header>
)

export const Footer = ({ children, withIcons }) => (
  <footer className="plaid">
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `2.45rem 1.0875rem`,
        textAlign: "center",
      }}
    >
      {withIcons ? <IconBar /> : <Nothing />}© {new Date().getFullYear()} Alex
      Birdsall
      {children}
    </div>
  </footer>
)

export default Header
