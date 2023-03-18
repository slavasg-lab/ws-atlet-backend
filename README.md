# WS Atlet Backend
## Description
An app designed to collect data using WebSocket for project atlet.
## Testing
```
$ npm run test
```
## Starting the application
```
$ npm run start
```
## Run database in docker

```bash
$ npm run docker:up
```

## Run database migrations

```bash
$ npx prisma migrate dev
```

## Seeding the database

A database should be seeded every time before using because otherwise there is no way to onboard a new users.

https://www.prisma.io/docs/guides/database/seed-database

For development purposes, there should be a predefined set of accounts (e.g. 3 accounts) with a `public_key`.

To seed the database, run the following command:

```bash
$ npx prisma db seed
```

## Prisma Studio

```bash
$ npx prisma studio
```

## Check if hypertable was created

```bash
docker exec -ti [container-name] psql -U timescaledb -d timescaledb -c "SELECT * FROM timescaledb_information.hypertables;"
```