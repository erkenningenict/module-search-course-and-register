# Module Search course and register - Vite React App

## Installation

Run `npm install`

## Configuration

Use `@erkenningen/config` to get the global configuration and `@erkenningen.nl/ui` for the UI.

## Run locally

Run `npm start` to start the Vite React app locally (`http://localhost:3031`).

### Cors

Make sure you disable CORS add custom CORS response headers using a browser extension.

E.g. **ModHeader** for Chrome which allows to set a custom response header for `Access-Control-Allow-Origin` with value `http://localhost:3031`.

### Cookies

To emulate a logged in user we need to add a cookie to the running React app. This can also be done using **ModHeader** bij add a custom request header for `Cookie` with a Cookie value grabbed from the production site. Use Chrome DevTools to inspect an authenticated request and copy the Cookie header value.

Optionally add a `Cookie` with value: `authentication=; .DNN_Keurmerken=D3695B2F49D98A283BDA2E9948D94A3C875480A0718A44BACB9CB9234B4FD8DEBF49CA01350692C43E8295847598C6FDB4A903ADCB62A9E543FC04AEEE347BBD846B837D1A88BC0175EF52001B38E0110D390C32ED74C2B48AFF6EEFEF6D56B70FC97815E36064BCB16C1CD50D041100C86F2301FC41335C3A2F830C0724C901484EAC47;`

## Building

> Note: Make sure the `.env.production` configuration file is correctly set

Run `npm run build:prod`

## Publishing

When work is done, the master branch will be published to Netlify on url: https://erkenningen-module-search-course-and-register.netlify.com/

Use this url to publish in DNN with the ReactModuleLoader module, where this url is set in the settings (login as Host to set this).
