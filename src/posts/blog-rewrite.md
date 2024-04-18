---
path: "/blag/cut-out-the-middleman"
title: "Rewriting a middleman site with gatsby"
topic: M E T A B L A G
date: 2019-12-05 01:03:30 UTC
---

It came to pass that after 3 years of neglect, I wanted to revive my old
website. I figured I'd add a post or two, maybe tweak a few things about the
HTML and CSS, and then I could rewrite it in a different stack at my leisure.
I think a lot of things that are wrong, though.

## Problem: I had a new computer and my webpage had a fussy development env;

I tried to run the development build, but ran into an error: I needed the right
ruby version. I've never done ruby development on this operating system, so I
don't have any tool in place to manage ruby versions. To fix things, I needed to
install one of `chruby`/`rbenv`/`rvm`; setup `nix` or `guix` with `direnv`; or
maybe I could use `asdf` or fuck if I know what the cool kids are doing these
days. Oy, what a hassle. Still, I eventually got on the version of ruby
specified in the Gemfile and I got a different error. Progress, right?

I needed to upgrade bundler, so I ran `bundle update --bundler`. This, it seems,
overshot the mark: I needed to downgrade bundler, which is a bigger hassle than
upgrading. Whatever: I uninstalled the new version and installed the specific
older one that was compatible with the rest of the project.

With this, I could actually run the site locally! All was not well, though: it
looked like crap. It turned out that only some of the stylesheets I was loading
from a ruby gem were available in practice, and the icon font I had been using
was nowhere to be found[^1]. At this point, I gave up: none of these problems were
insurmountable, but why go to all that effort when I wanted to rewrite it
anyway?

## and, having been exposed to JSX,

In the ruby version, I used `.erb` files to handle dynamic data and a few bits
of html boilerplate. The way `.erb` files treat the non-logic contents as a dumb
text stream, not something with a tree structure, makes it fundamentally a worse
fit for modeling HTML than the tree structure of JSX templates[^3]. Having
worked with react and angular, I don't want to go back to the bad old days of
wrangling HTML as raw text, I want to compose and encapsulate HTML using
components; and having used JSX, embedding the structural logic of the template
within the content has begun to feel inside out. I didn't want to use another
templating system.

## and wanting to maintain a statically-generated site,

(While `create-react-app` is dope and all, there is zero dynamic content on this
whole site.)

## the choice of gatsby seemed good, so I set to work.

First I made the page shell; that was just porting some html to react
components. It happened that all I needed were well-documented, [easily
searchable plugins](https://www.gatsbyjs.org/plugins/) to [render
markdown](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)
into pages via a template; with [colorized code
blocks](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/);
with [autolinked
headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/);
with
[footnotes](https://www.gatsbyjs.org/packages/gatsby-remark-footnotes/).

As a sidenote, pour one out for good sidenotes. I'm still holding out hope I
find a decent plugin I can use to finagle sidenotes from markdown without
needing to go all the way on some Tufte CSS theme. I don't think I'm likely to
go to the effort of coding one up myself anytime soon, though.

Anyway, I had the existing posts rendering acceptably to HTML from pure
markdown, getting autolinking and asides without needing any .erb equivalent.

## I had to figure out how to sort a list of posts;

This was straightforward: I wanted to group by topic, sort each topic by date,
and sort the set of topics by date of most recent post. All the data I needed
was easily queryable from the markdown frontmatter via graphQL. You'll notice
that the remark plugin which renders the markdown exposes the list of rendered
posts under a property named `edges` and, to be honest, I'm not sure why: the
name seems to describe the data's underlying topology rather than its API.
Whatever.

```javascript
// the page component's props are destructured like so:
// ({
//   data: {
//     allMarkdownRemark: { edges },
//     site: { siteMetadata: { title }},
//   },
// })
const postsByTopic = edges
  .filter(e => !e.node.frontmatter.draft)
  .map(e => e.node)
  .reduce((topics, n) => {
    const { topic } = n.frontmatter

    // nobody likes to evaluate `undefined.push(n)`
    topics[topic] = topics[topic] ? topics[topic] : []

    topics[topic].push(n)
    topics[topic].sort((a, b) => newestFirst(a, b))

    return topics
  }, {})

// Order the topics by date of most recent post
const Posts = Object.values(postsByTopic)
  .sort((a, b) => newestFirst(a[0], b[0]))
  .map(renderSingleTopic)
```

Before you ask, yes, I know that sorting topics each time a new post is added is
an `O(n²)` algorithm, yes, I know that's improvable, and no, I don't care to
make it more efficient: posts are sorted once at build time, and I'd have to
publish a post ever day for years (if not decades) before that `n` gets big
enough to be a problem. When efficiency is not important, always take the
approach that's simplest to understand.

I found it was significantly nicer to do the filtering in javascript than ruby.
I was surprised by that, because I really love ruby's `Enumerable` methods. But
js objects are up with cons cells among my very favorite data structures to work
with, first-class functions make custom sorting comparators easy to add as
arguments, and `Array.prototype` methods are just as chainable as
`Enumerable`s[^4]. The definition of that `newestFirst` comparator function is
left as an exercise to the reader, that's already a fair chunk of code.

## then how to update the d3 triangle thing to modern d3 using es6 imports

This wasn't too bad: I changed all the `var` statements to `const`; fixed the
one variable I mutate in place (it's the easiest way to implement the algorithm)
to use `let` instead; and imported `d3`. Modern versions of `d3` export their
constituent parts as named exports, for ease of tree-shaking, so I had change
the code to import the functions I actually used instead of relying on the `d3`
object to have everything. `d3.scale.linear()` had become `d3.scaleLinear()`,
but otherwise this was a pretty mechanical translation.

## then how to embed a d3-controlled element in a react component

Figuring this part out was kind of fun! The basic 2-step to mounting a
self-contained `d3` visualization inside of a react app:

1. `const domElementRef = useRef(null)`
2. `useEffect(() => d3.select(domElementRef.current).doStuffWith(props.data), [props.data])`

That's the general approach, since usually a `d3` visualization is based on some
input data and should rerender when and if the data changes; mine uses
randomly-generated data, though, so I didn't even need the dependency array.

Regardless, it's much nicer to do with hooks than lifecycle methods, where you'd
need to use both `componentDidMount` and `componentDidUpdate` to ensure the
visualization ran at all the appropriate times.

## and then I had a site!

I hope you like it.

[^1]:

  It is very popular to try to dunk on the javascript ecosystem in various parts
  of programmer culture[^2], and one of the very most popular ways is to clown on
  the size of the `node_modules` directory. Since `npm` installs every package on
  a per-project basis; since it errs on the side of having multiple (potentially
  incompatible) versions of transitive dependencies rather than forcing you to
  just choose one; and since javascript itself has a very small standard library,
  leading to heavy use of library code; it's common to have large `node_modules`
  directories on your hard drive. Clown all you want, but the self-containment of
  that approach would have saved me a bunch of hassle here. Or maybe I just had a
  badly-written `Gemfile`.

[^2]:

  I have the strong impression that this is at least in
  part sub-rosa sexism: frontend work, being user-facing and visual, fits
  stereotypes of women's work, and indeed many female programmers are channeled
  into frontend work regardless of their specific interests or abilities.
  Neckbeards huddle together discussing the manly arts of functional programming,
  asynchronous logic, optimizing dependency graphs, and distributed computing,
  never pausing to consider that those are all part and
  [parcel](https://parceljs.org/) of frontend work. But I digress.

[^3]:

  I have an intuition that this has to do with the ol' Chomsky hierarchy,
  akin to how regular expression can scan text streams in sophisticated ways but
  can't validate structural features like valid nesting or pairing.

[^4]:

  A rant: what the fuck is up with how `sort` mutates the array in place?
  It's totally out of character with the rest of the `Array.prototype` chainable
  methods, which return new arrays, and its idiosyncracy offers no benefit: it's
  just a footgun which makes it easy to mutate your application data behind your
  own back. I realize backwards compatibility means we're stuck with a mutating
  `sort`, but I really do think the next iteration of the language should add a
  new `Array.prototype.sorted` method which returns a new sorted array.
