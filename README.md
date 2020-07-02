<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  gatsby-three-ts-plus
</h1>

> 3D web starter kit with Three.js and TypeScript.

This is a 3D web starter kit for [Gatsby.js](https://www.gatsbyjs.org/) websites written in TypeScript. 3D scenes are expressed by a pure Three.js library. It includes the bare essentials for you to get started (styling, minimal toolset).

## 🗒️ Features

:white_check_mark: Three.js

:white_check_mark: TypeScript

:white_check_mark: Gatsby

:white_check_mark: Netlify

:white_check_mark: TailwindCSS

:white_check_mark: Emotion

## 🚀 Quick start

> A nodejs >= 6.0.0 setup with [yarn](https://yarnpkg.com/) is recommended.

1.  **Create a Gatsby site.**

    Install `gatsby-cli` package globally on your machine.

    ```bash
    # using NPM
    npm install -g gatsby-cli

    # using YARN
    yarn global add gatsby-cli
    ```

    Use the `gatsby-cli` to create a new site and install its dependencies.

    ```bash
    gatsby new project-name https://github.com/shunp/gatsby-three-ts-plus
    ```
    
    Or you can use this command if you are familiar with `degit`.
    
    ```bash
    degit git@github.com:shunp/gatsby-three-ts-plus
    ```

2.  **Start developing.**

    Move to project's directory.

    ```bash
    cd project-name/
    ```

    Start your site.

    ```bash
    # using npm
    npm start

    # using yarn
    yarn start
    ```

    Open source code using your favorite IDE/Text editor and navigate to `src/` directory, this is where your application live.

3.  **Build your application for production.**

    Once you're finished, you can make production build of your app using:

    ```bash
    # using npm
    npm run build

    # using yarn
    yarn build
    ```

4.  **Deploy your app to Github pages!**

    After building your application in step 3, you're ready to publish your app and go online!

    ```bash
    # using npm
    npm run deploy

    # using yarn
    yarn deploy
    ```

## 🧐 What's inside?

    A quick look at the top-level files and directories you'll see in a Gatsby project.
    
    ```
    .
    ├── node_modules
    ├── src
    ├── static
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── yarn.lock
    ├── package.json
    └── README.md
    ```
    
1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`yarn.lock`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## ❤️ Credits

Built with [Gatsby](https://www.gatsbyjs.org/) - the blazing-fast static site generator for [React](https://facebook.github.io/react/).

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/resir014/gatsby-starter-typescript-plus)
