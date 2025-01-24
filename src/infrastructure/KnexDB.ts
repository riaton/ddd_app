import knex, { Knex } from "knex";

const config: Knex.Config = {
    client: "pg",
    connection: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_NAME || "postgres"
    }
}

const db = knex(config);

export default db;