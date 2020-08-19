module.exports = {
  component: "Breadcrumbs",
  summary: "Breadcrumbs are navigational components that show the user their location within the application.",
  stylesUrl: "breadcrumbs.html",
  lib: [],
  properties: {
    background: {
      type: "'gray' | 'white'",
      description: "The background color",
      example: `
        <eds-breadcrumbs background="gray">
          <a href="#" slot="icon">
            <svg viewBox="0 0 24 24" aria-label="Home">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </a>
          <a href="#">Level 1</a>
          <a href="#">Level 2</a>
          <a href="#">Level 3</a>
        </eds-breadcrumbs>
      `,
    },
    separator: {
      type: "?string",
      description: "The separator to show between each child element",
      example: `
        <eds-breadcrumbs separator=">">
          <a href="#">Home</a>
          <a href="#">Level 1</a>
          <a href="#">Level 2</a>
          <a href="#">Level 3</a>
        </eds-breadcrumbs>
      `,
    },
  },
  notes: [
    `
      The separator is currently not visible in Safari due to lack of support
      for styling pseudo-elements on slotted children.
    `,
  ],
};
