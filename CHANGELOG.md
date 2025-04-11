# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

### Added

- Now when an user is authenticated all the URLs created are linked to the user.
- New route to get all the URLs created by the user.

### Changed

- Docker configuration to get port from environment variable.

## [0.5.0] - 2025-04-11

### Added

- Redirect route to redirect the shortened URL to the original URL.
- Error code for better identification of errors.
- Route to create a new user.
- Route to log in with an existing user.

### Changed

- Table name from `short_url` to `short_urls`.
- Folder name from `src/aplication` to `src/application`.

### Removed

- Table for relationship between the user and the short URL.

## [0.4.0] - 2025-04-10

### Added

- Function to validate the URL.
- Route to shorten the URL, salvage the URL, and return the shortened URL.

### Changed

- Table name from `short_urls` to `short_url`.

## [v0.3.0] - 2025-04-10

### Added

- Dockerfile and docker-compose configuration to run the application in a containerized environment.
- Database configuration with TypeORM to connect to PostgreSQL.
  - Added migrations to create the database schema.
- Generator of random code with 6 alphanumeric characters for the shortened URL.
- More information in the README file about how to run the project.

## [v0.2.0] - 2025-04-09

### Added

- API documentation with Swagger configuration.
- Automatic testing with Jest and Supertest configuration.
- Code styling with ESLint and Prettier configuration to ensure code pattern consistency.
- Pre-commit and pre-push hook with Husky to ensure code quality.

## [v0.1.0] - 2025-04-09

### Added

- Initial configuration for the project.
- Basic structure for the project.
- Basic server setup with Express.
- Changelog file to track changes.
- Readme file with the features that will be added later.
