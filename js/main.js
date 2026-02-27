// ========================================
// Levi's Heritage - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !isExpanded;
      navToggle.setAttribute('aria-expanded', nextExpanded);
      navMenu.classList.toggle('is-active', nextExpanded);
      navToggle.setAttribute('aria-label', nextExpanded ? '메뉴 닫기' : '메뉴 열기');
    });
  }

  // Scroll Fade-in Animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('fade-section');
    fadeInObserver.observe(section);
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScroll = currentScroll;
  });
});

// Add CSS for fade animations
const style = document.createElement('style');
style.textContent = `
  .fade-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-section.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .header.is-scrolled {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-section {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;
document.head.appendChild(style);
