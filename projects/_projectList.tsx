import clsx from "clsx"
import Link from "@docusaurus/Link"

import styles from "./_projectList.module.css"

export const ProjectCardList = ({ children }) => (
  <div className={styles.cardList}>{children}</div>
)

type ProjectCardProps = { path: string; title: string; description: string }

// wraps the Infima card component, cf. https://infima.dev/docs/components/card
export const ProjectCard = ({ path, title, description }: ProjectCardProps) => (
  <Link
    to={`/projects/${path}`}
    className={clsx("card", styles.card, styles.bordered)}
  >
    <div className="card__header">
      <h3>{title}</h3>
    </div>
    <div className="card__body">
      <p>{description}</p>
    </div>
  </Link>
)
