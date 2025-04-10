# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-04-10

### Added

- Function to validate the URL.
- Route to shorten the URL, salvage the URL, and return the shortened URL.

### Changed

- Change name table from `short_urls` to `short_url`.

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
