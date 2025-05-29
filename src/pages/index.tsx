import clsx from "clsx"
import type { ReactNode } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

import Link from "@docusaurus/Link"
import Image from "@theme/IdealImage"
import Sierpinski from "@site/src/components/triangle"

// @ts-ignore
import SelfPortraitUrl from "@site/static/img/alex-birdsall-headshot-uncropped.jpg"
import styles from "./index.module.css"

type NavBadgeProps = { to?: string; href?: string; children: ReactNode }
const NavBadge = ({ to, href, children }: NavBadgeProps) => {
  const className = "button button--secondary"
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  } else if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  } else {
    throw Error(`<NavBadge> must be given either a 'to' or an 'href' prop.`)
  }
}

export default function Home(): ReactNode {
  return (
    <>
      <header className={clsx(styles.header, styles.center, "plaid")}>
        <div
          className={clsx(styles.blurredBackdrop, "avatar", "avatar--vertical")}
        >
          <Image
            alt="Photo of Alex Birdsall"
            className={clsx("avatar__photo", styles.selfPortrait)}
            img={SelfPortraitUrl}
          />
          <div className="avatar__intro">
            <h1 className={styles.hello}>hello, I'm Alex Birdsall</h1>

            <small className="avatar__subtitle text--bold">
              I build websites and write computer programs for a living;
            </small>
            <small className="text--bold">
              I make music, cook food, play hoops, and climb rocks for fun.
            </small>
          </div>
        </div>
      </header>
      <section className={styles.subNav}>
        <NavBadge href="https://github.com/ambirdsall">
          <FaGithub className={styles.socialIcon} />
          Github
        </NavBadge>
        <NavBadge to="/projects">Projects</NavBadge>
        <NavBadge to="/blog">Blog</NavBadge>
        <NavBadge href="https://linkedin.com/in/ambirdsall">
          <FaLinkedin className={styles.socialIcon} />
          LinkedIn
        </NavBadge>
      </section>
      <Sierpinski />
      <aside className={clsx(styles.center, styles.aside)}></aside>
      <section className={styles.checkMeOut}>
        <p>
          As with many web developers, my website exists in part to demonstrate
          to potential employers that I can, in fact, do things like build
          websites, host them on a real url with TLS, and so on.
        </p>

        <p>
          If you are the sort of person who employs programmers, you may also be
          interested in my resumé:
        </p>
        <div className={styles.subNav}>
          <NavBadge href="https://ambirdsall.com/resume">html resumé</NavBadge>
          <NavBadge href="https://ambirdsall.com/resume/Alex-Birdsall.pdf">
            pdf resumé
          </NavBadge>
        </div>
      </section>
    </>
  )
}
