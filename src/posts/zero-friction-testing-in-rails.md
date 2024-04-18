---
path: "/blag/zero-friction-testing-in-rails"
title: Zero-friction testing in rails
topic: Testing
date: 2016-12-09 08:12:22 UTC
---

> **AUTHOR'S NOTE:** this post is several years old, but it's a fun time
> capsule. Professionally I was but a babe, and had just left one of my first
> programming jobs, where I had encountered my first truly heinous codebase. I was
> almost comically thirsty for quality and blessed with a project that was
> conceptually reducible to a pure function. Nonetheless, what is describes
> remains my favorite programming workflow: in a split terminal window, running
> `vim` or `emacsclient -nw` on one side and unit tests on the other.

So. It wasn't until a few months ago that I finally worked on a software
project with full test coverage. Now that I have, I'm a little shocked and
horrified it took this long: the quality of life is drastically better on
this side. The project in question is [RIO](https://law.cornell.edu/rio), an
ES6 legal citation parser I've been building for Cornell Law's LII. I've been
developing that solo, so I had the liberty of setting the testing mantle up to
suit my own workflow: heavily terminal-based, using vim and tmux.

I've found that it's a massive help to be able to have tests constantly
rerunning in a splitscreen with vim every time I save a file. The constant
feedback means I don't need to keep switching mental context to see if my code
is correct: I can, while still in my editor, just glance over at a current test
run. This has utterly revolutionized how I feel about refactoring: knowing
exactly when my code breaks and unbreaks as I rearrange things is a massive
help for refactoring, and reveals bugs pretty much the instant they are
introduced. I haven't had to write a `debugger` in anger in a shockingly long
time. I want that confidence and speed when I work on rails projects, too.

So, to recap, I want

1. fast tests that
1. run automatically on file save
1. run by a persistent server I can ogle in a tmux split while I vim away in
   the same terminal window.

## Fast tests

The speed can be helped by `spring`, a gem that comes in rails' default
`Gemfile` but which takes a bit of setup. Once you _have_ set it up, though,
it's brilliant. After the first command which requires loading your rails app,
`spring` keeps running as a background process, with your application
environment loaded into memory. This means that the next time you run a command
that requires a loaded app, like your test suite, you get to skip the
several-second wait for rails to bootstrap itself­you only need to run
the test files themselves. Out of the box, `spring` only knows how to wrap the
`rails` and `rake` commands to use the preloaded app, but the
`spring-commands-rspec` gem expands that set to also wrap `rspec`, which I'm
using for my tests.

Incidentally, I've read things which assert that `minitest` is a good bit
faster than `rspec`; but `rspec` has quite a lot of community support, and I've
been writing a ton of `jasmine` tests lately, which has wicked similar syntax.
The point of this is to lower the cognitive load of testing, after all. With a
massive test suite, though, the time savings might be worth switching over. As
always, measure: the old command-line standby `time` is your friend.

## Running automatically on file save

`guard` is the gem of choice here. It reads a `Guardfile` in the root of your
project: in that `Guardfile`, which is written in a ruby DSL, you define what
actions `guard` should run for given project files and which files to ignore.
If you, like I, are on osx, you should also install `rb-fsevent`, which makes
`guard` listen to osx's native FSEvents API instead of having to poll the disk
for changes (which is slower and takes more work from your CPU). You can
specify any command-line callback you like in your `Guardfile` with backticks,
but there are quite a few guard plugins that automatically set up conventional
rules for a conventional rails configuration and tool-specific configuration
options. Enter `guard-rspec`.

Here are the versions of all the gems I used when I went through this myself,
if you're into that sort of thing:

```
guard 2.14.0
guard-rspec 4.7.3
rails 4.2.5
rb-fsevent 0.9.8
ruby 2.3.1
spring 2.0.0
spring-command-rspec 1.0.4
```

## Let's set these bad not-specifically-gendered children up

In your `Gemfile`:

```ruby
group :development, :test do
  gem 'spring-commands-rspec'
  gem 'rspec-rails'
  gem 'guard-rspec'
  gem 'rb-fsevent' if `uname` =~ /Darwin/
end
```

And

```shell
bundle
```

## Setup Spring

To generate the command wrappers necessary to use the preloaded app, run

```shell
spring binstub --all
```

which should generate some output along the lines of

```shell
* bin/rake: spring inserted
* bin/rspec: spring inserted
* bin/rails: spring inserted
```

If you forgot to rebundle before running this or otherwise need to change the
configuration for `spring`, you'll need to stop and restart `spring` with

```shell
spring stop
```

Otherwise, it will keep reusing the old outdated preloaded environment. And, if you're paranoid:

```shell
spring status
```

For those quick tests I mentioned, just run

```shell
bin/rspec
```

`bin/rspec` is the wrapper script genreated back in the `spring binstub --all`
step. You could also run `rspec` through `spring` manually with

```shell
spring rspec
```

Life is full of choices, and many of them don't matter. I timed both on some
empty spec files I scaffolded (with test output truncated, of course):

```shell
% spring stop
Spring stopped.

% time bin/rspec

[...]
Finished in 0.66145 seconds (files took 0.61181 seconds to load)
32 examples, 0 failures, 18 pending

bin/rspec  0.25s user 0.06s system 4% cpu 6.348 total

% time bin/rspec

[...]
Finished in 0.59806 seconds (files took 0.58837 seconds to load)
32 examples, 0 failures, 18 pending

bin/rspec  0.27s user 0.09s system 19% cpu 1.864 total

% spring stop
Spring stopped.

% time spring rspec

[...]
Finished in 0.58927 seconds (files took 0.36102 seconds to load)
32 examples, 0 failures, 18 pending

spring rspec  0.27s user 0.09s system 5% cpu 5.996 total

% time spring rspec

[...]
Finished in 0.57317 seconds (files took 0.34346 seconds to load)
32 examples, 0 failures, 18 pending

spring rspec  0.27s user 0.08s system 25% cpu 1.398 total
```

Either way, `spring` made the tests _much_ faster after the first run, and
those savings persist so long as the spring server is running.

## Setup Guard

I assume you already ran

```shell
rails g rspec:install
```

but if you didn't yet, do. Then run

```shell
% guard init

01:34:28 - INFO - Writing new Guardfile to /Users/ambirdsall/code/rails/event_scheduler/Guardfile
01:34:28 - INFO - rspec guard added to Guardfile, feel free to edit it
```

Find this line of your new `Guardfile`:

```ruby
guard :rspec, cmd: "bundle exec rspec" do
```

and change it to

```ruby
guard :rspec, cmd: "bin/rspec" do
```

NICE.

## There you go

Now just fire up `guard` with the command `guard`. Shazam! Your tests will run on save.

The little prompt `guard` gives you is an interactive ruby console, too, which
is really handy for double-checking the syntax of quick snippets when fixing
test failures. Use Ctrl-d to kill it, or just close your terminal.
