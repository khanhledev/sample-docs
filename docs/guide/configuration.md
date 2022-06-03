# Getting Started 

## Development setup
On your local machine make sure to setup an environment variable for the npm token private packages. You can request a token from any frontend developer with access to the private packages. eg
MacOS:
```bash
$ export NPM_TOKEN=your_token
```

Windows:
```bash
$ setx NPM_TOKEN "your_token"
```

Change to app directory:
```bash
$ cd app
```

Project setup:
```bash
$ npm install
```

Compiles and hot-reloads for development:
```bash
$ npm run serve
```
Compiles and minifies for production:
```bash
$ npm run build
```
Run your unit tests:
```bash
$ npm run test
```