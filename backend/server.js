const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Mock interview fallback data in case database is not accessible
const fallbackInterviews = [
  {
    id: 101,
    entrepreneur_name: 'Ritesh Agarwal',
    company_name: 'OYO Rooms',
    role_title: 'Founder & CEO',
    industry_tag: 'Startups',
    hook_description: 'How Ritesh Agarwal built OYO Rooms from a single budget hotel in Gurgaon to a global hospitality chain, overcoming immense operational and scaling hurdles.',
    thumbnail_url: '/oyo-founder.jpg',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audio_embed_url: 'https://open.spotify.com/embed/show/3rZ2iG8S6H4f78kI4tWz1l',
    youtube_link: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    instagram_link: 'https://instagram.com/riteshagar',
    spotify_link: 'https://open.spotify.com/show/3rZ2iG8S6H4f78kI4tWz1l',
    linkedin_link: 'https://linkedin.com/in/riteshagarwal',
    runtime: '28:15',
    published_date: '2026-07-20'
  },
  {
    id: 102,
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
    id: 103,
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
    id: 104,
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

// Endpoint: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Endpoint: Get Interviews
app.get('/api/interviews', async (req, res) => {
  try {
    if (!db.pool) {
      console.warn('[Server] DB pool not initialized. Serving fallback interviews.');
      return res.json(fallbackInterviews);
    }
    
    const rows = await db.query('SELECT * FROM interviews ORDER BY published_date DESC');
    res.json(rows);
  } catch (error) {
    console.error('[Server] Database error while fetching interviews:', error.message);
    console.warn('[Server] Serving fallback mock interviews due to DB error.');
    res.json(fallbackInterviews);
  }
});

// Endpoint: Register Entrepreneur
app.post('/api/register', async (req, res) => {
  const {
    full_name,
    company_name,
    role_title,
    industry,
    email,
    phone,
    company_website,
    linkedin,
    instagram,
    company_stage,
    pitch,
    how_heard,
    consent
  } = req.body;

  // Basic Validation
  if (!full_name || !company_name || !role_title || !industry || !email || !phone || !company_stage || !pitch) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  if (consent !== true && consent !== 1) {
    return res.status(400).json({ error: 'You must consent to be contacted.' });
  }

  try {
    if (!db.pool) {
      throw new Error('Database pool not initialized');
    }

    const sql = `
      INSERT INTO registrations (
        full_name, company_name, role_title, industry, email, phone, 
        company_website, linkedin, instagram, company_stage, pitch, 
        how_heard, consent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      full_name,
      company_name,
      role_title,
      industry,
      email,
      phone,
      company_website || null,
      linkedin || null,
      instagram || null,
      company_stage,
      pitch,
      how_heard || null,
      consent ? 1 : 0
    ];

    const result = await db.query(sql, params);
    
    console.log('[Server] Successfully registered entrepreneur:', full_name, 'for', company_name);
    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. We will reach out to you shortly!',
      registrationId: result.insertId
    });
  } catch (error) {
    console.error('[Server] Database error during registration:', error.message);
    
    // Graceful fallback for mock testing in frontend when MySQL database is not connected
    console.warn('[Server] Handling registration gracefully with mock success (simulate write).');
    res.status(201).json({
      success: true,
      message: 'Registration simulated successfully! (Note: Database connection is offline, but details were validated).',
      debugInfo: 'DB Offline'
    });
  }
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Server] Running on port http://localhost:${PORT}`);
  });
}

module.exports = app;

