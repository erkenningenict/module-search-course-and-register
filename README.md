# Ontkoppelen Licentie - React App

## Installation

Run `npm install` in the `aanvragen-licentie` folder

## Configuration

Use `@erkenningen/config` to get the global configuration.

## Run locally

Run `npm start` to start the React app locally (`http://localhost:3000`).

### Cors

Make sure you disable CORS add custom CORS response headers using a browser extension.

E.g. **ModHeader** for Chrome which allows to set a custom response header for `Access-Control-Allow-Origin` with value `http://localhost:3000`.

### Cookies

To emulate a logged in user we need to add a cookie to the running React app. This can also be done using **ModHeader** bij add a custom request header for `Cookie` with a Cookie value grabbed from the production site. Use Chrome DevTools to inspect an authenticated request and copy the Cookie header value. 

## Building

> Note: Make sure the `.env.production` configuration file is correctly set

Run `npm run build:prod`

Or use the cd tool.
