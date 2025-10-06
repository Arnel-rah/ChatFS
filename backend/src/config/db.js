
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Vérification des variables d'environnement
const requiredEnvVars = ["PGUSER", "PGHOST", "PGDATABASE", "PGPASSWORD", "PGPORT"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(` Missing environment variable: ${key}`);
    process.exit(1);
  }
});

// Création du pool de connexions PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  ssl: process.env.PGSSL === "true",
});

// Test de connexion
(async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected successfully!");
    client.release();
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err.message);
    process.exit(1);
  }
})();

export default pool;
