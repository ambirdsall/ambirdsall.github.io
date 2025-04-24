ambirdsall.github.io
====================

My personal site! Hullo!

## It's a blog with a cool little sierpinski triangle doodad
  On scroll or devicemove it populates a sierpinski triangle via the [Chaos
  Game](https://en.wikipedia.org/wiki/Chaos_game) algorithm. Right now I'm just
  blogging about programming, but I may change that.
  
  I also like the thought of doing something fun to expand the triangle doodad.
  For example, clicking on the triangle could start them flocking around using
  the 2d version of the boids algorithm.
### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
