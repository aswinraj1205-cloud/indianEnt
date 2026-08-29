-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS entrepreneur_db;
USE entrepreneur_db;

-- Table for user registrations / pitch form
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

-- Table for past interviews (Portfolio / Archive)
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
