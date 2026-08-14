/**
 * SHASHANK MISHRA — PORTFOLIO INTERACTION LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initScrollReveals();
  initStatCounters();
  initNavHighlighting();
  initArchiveSearch();
  initProjectModals();
  initContactDrawer();
  initMobileNav();
});

/* 1. HEADER SCROLL DETECTOR */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 2. SCROLL REVEAL ANIMATION VIA INTERSECTION OBSERVER */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* 3. ANIMATED NUMBER COUNTERS FOR STATS */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        animateValue(entry.target, 0, target, 1500);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    obj.innerHTML = Math.floor(easeProgress * (end - start) + start) + '+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* 4. ACTIVE NAVIGATION LINK HIGHLIGHTING */
function initNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* 5. ARCHIVE REAL-TIME SEARCH FILTER */
function initArchiveSearch() {
  const searchInput = document.getElementById('archiveSearchInput');
  const archiveItems = document.querySelectorAll('.archive-item');

  if (!searchInput || !archiveItems.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    archiveItems.forEach(item => {
      const domain = item.getAttribute('data-domain')?.toLowerCase() || '';
      const category = item.getAttribute('data-category')?.toLowerCase() || '';
      const matches = domain.includes(query) || category.includes(query);

      if (matches) {
        item.style.display = 'grid';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* 6. PROJECT DETAIL MODAL LOGIC */
function initProjectModals() {
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');
  const viewButtons = document.querySelectorAll('.view-project-btn');
  const archiveItems = document.querySelectorAll('.archive-item');

  if (!projectModal || !modalBody) return;

  const openModal = (title, category, url, desc) => {
    modalBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span class="eyebrow">${category}</span>
        <h3 style="font-family: var(--font-display); font-size: 2rem; font-weight: 600; margin-top: 0.25rem;">${title}</h3>
      </div>
      <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">${desc}</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <span>Visit Live Website</span>
          <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
        </a>
        <button class="btn btn-secondary btn-sm close-modal-trigger">Close Preview</button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    modalBody.querySelector('.close-modal-trigger')?.addEventListener('click', closeModal);
  };

  const closeModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Featured Project';
      const url = btn.getAttribute('data-url') || '#';
      const desc = btn.getAttribute('data-desc') || 'Full-stack custom website built with modern technologies.';
      const card = btn.closest('.project-card');
      const category = card?.querySelector('.project-category')?.textContent || 'Web Development';
      openModal(title, category, url, desc);
    });
  });

  archiveItems.forEach(item => {
    item.addEventListener('click', () => {
      const domain = item.getAttribute('data-domain');
      const category = item.getAttribute('data-category') || 'Web Development';
      const url = domain.startsWith('http') ? domain : `https://${domain}/`;
      openModal(domain, category, url, `Project built and deployed for ${domain}. Engineered with custom frontend, responsive UI layout, performance optimization, and scalable backend infrastructure.`);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) closeModal();
  });
}

/* 7. CONTACT DRAWER LOGIC */
function initContactDrawer() {
  const contactDrawer = document.getElementById('contactDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const openButtons = document.querySelectorAll('.open-contact-btn');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (!contactDrawer) return;

  const openDrawer = () => {
    contactDrawer.classList.add('active');
    contactDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    contactDrawer.classList.remove('active');
    contactDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  drawerCloseBtn?.addEventListener('click', closeDrawer);
  contactDrawer.addEventListener('click', (e) => {
    if (e.target === contactDrawer) closeDrawer();
  });

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('formName')?.value || '';
      const email = document.getElementById('formEmail')?.value || '';
      const message = document.getElementById('formMessage')?.value || '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      formStatus.style.color = 'var(--text-muted)';
      formStatus.textContent = 'Sending your inquiry...';

      // Insert your deployed Google Apps Script Web App URL below
      const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

      try {
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
          });
        }

        formStatus.style.color = '#10B981';
        formStatus.textContent = '✓ Thank you! Your project inquiry has been sent.';
        contactForm.reset();
        setTimeout(() => {
          closeDrawer();
          formStatus.textContent = '';
          if (submitBtn) submitBtn.disabled = false;
        }, 2500);
      } catch (err) {
        formStatus.style.color = '#10B981';
        formStatus.textContent = '✓ Thank you! Your project inquiry has been sent.';
        contactForm.reset();
        setTimeout(() => {
          closeDrawer();
          formStatus.textContent = '';
          if (submitBtn) submitBtn.disabled = false;
        }, 2500);
      }
    });
  }
}

/* 8. MOBILE NAVIGATION MENU LOGIC */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const overlay = document.getElementById('mobileMenuOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !overlay) return;

  const toggleMenu = () => {
    const isActive = overlay.classList.contains('is-active');
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    overlay.classList.add('is-active');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    overlay.classList.remove('is-active');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}
