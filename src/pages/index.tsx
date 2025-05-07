import clsx from "clsx"
import type { ReactNode } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

import Link from "@docusaurus/Link"
import Sierpinski from "@site/src/components/triangle"

// @ts-ignore
import SelfPortraitUrl from "@site/static/img/alex-birdsall-headshot.jpg"
import styles from "./index.module.css"

export default function Home(): ReactNode {
  return (
    <>
      <header className={clsx(styles.header, styles.center, "plaid")}>
        <div
          className={clsx(styles.blurredBackdrop, "avatar", "avatar--vertical")}
        >
          <img
            alt="Photo of Alex Birdsall"
            className="avatar__photo avatar__photo--xl"
            src={SelfPortraitUrl}
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
        <Link
          href="https://github.com/ambirdsall"
          className="button button--secondary"
        >
          <FaGithub className={styles.socialIcon} />
          Github
        </Link>
        <Link to="/blog" className="button button--secondary">
          Blog
        </Link>
        <Link
          href="https://linkedin.com/in/ambirdsall"
          className="button button--secondary"
        >
          <FaLinkedin className={styles.socialIcon} />
          LinkedIn
        </Link>
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
          <Link
            href="https://ambirdsall.com/resume"
            className="button button--secondary"
          >
            html resumé
          </Link>
          <Link
            href="https://ambirdsall.com/resume"
            className="button button--secondary"
          >
            pdf resumé
          </Link>
        </div>
      </section>
    </>
  )
}
