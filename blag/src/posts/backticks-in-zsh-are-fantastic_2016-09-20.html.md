---
path: "/blag/backticks-are-fantastic-because-typing-is-the-worst"
title: Backticks Are Fantastic Because Typing Is The Worst
category: Dev Environment
topic: Zsh
date: 2016-09-20 03:47:25 UTC
---

## Backticks Are Fantastic
I mean, [legit
awesome](http://www.refining-linux.org/archives/44/ZSH-Gem-10-Backtick-expansion/).
An example:

So, when making a symbolic link, you have to type out the absolute path to the
link target. There are, I assume, good reasons for that, but having to actually
do it kind of sucks. Two things help:

1. If, as is often the case, you want to link to go in your current directory, you can totally omit the second argument
1. Typing some shell expression inside backticks and then hitting `tab` expands that expression interactively in `zsh`. You use `zsh`, right?

Some would argue that the `$()` subshell operator has strictly more powerful semantics because you
can nest them; they are, of course, correct. Still, backticks have one killer advantage over
subshells:

1. 33% fewer keystrokes (seriously, I hate unnecessary typing)

e. fuckin' g.:

<%= image_tag('ln_backticks.gif', class: 'post-img') %>
