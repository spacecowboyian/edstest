eds-styles
==========

Dev Setup
---------

1. Fork it to your user space in Bitbucket.
2. Clone your fork.
3. In the project directory, run `npm install`.
4. Run the [`build`](package.json) script to produce `index.html` which shows
   component examples.

### Notes:
* Other scripts defined in [`package.json`](package.json) are `lint`, which
  verifies the JavaScript code against the
  [EDS ESLint configuration](https://bitbucketglobal.experian.local/projects/EDS/repos/eslint-config-eds/browse),
  and `prepublishOnly`, which is the script run by Jenkins to produce a
  production-ready build before publishing to Artifactory.
* The `lint` script is required to pass by CI.
* Some knowledge of [PostCSS](https://postcss.org/) and
  [Tailwind CSS](https://tailwindcss.com/) will help you reverse-engineer this
  library if needed.

Installation
------------

As with other @​experian-scoped packages, you will need to add [`.npmrc`](.npmrc) to the root directory of your project.

With the `.npmrc` file in place, you can install via NPM:

```
npm install -D @​experian/eds-styles@next
```

Once installed, you can view and experiment with markup examples by opening
`./node_modules/@experian/eds-styles/index.html` in your Web browser of choice.
