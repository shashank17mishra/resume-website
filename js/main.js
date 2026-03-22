/**
 * main.js
 * Premium GSAP scroll animations — Awwwards-level polish
 */

(function () {
  'use strict';

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     GSAP PLUGIN REGISTRATION
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     CUSTOM CURSOR
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    });

    const animCursor = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(animCursor);
    };
    animCursor();

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .glass-card, .tool-chip, .tag, .project-card');
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     LOADER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const loader = document.getElementById('loader');
  const loaderBar = document.querySelector('.loader-bar');

  if (loader && loaderBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        loaderBar.style.width = '100%';

        setTimeout(() => {
          gsap.to(loader, {
            yPercent: -100,
            duration: 1.0,
            ease: 'expo.inOut',
            onComplete: () => {
              loader.style.display = 'none';
              initHeroAnimation();
            },
          });
        }, 400);
      } else {
        loaderBar.style.width = progress + '%';
      }
    }, 75);
  } else {
    // No loader, just run hero
    setTimeout(initHeroAnimation, 100);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     HERO ENTRANCE ANIMATION
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.to('.hero-badge', {
      opacity: 1,
      y: 0,
      duration: 0.9,
    })
      .to('.name-line', {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.12,
      }, '-=0.5')
      .to('.hero-role', {
        opacity: 1,
        duration: 0.8,
      }, '-=0.6')
      .to('.hero-tagline', {
        opacity: 1,
        duration: 0.8,
      }, '-=0.6')
      .to('.hero-cta', {
        opacity: 1,
        duration: 0.8,
      }, '-=0.5')
      .to('.hero-stats', {
        opacity: 1,
        duration: 0.8,
      }, '-=0.5')
      .to('.data-chip', {
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
      }, '-=0.4');

    // Animate stat numbers
    document.querySelectorAll('.stat-num').forEach((el) => {
      const target = parseInt(el.dataset.target);
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        delay: 1.5,
        onUpdate() {
          el.textContent = Math.round(this.targets()[0].val);
        },
      });
    });

    // Typing effect
    initTypingEffect();
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     TYPING EFFECT
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initTypingEffect() {
    const target = document.getElementById('typed-role');
    if (!target) return;

    const phrases = [
      'Data Analytics Expert',
      'Power BI Specialist',
      'Python Developer',
      'Data Storyteller',
      'GDG Data Science Lead',
    ];

    let phraseIdx = 0, charIdx = 0, deleting = false;

    const TYPE_SPEED = 85;
    const DELETE_SPEED = 45;
    const PAUSE_END = 2200;
    const PAUSE_START = 500;

    function type() {
      const current = phrases[phraseIdx];
      if (!deleting) {
        target.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, PAUSE_END);
          return;
        }
        setTimeout(type, TYPE_SPEED);
      } else {
        target.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(type, PAUSE_START);
          return;
        }
        setTimeout(type, DELETE_SPEED);
      }
    }

    setTimeout(type, 1600);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SCROLL PROGRESS BAR + INDICATOR
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const progressBar = document.getElementById('scroll-progress');
  const scrollIndicator = document.getElementById('scroll-indicator');
  let indicatorHidden = false;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    // Hide scroll indicator once scrolled
    if (!indicatorHidden && scrollTop > 80) {
      indicatorHidden = true;
      if (scrollIndicator) scrollIndicator.classList.add('hidden');
    }
    if (indicatorHidden && scrollTop < 20) {
      indicatorHidden = false;
      if (scrollIndicator) scrollIndicator.classList.remove('hidden');
    }
  }, { passive: true });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     NAVBAR
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Smooth scroll on nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 0 },
        duration: 1.4,
        ease: 'expo.inOut',
      });
    });
  });

  // Active nav link highlighting is handled by ScrollTrigger below (Step 7)
  // Removing redundant raw scroll listener to prevent jitter.

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     3D MODEL — GSAP-OWNED POSITIONING
     
     STRATEGY:
     ─────────
     The model is a fixed element anchored to viewport center
     (top:50%, left:50%). GSAP sets xPercent/yPercent to -50
     so it's centered, then animates X and Y offsets (in px)
     to move it around the viewport without overlapping content.
     
     SECTION LAYOUT ANALYSIS:
     ─ Hero:       text on LEFT (max 680px). Model → right half.
     ─ About:      2-col grid (text left, visual right). 
                   Content spans full width → model dims + moves to far right edge.
     ─ Skills:     Centered full-width grid. Model → bg accent, far right, low opacity.
     ─ Projects:   Centered 2-col cards. Model → bg accent, far left, low opacity.
     ─ Experience: Centered timeline. Model → bg accent, right edge, low opacity.
     ─ Contact:    2-col (links left, form right). Model → centered top, very low opacity.
     
     OPACITY STATES:
     ─ Hero:       1.0  (hero moment, model is a visual feature)
     ─ About:      0.55 (supporting, doesn't fight 2-col layout)
     ─ Skills+:    0.25 (pure background atmosphere)
     ─ Contact:    0.15 (barely there, doesn't fight form)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  const modelEl = document.getElementById('model-container');

  if (modelEl) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ── Step 1: Set base transform so GSAP can animate from center ────
    gsap.set(modelEl, {
      xPercent: -50,
      yPercent: -50,
    });

    // ── Step 2: Define per-section position states ────────────────────
    //
    // x: pixels from viewport center (positive = right)
    // y: pixels from viewport center (positive = down)
    // Viewport is typically 1440px wide, so:
    //   right-half clear of text ≈ +320px to +420px
    //   far-right bg accent ≈ +480px (partially off-screen is fine)
    //   left bg accent ≈ -480px
    //
    // For 1440px viewport, hero content is ~680px wide on left.
    // Safe zone for model on right = left-edge of model > 680px
    // Model is 500px wide, centered at x=+350 → left-edge at (720+350-250) = 820px ✓
    //
    // Mobile: model is centered, small, very transparent.

    const states = isMobile
      ? {
        hero: { x: 0, y: -120, scale: 0.55, opacity: 0.35, rotateY: 0 },
        about: { x: 0, y: -130, scale: 0.45, opacity: 0.2, rotateY: 0 },
        skills: { x: 0, y: -130, scale: 0.4, opacity: 0.15, rotateY: 0 },
        projects: { x: 0, y: -130, scale: 0.4, opacity: 0.15, rotateY: 0 },
        experience: { x: 0, y: -130, scale: 0.4, opacity: 0.12, rotateY: 0 },
        contact: { x: 0, y: -130, scale: 0.38, opacity: 0.1, rotateY: 0 },
      }
      : {
        // Desktop (base = 1440px wide viewport)
        // Right side of hero: x ≈ +340 keeps model's left edge ~870px from left
        // which is safely right of the 680px hero text block.
        hero: { x: 340, y: 0, scale: 1.0, opacity: 1.0, rotateY: 0 },

        // About: 2-col layout. Both columns have content. 
        // Push model to the far right edge (partially off-screen is okay — 
        // it acts as a glowing accent peeking in from the right).
        about: { x: 490, y: 20, scale: 0.82, opacity: 0.5, rotateY: 0 },

        // Skills: full-width centered grid. Model drifts to far right, dims heavily.
        skills: { x: 500, y: -30, scale: 0.75, opacity: 0.22, rotateY: 0 },

        // Projects: centered 2-col cards. Model on far left, dims.
        projects: { x: -500, y: 20, scale: 0.75, opacity: 0.22, rotateY: 180 },

        // Experience: centered timeline. Model far right again.
        experience: { x: 500, y: 0, scale: 0.72, opacity: 0.2, rotateY: 0 },

        // Contact: model centers and dims almost completely —
        // the form/links need full readability.
        contact: { x: 0, y: 60, scale: 0.65, opacity: 0.12, rotateY: 0 },
      };

    // ── Step 3: Apply hero start position immediately ─────────────────
    const h = states.hero;
    gsap.set(modelEl, {
      x: h.x,
      y: h.y,
      scale: h.scale,
      rotateY: h.rotateY,
      transformPerspective: 900,
    });

    // ── Step 4: Fade in after loader completes ────────────────────────
    gsap.to(modelEl, {
      opacity: h.opacity,
      duration: 1.8,
      ease: 'power2.out',
      delay: 1.5,
    });

    // ── Step 5: Idle float — subtle y-axis breathing ─────────────────
    // We animate the INNER wrapper so ScrollTrigger (animating the container)
    // does NOT overwrite or kill the breathing effect.
    const idleWrap = modelEl.querySelector('.sketchfab-embed-wrapper');
    if (idleWrap) {
      gsap.to(idleWrap, {
        y: isMobile ? 12 : 22,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // ── Step 6: ONE master scrubbed timeline across the full page ──────
    //
    // A single timeline with scrub on body start→end means:
    // — Scrolling DOWN plays forward through all states.
    // — Scrolling UP reverses perfectly back to hero state.
    // — No per-section trigger desync bugs.
    //
    // rotateY: 0° = model faces right (used when model is on right side)
    //          180° = model faces right even when physically on left side

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    // hero(start) → about → skills → projects → experience → contact
    const sectionKeys = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    sectionKeys.forEach((key) => {
      if (key === 'hero') return;
      const s = states[key];
      masterTl.to(modelEl, {
        x: s.x,
        y: s.y, // Fixed: Added vertical cinematic movement
        scale: s.scale,
        opacity: s.opacity,
        rotateY: s.rotateY,
        ease: 'power2.inOut',
        duration: 1,
      });
    });

    // ── Step 7: Fade out at footer ────────────────────────────────────
    gsap.to(modelEl, {
      opacity: 0,
      scale: 0.5,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 85%',
        end: 'top 40%',
        scrub: true,
      },
    });
  }

  // ── Nav active-link highlighting ──────────────────────────────────
  const sectionOrder = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
  sectionOrder.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: (self) => {
        if (self.isActive) {
          navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        }
      },
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     REVEAL ANIMATIONS
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  /* Generic reveal up */
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0) / 1000;
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* Generic reveal right */
  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* Timeline items */
  gsap.utils.toArray('.reveal-timeline').forEach((el) => {
    const side = el.dataset.side;
    gsap.fromTo(el,
      { opacity: 0, x: side === 'left' ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SKILL BARS ANIMATION
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gsap.utils.toArray('.skill-fill').forEach((bar) => {
    const w = bar.dataset.w;
    gsap.to(bar, {
      width: w,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        toggleActions: 'play none none reset',
      },
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ABOUT – CHART BARS STAGGER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const chartBars = document.querySelectorAll('.chart-bar');
  gsap.utils.toArray('.chart-bar').forEach((bar, i) => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(bar,
          { scaleY: 0, transformOrigin: 'bottom' },
          { scaleY: 1, duration: 0.8, delay: i * 0.1, ease: 'expo.out' }
        );
      },
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     HERO PARALLAX (blobs)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gsap.to('.blob-1', {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  gsap.to('.blob-2', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    },
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SECTION TITLE SPLIT (character stagger)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function splitAndAnimate(selectors) {
    // Skip hero (already handled)
    document.querySelectorAll(selectors).forEach((el) => {
      if (el.closest('#hero')) return;

      // Wrap each word in a span
      const words = el.innerHTML.split(/(<[^>]+>|[^<]+)/g).filter(Boolean);
      // Simple approach: animate the whole element with a clip path
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 87%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }

  splitAndAnimate('.section-title');

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     PROJECT CARDS HOVER – 3D TILT
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
      gsap.to(card, {
        rotateX: rx,
        rotateY: ry,
        scale: 1.02,
        duration: 0.35,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'expo.out',
      });
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     TIMELINE LINE DRAW
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const timelineLine = document.querySelector('.timeline-line');
  if (timelineLine) {
    gsap.fromTo(timelineLine,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     CONTACT CARDS STAGGER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gsap.fromTo('.contact-card',
    { opacity: 0, x: -30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.contact-links',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     FOOTER GLOW ON ENTER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gsap.fromTo('.footer-glow',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.5,
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 90%',
      },
    }
  );

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     CONTACT FORM "SEND"
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('form-submit');
      const span = btn?.querySelector('span');
      if (btn && span) {
        span.textContent = 'Sent! ✓';
        gsap.to(btn, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
        setTimeout(() => { span.textContent = 'Send Message'; }, 3000);
      }
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     GSAP PAGE-LEVEL HORIZONTAL SCRUB TWEEN
     (matches 3D orb movement for content)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  // Section label marker lines animate in
  gsap.utils.toArray('.section-label').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 16, letterSpacing: '12px' },
      {
        opacity: 1,
        y: 0,
        letterSpacing: '5px',
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
        },
      }
    );
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     TOOL CHIPS — WAVE FLOAT
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gsap.utils.toArray('.tool-chip').forEach((chip, i) => {
    gsap.to(chip, {
      y: -6,
      duration: 1.4 + i * 0.08,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: i * 0.12,
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     GRADIENT TEXT SHIMMER on project nums
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gsap.utils.toArray('.project-num').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', delay: i * 0.1 }
        );
      },
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     LOGO ENTRANCE
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gsap.from('#nav-brand', {
    opacity: 0,
    x: -30,
    duration: 1.0,
    ease: 'expo.out',
    delay: 0.5,
  });

  gsap.from('.nav-link', {
    opacity: 0,
    y: -16,
    duration: 0.7,
    stagger: 0.08,
    ease: 'expo.out',
    delay: 0.6,
  });

  gsap.from('#resume-btn', {
    opacity: 0,
    x: 20,
    duration: 0.8,
    ease: 'expo.out',
    delay: 0.9,
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SCROLL TO TOP via logo
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document.querySelectorAll('.footer-brand, #nav-brand').forEach((el) => {
    el.addEventListener('click', () => {
      gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'expo.inOut' });
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SCROLL REFRESH (for dynamic content)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

})();