# React homeWeb

A project for raspberry pi web control with a node.js backend and react frontend

## Get Started

1. Clone this repository

```bash
git clone https://github.com/jasondb1/homeWeb.git
```

2. Change into the directory that was cloned and run `npm install`

```bash
cd homeWeb && npm install
```

## Running The App

In development, the app runs via two separate processes...

### Start the Express Server

```bash
node server/server.js
```

### Start Create React App

In a different terminal tab...

```bash
npm start
```

## Building For Production

In production, you want Express to serve up your app.

### Build React App

```bash
npm build
```

Now start the Express server from the server folder

```bash
cd server
npm start
```

Your entire application is now running on port 3001.

Everything in the `server` folder is what is needed in production. Those are all of the build assets. 
