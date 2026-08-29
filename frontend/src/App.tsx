import React, { useState, useEffect } from 'react';
import {
  Play,
  ArrowRight,
  Linkedin,
  Instagram,
  Youtube,
  CheckCircle2,
  X,
  Menu,
  Mic,
  TrendingUp,
  Video,
  Send,
  Users,
  Globe,
  Award,
  Sparkles
} from 'lucide-react';

// Define Interview Type
interface Interview {
  id: number;
  entrepreneur_name: string;
  company_name: string;
  role_title: string;
  industry_tag: string;
  hook_description: string;
  thumbnail_url: string;
  video_embed_url?: string;
  audio_embed_url?: string;
  youtube_link?: string;
  instagram_link?: string;
  spotify_link?: string;
  linkedin_link?: string;
  runtime: string;
  published_date: string;
}

// Simple Apply Form Type
interface ApplyForm {
  name: string;
  email: string;
  mobile: string;
  companyName: string;
  website: string;
}

type ApplyFormErrors = Partial<Record<keyof ApplyForm, string>>;

const localFallbackInterviews: Interview[] = [
  {
    id: 101,
    entrepreneur_name: 'Ritesh Agarwal',
    company_name: 'OYO Rooms',
    role_title: 'Founder & CEO',
    industry_tag: 'Startups',
    hook_description: 'How Ritesh Agarwal built OYO Rooms from a single budget hotel in Gurgaon to a global hospitality chain, overcoming immense operational and scaling hurdles.',
    thumbnail_url: '/oyo-founder.jpg',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    hook_description: "From Chennai to Silicon Valley: Sundar Pichai shares Google's AI-first roadmap, the future of Search, and leadership strategies for scaling global tech teams.",
    thumbnail_url: '/sundar-pichai.webp',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    hook_description: "Screw it, let's do it: Sir Richard Branson on building a global brand that spans airlines, space travel, and hotels, and the critical role of resilience in the founder's journey.",
    thumbnail_url: '/richard-branson.jpg',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtube_link: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    instagram_link: 'https://instagram.com/richardbranson',
    spotify_link: 'https://open.spotify.com/show/3rZ2iG8S6H4f78kI4tWz1l',
    linkedin_link: 'https://linkedin.com/in/rbranson',
    runtime: '41:30',
    published_date: '2026-08-03'
  }
];

export default function App() {
  // Navigation State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Hero Slider
  const heroSlides = [
    { src: '/sundar-pichai.webp',   alt: 'Sundar Pichai',      name: 'Sundar Pichai',      role: 'CEO, Google & Alphabet',   facePos: '75% 15%' },
    { src: '/oyo-founder.jpg',     alt: 'Ritesh Agarwal',     name: 'Ritesh Agarwal',     role: 'Founder & CEO, OYO',       facePos: '50% 10%' },
    { src: '/neal-mohan.avif',      alt: 'Neal Mohan',         name: 'Neal Mohan',         role: 'CEO, YouTube',             facePos: '50% 20%' },
    { src: '/richard-branson.jpg', alt: 'Richard Branson',    name: 'Sir Richard Branson', role: 'Founder, Virgin Group',    facePos: '20% 15%' },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Selected Interview for video modal
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  // Apply Modal State
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState<ApplyForm>({
    name: '',
    email: '',
    mobile: '',
    companyName: '',
    website: ''
  });
  const [applyErrors, setApplyErrors] = useState<ApplyFormErrors>({});
  const [applySubmitting, setApplySubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // Track Navbar Scroll & Active Section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'register', 'contact'];
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply Form Handlers
  const handleApplyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplyForm(prev => ({ ...prev, [name]: value }));
    if (applyErrors[name as keyof ApplyForm]) {
      setApplyErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateApplyForm = (): boolean => {
    const errors: ApplyFormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!applyForm.name.trim()) errors.name = 'Your full name is required.';
    if (!applyForm.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(applyForm.email)) {
      errors.email = 'Please enter a valid email.';
    }
    if (!applyForm.mobile.trim()) {
      errors.mobile = 'Mobile number is required.';
    }
    if (!applyForm.companyName.trim()) errors.companyName = 'Company name is required.';
    if (!applyForm.website.trim()) errors.website = 'Company website is required.';
    setApplyErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateApplyForm()) return;
    setApplySubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setApplySuccess(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setApplySubmitting(false);
    }
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setApplySuccess(false);
    setApplyForm({ name: '', email: '', mobile: '', companyName: '', website: '' });
    setApplyErrors({});
  };

  // Scroll to section
  const handleScrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };



  return (
    <div>
      {/* ======= NAVBAR ======= */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleScrollToSection('home'); }} className="logo">
            <div className="logo-icon-wrap">
              <img src="/indiaent-logo.jpg" alt="Indian Entrepreneur Logo" className="logo-img" />
            </div>
            <div className="logo-text-wrap">
              <span className="logo-main">INDIAN<span className="logo-accent">ENTREPRENEUR</span></span>
              <span className="logo-tagline">Founder Conversations</span>
            </div>
          </a>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            {['home', 'about', 'register', 'contact'].map(section => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => { e.preventDefault(); handleScrollToSection(section); }}
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                >
                  {section === 'register' ? 'Apply' : section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* ======= HERO SECTION — Full Landscape Background ======= */}
      <header id="home" className="hero-section">

        <div className="container hero-grid">

          {/* LEFT — Sliding Portrait Carousel */}
          <div className="hero-visual">
            <div className="hero-slider">
              {heroSlides.map((slide, i) => (
                <div
                  key={slide.src}
                  className={`hero-slide ${i === activeSlide ? 'hero-slide--active' : ''}`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="hero-portrait"
                    style={{ objectPosition: slide.facePos }}
                  />
                  <div className="hero-slide-label">
                    <span className="slide-label-name">{slide.name}</span>
                    <span className="slide-label-role">{slide.role}</span>
                  </div>
                </div>
              ))}
              <div className="hero-slider-dots">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    className={`slider-dot ${i === activeSlide ? 'slider-dot--active' : ''}`}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>


          </div>

          {/* RIGHT — Text Content */}
          <div className="hero-content">
            <div className="hero-badge-row">
              <span className="hero-badge"><Mic size={13} /> Exclusive Interviews</span>
              <span className="hero-badge hero-badge--alt"><Sparkles size={13} /> Global Leaders</span>
            </div>

            <h1 className="hero-title">
              Inspiring Conversations with{' '}
              <span className="hero-title-highlight">India's Greatest</span>{' '}
              Entrepreneurs
            </h1>

            <p className="hero-subtitle-line">Real Stories. Real Businesses. Real Success.</p>

            <p className="hero-description">
              Discover exclusive interviews, insightful podcasts, and powerful conversations with visionary entrepreneurs, startup founders, CEOs, investors, and industry leaders from across India. Learn how they built iconic companies and transformed ideas into global movements.
            </p>

            <div className="hero-ctas">
              <button
                id="hero-request-interview-btn"
                onClick={() => setShowApplyModal(true)}
                className="btn btn-primary btn-glow"
              >
                <Mic size={18} />
                Request for Interview
              </button>
            </div>

            {/* Stats Row */}
            <div className="hero-stats-row">
              <div className="hero-stat">
                <span className="hero-stat-num">200+</span>
                <span className="hero-stat-label">Entrepreneurs</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">50+</span>
                <span className="hero-stat-label">Countries</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">10M+</span>
                <span className="hero-stat-label">Views</span>
              </div>
            </div>
          </div>

        </div>
      </header>



      {/* ======= ABOUT SECTION — Full Landscape BG ======= */}
      <section id="about" className="about-section">

        <div className="container about-inner">
          <div className="about-text-col">
            <span className="section-eyebrow"><Award size={14} /> Our Story</span>
            <h2 className="about-title">Why We Do This.</h2>
            <p className="about-text">
              Most entrepreneur interviews are over-edited, polished PR scripts. We don't care about standard corporate press releases. We want the <em>real, unscripted truth</em> of how you built your business.
            </p>
            <p className="about-text">
              Our team sits down with you for a 45-minute casual conversation. From that single recording, we write, design, and produce a month's worth of platform-native media assets for your personal brand.
            </p>
            <div className="about-pillars">
              <div className="about-pillar">
                <span className="pillar-icon"><Users size={20} /></span>
                <div>
                  <p>To give builders the media leverage they deserve, archiving the authentic, operational truths of building companies in modern India.</p>
                </div>
              </div>
              <div className="about-pillar">
                <span className="pillar-icon"><Globe size={20} /></span>
                <div>
                  <p>To become the largest library of decentralised founder knowledge on the web, fueling the next generation of builders.</p>
                </div>
              </div>
            </div>
            <button
              id="about-request-interview-btn"
              onClick={() => setShowApplyModal(true)}
              className="btn btn-primary btn-glow"
              style={{ marginTop: '2rem' }}
            >
              <Mic size={16} /> Request for Interview <ArrowRight size={16} />
            </button>
          </div>

          {/* Process Steps */}
          <div className="process-col">
            <span className="section-eyebrow"><Video size={14} /> The Process</span>
            <h2 className="process-title">The 3-Step Content Machine</h2>
            <p className="process-subtitle">How we turn one 45-minute conversation into a full social media distribution campaign.</p>

            <div className="process-steps">
              {[
                { num: '01', icon: <Mic size={22} />, title: 'Deep-Dive Interview', desc: 'A structured but casual 45-minute conversation uncovering your pivots, scaling strategies, and company culture.' },
                { num: '02', icon: <Video size={22} />, title: 'Professional Editorial', desc: 'Our editors and copywriters extract top insights, polish audio, add visual assets, and draft platform-optimised copy.' },
                { num: '03', icon: <TrendingUp size={22} />, title: 'Cross-Platform Publish', desc: 'We syndicate to audio networks, upload to YouTube, and distribute micro-content across Instagram and LinkedIn.' },
              ].map(step => (
                <div key={step.num} className="process-step-card">
                  <span className="step-num">{step.num}</span>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform icons */}
            <div className="platforms-row">
              <div className="platform-pill"><Instagram size={16} /> Instagram</div>
              <div className="platform-pill"><Youtube size={16} /> YouTube</div>
              <div className="platform-pill"><Linkedin size={16} /> LinkedIn</div>
              <div className="platform-pill"><Mic size={16} /> Spotify</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= CTA BANNER — Request for Interview ======= */}
      <section id="register" className="cta-section">

        <div className="container cta-inner">
          <div className="cta-text">
            <span className="section-eyebrow cta-eyebrow"><Mic size={14} /> Be Featured</span>
            <h2 className="cta-title">Ready to Share Your Story with India?</h2>
            <p className="cta-desc">
              Join hundreds of visionary founders and CEOs who have amplified their brand through our platform. One conversation. Months of premium content.
            </p>
            <ul className="cta-perks">
              {[
                'Full-length video interview on YouTube',
                'Podcast episode on Spotify & Apple Podcasts',
                'Instagram reels & LinkedIn articles',
                'Professional editorial production — free',
              ].map(perk => (
                <li key={perk}><CheckCircle2 size={16} /> {perk}</li>
              ))}
            </ul>
          </div>
          <div className="cta-card">
            <div className="cta-card-inner">
              <h3>Apply in 60 Seconds</h3>
              <p>Fill in your details and our team will reach out within 48 hours.</p>
              <button
                id="cta-request-interview-btn"
                onClick={() => setShowApplyModal(true)}
                className="btn btn-primary btn-glow btn-full"
              >
                <Mic size={18} />
                Request for Interview
              </button>
              <p className="cta-card-note">No fees. No commitments. Just your story.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <a href="#home" onClick={(e) => { e.preventDefault(); handleScrollToSection('home'); }} className="footer-logo">
                <div className="logo-icon-wrap">
                  <img src="/indiaent-logo.jpg" alt="Indian Entrepreneur Logo" className="footer-logo-img" />
                </div>
                <div className="logo-text-wrap">
                  <span className="logo-main">INDIAN<span className="logo-accent">ENTREPRENEUR</span></span>
                  <span className="logo-tagline">Founder Conversations</span>
                </div>
              </a>
              <p>Uncovering the tactical playbooks and raw operational truths of builders across India. One deep-dive interview at a time.</p>
              <div className="footer-socials">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube"><Youtube size={18} /></a>
              </div>
            </div>

            <div className="footer-nav">
              <h4>Navigation</h4>
              <ul className="footer-links">
                {['home', 'about', 'register', 'contact'].map(s => (
                  <li key={s}>
                    <a href={`#${s}`} onClick={(e) => { e.preventDefault(); handleScrollToSection(s); }} className="footer-link">
                      {s === 'register' ? 'Apply' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Get in Touch</h4>
              <p>For partnerships, investor inquiries, or collaborations reach out directly at:</p>
              <p style={{ marginTop: '0.5rem' }}>
                Email: <a href="mailto:hello@indianentrepreneur.com">hello@indianentrepreneur.com</a>
              </p>
              <button
                onClick={() => setShowApplyModal(true)}
                className="btn btn-primary"
                style={{ marginTop: '1.25rem', padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
              >
                <Mic size={14} /> Request for Interview
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Indian Entrepreneur Media Ltd. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ======= APPLY MODAL ======= */}
      {showApplyModal && (
        <div className="modal-backdrop" onClick={closeApplyModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeApplyModal} aria-label="Close"><X size={22} /></button>

            {applySuccess ? (
              <div className="modal-success">
                <div className="success-icon"><CheckCircle2 size={52} /></div>
                <h3>Application Received!</h3>
                <p>Thank you for your interest. Our team will review your application and reach out within <strong>48 hours</strong>.</p>
                <button className="btn btn-primary" onClick={closeApplyModal}>Close</button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <span className="modal-eyebrow"><Mic size={14} /> Apply Now</span>
                  <h2 className="modal-title">Request for Interview</h2>
                  <p className="modal-subtitle">Share your details and we'll be in touch within 48 hours.</p>
                </div>

                <form className="apply-form" onSubmit={handleApplySubmit} noValidate>
                  <div className="form-field">
                    <label htmlFor="apply-name">Full Name *</label>
                    <input
                      id="apply-name"
                      type="text"
                      name="name"
                      value={applyForm.name}
                      onChange={handleApplyInput}
                      placeholder="e.g. Sundar Pichai"
                      className={applyErrors.name ? 'input-error' : ''}
                    />
                    {applyErrors.name && <span className="field-error">{applyErrors.name}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="apply-email">Email Address *</label>
                    <input
                      id="apply-email"
                      type="email"
                      name="email"
                      value={applyForm.email}
                      onChange={handleApplyInput}
                      placeholder="e.g. you@company.com"
                      className={applyErrors.email ? 'input-error' : ''}
                    />
                    {applyErrors.email && <span className="field-error">{applyErrors.email}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="apply-mobile">Mobile Number *</label>
                    <input
                      id="apply-mobile"
                      type="tel"
                      name="mobile"
                      value={applyForm.mobile}
                      onChange={handleApplyInput}
                      placeholder="e.g. +91 98765 43210"
                      className={applyErrors.mobile ? 'input-error' : ''}
                    />
                    {applyErrors.mobile && <span className="field-error">{applyErrors.mobile}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="apply-company">Company Name *</label>
                    <input
                      id="apply-company"
                      type="text"
                      name="companyName"
                      value={applyForm.companyName}
                      onChange={handleApplyInput}
                      placeholder="e.g. Google, OYO Rooms"
                      className={applyErrors.companyName ? 'input-error' : ''}
                    />
                    {applyErrors.companyName && <span className="field-error">{applyErrors.companyName}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="apply-website">Company Website *</label>
                    <input
                      id="apply-website"
                      type="url"
                      name="website"
                      value={applyForm.website}
                      onChange={handleApplyInput}
                      placeholder="e.g. https://yourcompany.com"
                      className={applyErrors.website ? 'input-error' : ''}
                    />
                    {applyErrors.website && <span className="field-error">{applyErrors.website}</span>}
                  </div>

                  <button
                    id="apply-submit-btn"
                    type="submit"
                    className="btn btn-primary btn-glow btn-full"
                    disabled={applySubmitting}
                  >
                    {applySubmitting ? (
                      <><span className="btn-spinner" /> Submitting…</>
                    ) : (
                      <><Send size={16} /> Submit Application</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ======= VIDEO MODAL ======= */}
      {selectedInterview && (
        <div className="modal-backdrop" onClick={() => setSelectedInterview(null)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedInterview(null)} aria-label="Close">
              <X size={22} />
            </button>
            <h3 className="video-modal-title">
              {selectedInterview.entrepreneur_name} — {selectedInterview.company_name}
            </h3>
            {selectedInterview.video_embed_url && (
              <div className="video-embed-wrapper">
                <iframe
                  src={selectedInterview.video_embed_url}
                  title={selectedInterview.entrepreneur_name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
