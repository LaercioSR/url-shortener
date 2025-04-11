# URL Shortener

A API for shortening URLs.

## Summary

- [About](#about)
- [Features](#features)
- [How to run](#how-to-run)
  - [Prerequisites](#prerequisites)
  - [Running with Docker](#running-with-docker)
  - [Running without Docker](#running-without-docker)
  - [Accessing the application](#accessing-the-application)
- [Suggestion for Future Improvements](#suggestion-for-future-improvements)
  - [Additional Features](#additional-features)
  - [Code Quality and Improvements](#code-quality-and-improvements)
- [Technologies](#technologies)

## About

This project is a URL shortener API built with Node.js, Express, TypeScript, and PostgreSQL. It allows users to create short URLs that redirect to long URLs, and authenticated users can list, delete, and update short URLs created by them. The project is designed to be simple and easy to use, with a focus on performance and scalability.

See [CHANGELOG.md](CHANGELOG.md) for the list of changes made to the project.

## Features

- [x] Create a short URL;
  - [x] Link the short URL with authenticated user;
- [x] Redirect to the original URL;
  - [x] Track the number of clicks on the short URL;
- [x] Create user accounts;
- [x] Authenticate users;
- [x] List all short URLs created by a user;
- [x] Delete a short URL;
- [x] Update a short URL;

## How to run

### Prerequisites

You can run the project in two ways: with Docker or without Docker. Case you want to run the project with Docker, you need to have Docker and Docker Compose installed on your machine. You can download Docker from the [Docker website](https://www.docker.com/products/docker-desktop) and follow the installation instructions.

To run the project without Docker, you need to have the following prerequisites installed on your machine:

- Node.js (v18 or higher). Access the [Node.js website](https://nodejs.org/) to download and install the latest version.
- PostgreSQL (v15 or higher). Access the [PostgreSQL website](https://www.postgresql.org/download/) to download and install the latest version.

With everything installed, run the following commands to download the project:

```bash
git clone git@github.com:LaercioSR/url-shortener.git
cd url-shortener
```

Then, copy the `.env.example` file to `.env` and set the environment variables.

```bash
cp .env.example .env
```

### Running with Docker

To run the project with Docker, run the following command:

```bash
docker compose -f 'docker-compose.yml' up -d --build
```

### Running without Docker

To run the project without Docker, run the following command:

```bash
npm install
npm run typeorm migration:run
npm run dev
```

### Accessing the application

If everything is set up correctly, you should be able to access the application at `http://localhost:3000` or on another port if you change the `.env` file. The documentation for the API is available at `http://localhost:3000/docs`.

### Testing and Linting

The project includes unit and e2e tests to ensure that the code is working as expected. The tests are written using Jest and Supertest, and they cover all the functionalities of the API. Also use SQLite in memory for testing purposes. The tests are run using the following command:

```bash
npm run test
```

The linter is configured to use ESLint and Prettier, and the configuration files are located in the root of the project. To run the linter, run the following command:

```bash
npm run lint
# To run check code format
npm run format
```

To run the linter and fix the issues, run the following command:

```bash
npm run lint:fix
```

## Suggestion for Future Improvements

The project was built with the intention of being a simple and easy-to-use URL shortener API, and it was built in short time. Below are some suggestions for future improvements that could be made to the project:

### Additional Features

The project covers all the proposed functionalities well, but new functionalities could be added, such as:

- Adding a custom alias for the short URL by authenticated users;
- Adding a custom expiration date for the short URL by authenticated users;
- Counting the number of unique clicks on the short URL by IP address;

### Code Quality and Improvements

The project is well-structured and follows best practices, but there are always improvements that can be made. Some suggestions include:

- Adding more tests to cover all edge cases;
- Adding dependency injection to the project;
- Adding a caching layer to improve performance;
- Adding a rate limiting feature to prevent abuse of the API;
- Modularizing and separating the code into microservices, allowing for better horizontal scalability and maintainability;
- Implementing a more robust error handling mechanism.
- Adding a logging library to log errors and important events;
- Adding a monitoring tool to monitor the performance and health of the application;
- Adding type validation to the request and response objects to ensure that the data being sent and received is valid.

## Technologies

- Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine.
- TypeScript - A superset of JavaScript that compiles to clean JavaScript output.
- Express - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- PostgreSQL - A powerful, open source object-relational database system.
- TypeORM - An ORM for TypeScript.
- Docker - A platform for developing, shipping, and running applications in containers.
- Docker Compose - A tool for defining and running multi-container Docker applications.
- Jest - A delightful JavaScript testing framework with a focus on simplicity.
- Supertest - A super-agent driven library that allows you to test HTTP servers in Node.js.
- ESLint - A tool for identifying and reporting on patterns in JavaScript.
- Prettier - An opinionated code formatter.
- Husky - A tool that prevents bad `git commit`, `git push`, and more by using hooks. Used for testing and linting code before committing.
- Swagger - A tool for documenting APIs.
- GitHub Actions - A CI/CD tool that automates the process of building, testing, and deploying code. Used for continuous integration.
- JWT (JSON Web Tokens) - A compact, URL-safe means of representing claims to be transferred between two parties. Used for authentication.
