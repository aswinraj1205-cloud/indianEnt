const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool config
const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'entrepreneur_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

try {
  pool = mysql.createPool(poolConfig);
  console.log(`[Database] Pool configured for host: ${poolConfig.host}:${poolConfig.port}, user: ${poolConfig.user}, database: ${poolConfig.database}`);
} catch (error) {
  console.error('[Database] Failed to create connection pool:', error.message);
}

module.exports = {
  pool,
  poolConfig,
  query: async (sql, params) => {
    if (!pool) {
      throw new Error('Database pool is not initialized');
    }
    const [results] = await pool.execute(sql, params);
    return results;
  }
};
