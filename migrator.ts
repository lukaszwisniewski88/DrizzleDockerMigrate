import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
// biome-ignore lint/style/useNodejsImportProtocol: it will be a bun runtime
import { parseArgs } from "util";
import dot from "dotenv";
dot.config();
// biome-ignore lint/nursery/noProcessEnv: <explanation>
const database = process.env?.DATABASE_URL as string;

if (!database) {
  throw new Error("DATABASE_URL is not defined");
}

const db = drizzle(database);

async function applyMigrations(connection: typeof db, folder: string) {
  await migrate(connection, {
    migrationsFolder: folder,
  });
}

async function main() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      folder: {
        type: "string",
      },
    },
    allowPositionals: true,
    strict: true,
  });

  await applyMigrations(db, values.folder || "./migrations");
}

main()
  .then(() => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log("Migrations applied successfully");
    process.exit(0);
  })
  .catch((e) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Migration failed", e);
    process.exit(1);
  });
