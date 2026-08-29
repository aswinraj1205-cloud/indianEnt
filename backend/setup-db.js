const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const seedInterviews = [
  {
    entrepreneur_name: 'Ritesh Agarwal',
    company_name: 'OYO Rooms',
    role_title: 'Founder & CEO',
    industry_tag: 'Startups',
    hook_description: 'How Ritesh Agarwal built OYO Rooms from a single budget hotel in Gurgaon to a global hospitality chain, overcoming immense operational and scaling hurdles.',
    thumbnail_url: '/oyo-founder.jpg',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    audio_embed_url: 'https://open.spotify.com/embed/show/3rZ2iG8S6H4f78kI4tWz1l', // Placeholder show
    youtube_link: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    instagram_link: 'https://instagram.com/riteshagar',
    spotify_link: 'https://open.spotify.com/show/3rZ2iG8S6H4f78kI4tWz1l',
    linkedin_link: 'https://linkedin.com/in/riteshagarwal',
    runtime: '28:15',
    published_date: '2026-07-20'
  },
  {
    entrepreneur_name: 'Sundar Pichai',
    company_name: 'Google & Alphabet',
    role_title: 'CEO',
    industry_tag: 'Technology',
    hook_description: 'From Chennai to Silicon Valley: Sundar Pichai shares Google\'s AI-first roadmap, the future of Search, and leadership strategies for scaling global tech teams.',
    thumbnail_url: '/sundar-pichai.webp',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audio_embed_url: 'https://open.spotify.com/embed/show/3rZ2iG8S6H4f78kI4tWz1l',
    youtube_link: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    instagram_link: 'https://instagram.com/sundarpichai',
    spotify_link: 'https://open.spotify.com/show/3rZ2iG8S6H4f78kI4tWz1l',
    linkedin_link: 'https://linkedin.com/in/sundarpichai',
    runtime: '34:50',
    published_date: '2026-07-28'
  },
  {
    entrepreneur_name: 'Neal Mohan',
    company_name: 'YouTube',
    role_title: 'CEO',
    industry_tag: 'Technology',
    hook_description: 'Empowering creators worldwide: Neal Mohan discusses the evolution of digital video, AI integration in media platforms, and scaling YouTube as a global cultural phenomenon.',
    thumbnail_url: '/neal-mohan.avif',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audio_embed_url: 'https://open.spotify.com/embed/show/3rZ2iG8S6H4f78kI4tWz1l',
    youtube_link: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    instagram_link: 'https://instagram.com/nealmohan',
    spotify_link: 'https://open.spotify.com/show/3rZ2iG8S6H4f78kI4tWz1l',
    linkedin_link: 'https://linkedin.com/in/nealmohan',
    runtime: '22:10',
    published_date: '2026-08-01'
  },
  {
    entrepreneur_name: 'Sir Richard Branson',
    company_name: 'Virgin Group',
    role_title: 'Founder',
    industry_tag: 'Entrepreneurship',
    hook_description: 'Screw it, let\'s do it: Sir Richard Branson on building a global brand that spans airlines, space travel, and hotels, and the critical role of resilience in the founder\'s journey.',
    thumbnail_url: '/richard-branson.jpg',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audio_embed_url: 'https://open.spotify.com/embed/show/3rZ2iG8S6H4f78kI4tWz1l',
    youtube_link: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    instagram_link: 'https://instagram.com/richardbranson',
    spotify_link: 'https://open.spotify.com/show/3rZ2iG8S6H4f78kI4tWz1l',
    linkedin_link: 'https://linkedin.com/in/rbranson',
    runtime: '41:30',
    published_date: '2026-08-03'
  }
];

async function run() {
  console.log('[Setup DB] Starting MySQL database initialization...');

  // Create connection configuration without selecting a database first
  const connectionConfig = {
    host: DB_HOST || 'localhost',
    port: parseInt(DB_PORT || '3306', 10),
    user: DB_USER || 'root',
    password: DB_PASSWORD || ''
  };

  let connection;

  try {
    connection = await mysql.createConnection(connectionConfig);
    console.log('[Setup DB] Connected to MySQL host successfully.');

    const dbName = DB_NAME || 'entrepreneur_db';

    // 1. Create database
    console.log(`[Setup DB] Creating database '${dbName}' if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);

    // 2. Select database
    console.log(`[Setup DB] Using database '${dbName}'...`);
    await connection.query(`USE \`${dbName}\`;`);

    // 3. Create tables
    console.log('[Setup DB] Creating table \'registrations\'...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        role_title VARCHAR(255) NOT NULL,
        industry VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company_website VARCHAR(255) NULL,
        linkedin VARCHAR(255) NULL,
        instagram VARCHAR(255) NULL,
        company_stage VARCHAR(50) NOT NULL,
        pitch TEXT NOT NULL,
        how_heard VARCHAR(100) NULL,
        consent TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('[Setup DB] Creating table \'interviews\'...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS interviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        entrepreneur_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        role_title VARCHAR(255) NOT NULL,
        industry_tag VARCHAR(100) NOT NULL,
        hook_description TEXT NOT NULL,
        thumbnail_url VARCHAR(500) NOT NULL,
        video_embed_url VARCHAR(500) NULL,
        audio_embed_url VARCHAR(500) NULL,
        youtube_link VARCHAR(500) NULL,
        instagram_link VARCHAR(500) NULL,
        spotify_link VARCHAR(500) NULL,
        linkedin_link VARCHAR(500) NULL,
        runtime VARCHAR(50) NOT NULL,
        published_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Seed tables
    console.log('[Setup DB] Checking if \'interviews\' already contains data...');
    const [rows] = await connection.query('SELECT COUNT(*) AS count FROM interviews');
    
    if (rows[0].count === 0) {
      console.log('[Setup DB] Seeding default interviews...');
      for (const item of seedInterviews) {
        await connection.query(
          `INSERT INTO interviews (
            entrepreneur_name, company_name, role_title, industry_tag, hook_description, 
            thumbnail_url, video_embed_url, audio_embed_url, youtube_link, instagram_link, 
            spotify_link, linkedin_link, runtime, published_date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.entrepreneur_name, item.company_name, item.role_title, item.industry_tag, item.hook_description,
            item.thumbnail_url, item.video_embed_url, item.audio_embed_url, item.youtube_link, item.instagram_link,
            item.spotify_link, item.linkedin_link, item.runtime, item.published_date
          ]
        );
      }
      console.log('[Setup DB] Seeding completed successfully.');
    } else {
      console.log('[Setup DB] Table \'interviews\' is already seeded.');
    }

    console.log('[Setup DB] MySQL Database setup finished successfully!');
  } catch (error) {
    console.error('[Setup DB] Error setting up database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

run();
