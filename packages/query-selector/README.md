# @gql-conquest/query-selector
Query your HTML using GraphQL. Replaces document.querySelector.

## Installation
```bash
npm install @gql-conquest/query-selector
```

Ensure you have `graphql` installed as a peer dependency:
```bash
npm install graphql
```

You will also need `graphql-tag` to tag your query:
```bash
npm install graphql-tag
```

## Usage

### querySelector
Pass the tagged gql query and the root element.

Fetch all `p` tags from a root element.
```ts
import querySelector from '@gql-conquest/query-selector'
import gql from 'graphql-tag'

const root = document.querySelector('#root')

const result = querySelector(gql`
    {
        p: all(s: "p")
    }`, root)
```

Fetch all spans and italics under headings under section and all spans under section.
```tsx
const result = querySelector(gql`
    {
        section: one(s: "section") {
        headings: all(s: "h1, h2, h3, h4, h5, h6") {
            spans: one(s: "span")
          italics: one(s: "i")
        }
        spans: all(s: "span")
      }
    }`, root)

// one span from each heading
assert.deepStrictEqual(result.headings.spans, [<span></span>, <span></span>])
```

**NOTE: Nesting `all` fields will cause unwanted behavior.** Do **not** do the following.
This will most likely lead to problems as `spans` is an `all` field nested under `headings`, which is also an `all` field:
```ts
const result = querySelector(gql`
    {
        section: one(s: "section") {
        headings: all(s: "h1, h2, h3, h4, h5, h6") {
            spans: all(s: "span")
          italics: one(s: "i")
        }
        spans: all(s: "span")
      }
    }`, root)
```