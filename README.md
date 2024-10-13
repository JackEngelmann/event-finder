# Lieblingsclub

## Context

This project originated from an "I have a business idea, I just need an IT person"-situation. The idea was to build a website to find local events (starting in Dresden). We abandoned the project around the time of Covid-19.

## Getting started

### Prerequisites

- Node must be installed. The code currently only runs on old node versions (e.g. node v10).
- MySQL must be installed.

### Create DBs

Create local development database:
1. connect to mysql as `root` user: `mysql -u root -p`
2. create user: `CREATE USER 'lieblingsclub'@'localhost';`
3. create development DB: `CREATE DATABASE lieblingsclub;`
4. grant user access to DB: `GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON lieblingsclub.* TO 'lieblingsclub'@'localhost';`

These steps are based on [this tutorial](https://matomo.org/faq/how-to-install/faq_23484/).

### Start Backend

1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Build app in development mode: `npm run build-develop` (runs in watch mode)
3. Start: `npm run start`

### Start Frontend

1. Navigate to client directory: `cd client`
2. Install dependencies: `npm install`
3. Start: `npm run start`

## Testing 

### Backend

To run the backend tests, the database `lieblingsclubtest` must be created. Steps:
1. connect to mysql as `root` user: `mysql -u root -p`
2. create user (if not done yet for the development DB): `CREATE USER 'lieblingsclub'@'localhost';`
3. create development DB: `CREATE DATABASE lieblingsclubtest;`
4. grant user access to DB: `GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON lieblingsclubtest.* TO 'lieblingsclub'@'localhost';`

Then, `npm run test` can be used to run the tests (must be in `backend` directory).

### End-to-End Tests

To run end-to-end tests, the backend must be running.
Then you can navigate to the `client` directory and run `npm run cypress:open` to see the cypress UI.

