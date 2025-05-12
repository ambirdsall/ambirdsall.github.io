import React, { type ReactNode } from "react"
import clsx from "clsx"
import { blogPostContainerID } from "@docusaurus/utils-common"
import { useBlogPost } from "@docusaurus/plugin-content-blog/client"
import MDXContent from "@theme/MDXContent"
import type { Props } from "@theme/BlogPostItem/Content"

import Giscus from "@giscus/react"
import { useColorMode } from "@docusaurus/theme-common"

export default function BlogPostItemContent({
  children,
  className,
}: Props): ReactNode {
  const { isBlogPostPage } = useBlogPost()
  const { colorMode } = useColorMode()
  const giscus = (
    <React.Fragment>
      <hr />
      <br />
      <Giscus
        id="comments"
        repo="ambirdsall/ambirdsall.github.io"
        repoId="MDEwOlJlcG9zaXRvcnkxOTgzOTU0Mw=="
        category="Announcements"
        categoryId="DIC_kwDOAS66N84CpwSt"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </React.Fragment>
  )
  return (
    <div
      // This ID is used for the feed generation to locate the main content
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx("markdown", className)}
    >
      <MDXContent>
        {children}
        {isBlogPostPage && giscus}
      </MDXContent>
    </div>
  )
}
