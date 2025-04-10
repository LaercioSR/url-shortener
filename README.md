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
- [Technologies](#technologies)

## About

This project is a URL shortener API built with Node.js, Express, TypeScript, and PostgreSQL. It allows users to create short URLs that redirect to long URLs. The project is designed to be simple and easy to use, with a focus on performance and scalability.

See [CHANGELOG.md](CHANGELOG.md) for the list of changes made to the project.

## Features

- [ ] Create a short URL;
  - [ ] Link the short URL with authenticated user;
- [ ] Redirect to the original URL;
  - [ ] Track the number of clicks on the short URL;
- [ ] Create user accounts;
- [ ] Authenticate users;
- [ ] List all short URLs created by a user;
- [ ] Delete a short URL;
- [ ] Update a short URL;

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
docker-compose up -d
```

### Running without Docker

To run the project without Docker, run the following command:

```bash
npm install
npm run typeorm migration:run
npm run dev
```

### Accessing the application

If everything is set up correctly, you should be able to access the application at `http://localhost:3000` or on another port if you change the `.env` file.

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
