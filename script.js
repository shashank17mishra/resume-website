// Menu toggle
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("open");
}

// Typing animation with loop
const typingText = document.querySelector(".typing-text");
const text = "I am a Data Science Enthusiast and Machine Learning Explorer.";
let idx = 0;
let isDeleting = false;
let speed = 100; // typing speed in ms

function typeText() {
  const currentText = typingText.textContent;
  
  if (!isDeleting && idx < text.length) {
    // Typing forward
    typingText.textContent = text.substring(0, idx + 1);
    idx++;
    speed = 100; // typing speed
  } else if (isDeleting && idx > 0) {
    // Deleting
    typingText.textContent = text.substring(0, idx - 1);
    idx--;
    speed = 50; // faster deleting speed
  } else {
    // Switch between typing and deleting
    isDeleting = !isDeleting;
    // Add 2 second pause at the end before starting again
    if (!isDeleting) {
      speed = 2000; // 2 second break
    }
  }

  setTimeout(typeText, speed);
}

// Start the animation
window.onload = () => {
  typeText();
};

window.onload = () => {
  typeText();
};
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');
    projectCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category').includes(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});
// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});
// Smooth scrolling for Explore button
document.getElementById('explore-btn').addEventListener('click', function() {
  document.getElementById('projects').scrollIntoView({ 
    behavior: 'smooth' 
  });
});
document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });

// Smooth scrolling for all anchor links
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
/* Mobile View Menu */
@media (max-width: 768px) {
  .side-menu {
    position: fixed;
    top: 0;
    left: -100%; /* Hidden initially */
    width: 100%; /* Full width for mobile */
    height: 100vh;
    background-color: #2a4b73;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: left 0.3s ease;
    z-index: 9999;
  }

  .side-menu.open {
    left: 0; /* Slide in */
  }

  .side-menu a {
    color: #fff;
    font-size: 1.5rem;
    margin: 1rem 0;
    text-align: center;
  }
}
