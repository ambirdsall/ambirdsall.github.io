---
sidebar_position: 1
---

# Create a Page

Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## Create your first React Page

Create a file at `src/pages/oh-cool-react.js`:

```jsx title="src/pages/oh-cool-react.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

A new page is now available at [http://localhost:3000/oh-cool-react](http://localhost:3000/oh-cool-react).

## Create your first Markdown Page

Create a file at `src/pages/oh-cool-mdx.mdx`:

```mdx title="src/pages/oh-cool-mdx.mdx"
# My Markdown page

This is a Markdown page
```

A new page is now available at [http://localhost:3000/oh-cool-mdx](http://localhost:3000/oh-cool-mdx).
