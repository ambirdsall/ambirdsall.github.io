ambirdsall.github.io
====================

My personal site! Hullo!

## It's a blog with a cool little sierpinski triangle doodad
  On scroll or devicemove it populates a sierpinski triangle via the [Chaos
  Game](https://en.wikipedia.org/wiki/Chaos_game) algorithm. Right now I'm just
  blogging about programming, but I may change that.
  
  I also like the thought of doing something fun to make the triangle doodad more interactive, and maybe have a little easter egg:
  - Simple idea: clicking randomizes the pip count
  - Tricky idea: add a way to change the shape of the pips
    + simple idea: click to cycle through predefined shapes (circe, star, whatever)
    + bigger idea: make a connected form to interactively control the shape
  - Exciting idea: clicking on the triangle could "release" the pips as a flock of boids.

### Installation

```sh
npm install
```
Or `pnpm`, or `yarn`, or `bun`, or fuckin' go through `package.json` and manually vendor deps with `wget` or whatever.

### Local Development

```sh
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```sh
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```sh
npm run deploy
```

This runs a little node script which deploys the site to github pages at my custom domain, using the `gh-pages` library.
