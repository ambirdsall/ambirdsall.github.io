import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Alex Birdsall",
  tagline: "I make websites, music, and food.",
  // favicon: 'img/favicon.ico',
  favicon: "img/amb-icon.png",

  url: "https://ambirdsall.com",
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ambirdsall", // Usually your GitHub org/user name.
  projectName: "ambirdsall.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          path: "projects",
          routeBasePath: "projects",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          blogSidebarCount: 0,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: "https://github.com/ambirdsall/ambirdsall.github.io",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          showLastUpdateTime: true,
          showReadingTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/amb-icon.png",
    mermaid: {
      theme: {
        // light: "default",
        // light: "neutral",
        // light: "dark",
        // light: "forest",
        light: "base",
        dark: "forest",
      },
    },
    navbar: {
      // title: "Alex Birdsall",
      logo: {
        alt: "My Site Logo",
        src: "img/amb-icon.png",
      },
      hideOnScroll: true,
      items: [
        {
          type: "docSidebar",
          sidebarId: "projectSidebar",
          position: "left",
          label: "Projects",
        },
        {
          to: "/blog",
          label: "Blog posts",
          position: "left",
        },
        {
          href: "https://ambirdsall.com/resume",
          label: "My resumé",
          position: "right",
        },
        {
          href: "https://github.com/ambirdsall",
          label: "Github profile",
          position: "right",
        },
        {
          href: "https://linkedin.com/in/ambirdsall",
          label: "LinkedIn profile",
          position: "right",
        },
        // {
        //   href: "https://github.com/ambirdsall/ambirdsall.github.io",
        //   label: "Website Source Code",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "This site",
          items: [
            {
              label: "Home",
              to: "/",
            },
            {
              label: "Blog index",
              to: "/blog",
            },
          ],
        },
        {
          title: "But more about me",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/ambirdsall",
            },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/ambirdsall",
            },
            {
              label: "My resumé",
              to: "https://ambirdsall.com/resume",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alexander Birdsall`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "lisp", "ruby", "vim", "typescript"],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
