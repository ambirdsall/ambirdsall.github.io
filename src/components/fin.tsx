import React from "react"
import Head from "@docusaurus/Head"

import styles from "./fin.module.css"

const Fin = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>Fin</h2>
        </div>
      </div>
    </>
  )
}

export default Fin
