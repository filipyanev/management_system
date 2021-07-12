# Employee Management System

> Simple employee record management system

> Used stack - NodeJS, Express, Sequalize, Postgres, EJS


# Quick Start

## Configuraiton
> add .env file to your root directory and setup required variables:

> PG_DB_CONNECTION_STRING=postgres://{user}:{password}@localhost{port}/{dbname}

## Install dependencies
> npm install

## Serve
by default on localhost:3000
> npm start

## Dev Server
> npm run dev


# Available Pages
> '/' - landing page

> '/employees' - table with all employees

> '/employees/:employeeId' - employee personal information and related comments

> '/employees/:employeeId/:commentId' - edit employee comment

> '/search' - search employees


