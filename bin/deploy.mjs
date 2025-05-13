#!/usr/bin/env node

import { strictEqual } from "assert"
import { readFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

import ghpages from "gh-pages"
import c from "chalk"

// idgaf where you call the script from, I want to work with relative paths from the
// script's source directory
const CWD = dirname(fileURLToPath(import.meta.url))
const cnamePath = join(CWD, "../CNAME")

async function main() {
  // if need be:
  // const { default: ghpages } = await import('gh-pages')

  const cname = readFileSync(cnamePath, "utf8")
  console.log(`
       ${c.white("_") + c.red("~")}
    ${c.white("_") + c.red("~") + c.white(" )_)_") + c.red("~")}
    ${c.white(")_))_))_)")}
    ${c.dim.yellow("_!__!__!_")}
    ${c.dim.yellow("\\______t/")}
  ${c.blue("~~~~~~~~~~~~~")}`)

  // TODO remove once shit is proven to work
  strictEqual(cname, "ambirdsall.com")

  await ghpages.publish("build", {
    branch: "master",
    cname,
  })

  console.log("All done!")
}

main()
