FROM docker.io/oven/bun:1-slim AS base
WORKDIR /app

FROM base AS deps
WORKDIR /app
COPY bun.lock .
COPY package.json .
RUN bun i --frozen-lockfile

FROM base
WORKDIR /app
COPY  --from=deps /app .
COPY migrator.ts .
# We don't copy migrations dir, it will be mounted as volume at runtime
# A placeholder empty directory ensures the path exists
RUN mkdir -p ./migrations
CMD ["bun", "run", "migrator.ts","--", "--folder", "./migrations"]
