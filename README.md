# Toy Robot Simulator

The goal of this project is to demonstrate a Proof of Concept of a simple user controlled entity/character moving around a bounded 2D space on screen.

It can either be run locally (see instructions below). Or visit the Github-Pages hosted application at https://michaelkoswara.github.io/toyrobot/

## [Important note]

This initial template for this project is "create-react-app".
**Although this is famous and has been around for awhile, there is a design flaw of this development server that leads
to encountering an NPM Audit warning of 8 or so packages during installation.
This is widely known and for the purpose of Proof of Concept it should be fine.** 
More info here: https://overreacted.io/npm-audit-broken-by-design/

For the future, there is a growing alternative called "vite" that I have also used in the past.

## External packages used
- react-hook-form (Mainly for form validation. I have also used Formik in the past).
- react-testing-library for rendering the asserting react components for the purpose unit testing.
- husky ( to setup pre-commit hook)
- prop-types ( to add runtime validation of input props of the components ).

## Starting the app locally

- Make sure the installed node version is at least 18.17.1 ( install nvm and run `nvm install 18.17.1`). Or observe the `.nvmrc` file
- Clone the repo, or if you have the zip, then unzip it.
- `cd` into the directory of the app and run `npm run setup`. This will install initial dependencies and start the local server on localhost:3000

## Unit testing

- run `npm run test` from the root directory of the app

## Building an optimized package for deployment

- run `npm run build` from the root directory

## Pre-commit hook
- There is a basic pre-commit hook that is automatically run when you do `git commit`.
- The hook runs `npm lint:fix`. It will fix minor code style issue and report on any other errors to fix before commiting.



## Screenshot

<img width="400" alt="Screenshot of the app Toy Robot" src="https://github.com/michaelkoswara/toyrobot/assets/3031000/1b33fcce-8ca7-4e3e-9b47-b196ec625fb6">

