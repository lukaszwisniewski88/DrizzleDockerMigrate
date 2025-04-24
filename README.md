# Drizzle Migrator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)

## Overview

Drizzle Migrator is a robust, containerized solution designed to seamlessly manage database migrations for your Drizzle Kit projects. This lightweight application operates within a Docker container and handles the automated application of migrations to your database infrastructure.

## Features

- **Universal Compatibility**: Works with any Drizzle Kit project structure
- **Containerized Operation**: Runs in an isolated Docker environment for consistent deployment
- **Zero Configuration**: Simple volume mounting for immediate functionality
- **Automatic Migration Detection**: Identifies and applies all pending migrations
- **Idempotent Execution**: Safe to run multiple times without duplicate migrations

## Quick Start

```bash
docker run -v /path/to/your/migrations:/app/migrations \
  -e DATABASE_URL="postgresql://user:password@db:5432/mydb" \
  drizzle-migrator:latest
```

## Installation

Pull the Docker image:

```bash
docker pull drizzle-migrator:latest
```

## Configuration

### Required Volume Mount

You **must** attach a volume with your migrations folder to the container path:

```
/app/migrations
```

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| DATABASE_URL | Connection string for your database | Yes | - |
| MIGRATION_LOCK_TIMEOUT | Timeout in seconds for migration locks | No | 30 |
| LOG_LEVEL | Logging verbosity (debug, info, warn, error) | No | info |

## Usage Examples

### Basic Usage

```bash
docker run -v ./migrations:/app/migrations \
  -e DATABASE_URL="postgresql://user:password@db:5432/mydb" \
  drizzle-migrator:latest
```

### Within Docker Compose

```yaml
services:
  db:
    image: postgres:14
    # ... database configuration ...

  migrator:
    image: drizzle-migrator:latest
    volumes:
      - ./migrations:/app/migrations
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/mydb
    depends_on:
      - db
```

## License

MIT
