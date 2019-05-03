# Contributing

## Requirements

You'll need the following software to contribute into function analytics on your machine:

- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Angular cli](https://cli.angular.io/)
- [Webpack](https://www.npmjs.com/package/webpack)
- [Webpack cli](https://www.npmjs.com/package/webpack-cli)

## Fork

Go to [GitHub](https://github.com/interactive-apps/function-analytics) and fork the repository under your account.

Clone the repository:

    git clone git@github.com:interactive-apps/function-analytics

## Install

Go in the repo and run maven:

    npm install
    npm run build

Function analytics is divided between three key parts:
1. Function analytics source code inside /src
2. Documentation folder generated into /docs
3. Tutorials folder found in /tutorials

These commands should install all dependencies, run tests and build source codes. If you face any errors, make sure you have installed all mentioned requirements.

## Run locally

Start with adding fn-analytics to your project:

`npm install @iapps/function-analytics`

After installing you will be able to import the library into your project by using the files in the `lib` folder:

```js
// Using ES2015 imports
import { Fn } from '@iapps/function-analytics';

// Using CommonJS imports
var Fn = require('@iapps/function-analytics').Fn;
```

## Initializing the library

To be able to use fn-analytics you will first need to initialise the library. This is required to let the library know where it should load its data from.

```js
Fn.init({
  baseUrl: 'api_url_to_dhis_server',
  username: 'username', //Optional if in a DHIS app
  pasword: 'password' //Optional if in a DHIS app
});
```