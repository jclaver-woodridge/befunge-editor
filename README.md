# Befunge Editor App

Welcome to the Befunge Editor App! This app allows you to create and run code
in the Befunge programming language.

Befunge is an esoteric programming language, or esolang, in which the
instruction pointer moves in a 2D space, 80 characters wide and 25 characters
tall. Each character represents either data or a single instruction.

See the [Befunge Wikipedia Page](https://en.wikipedia.org/wiki/Befunge) for
more information on Befunge.

## Prerequisites

-   [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)
-   PhpStorm or VSCode

## Quick Start

-   Run `yarn install` to install all your dependencies
-   Run `yarn start` to run the app
-   If the previous command did not open your default browser, visit
    [http://localhost:3000](http://localhost:3000) to get started!

## Default Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best
performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Linting and Code Style

This project uses ESLint and Prettier to ensure coding and style standards are
met. The configuration files for these are the following:

-   ESLint - `.eslintrc.json`
-   Prettier - `.prettierrc.json`

The following linting/styling commands can be run:

### `yarn lint:check`

Checks project source code for linter errors

### `yarn lint:fix`

Checks project source code for linter errors and fixes any that have automatic
fixes available

### `yarn prettier:check`

Checks project source code for code styling errors

### `yarn prettier:fix`

Checks project source code for styling errors and fixes any that can have
automatic fixes available

We recommend using PhpStorm or VSCode and setting it up to automatically run
ESLint and Prettier when your files are saved.

### PhpStorm Configuration

-   [Run ESLint on save](https://www.jetbrains.com/help/phpstorm/eslint.html#ws_eslint_configure_run_eslint_on_save)
-   [Run Prettier on save](https://www.jetbrains.com/help/phpstorm/prettier.html#ws_prettier_run_automatically_in_current_project)

### VSCode Configuration

Install the extensions below, and your project should automatically run ESLint
and Prettier on save through the existing project settings configuration in
`.vscode/settings.json`:

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Learn More

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
