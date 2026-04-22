// ========================================
// Levi's Heritage - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const body = document.body;
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = navMenu ? [...navMenu.querySelectorAll('.nav__link')] : [];

  const setMenuState = (expanded) => {
    if (!navToggle || !navMenu) {
      return;
    }

    navToggle.setAttribute('aria-expanded', String(expanded));
    navToggle.setAttribute('aria-label', expanded ? '메뉴 닫기' : '메뉴 열기');
    navMenu.classList.toggle('is-active', expanded);
    body.classList.toggle('nav-open', expanded);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!navToggle || !navMenu) {
      return;
    }

    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (!isExpanded) {
      return;
    }

    setMenuState(false);

    if (restoreFocus) {
      navToggle.focus();
    }
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !isExpanded;
      setMenuState(nextExpanded);

      if (nextExpanded) {
        navLinks[0]?.focus();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      if (!header || window.innerWidth >= 768) {
        return;
      }

      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (!isExpanded || header.contains(event.target)) {
        return;
      }

      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu({ restoreFocus: true });
      }

      if (event.key !== 'Tab' || window.innerWidth >= 768) {
        return;
      }

      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (!isExpanded || navLinks.length === 0) {
        return;
      }

      const focusableItems = [navToggle, ...navLinks];
      const firstFocusable = focusableItems[0];
      const lastFocusable = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    });
  }

  // Scroll Fade-in Animation
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Deferred background images
  const backgroundElements = [...document.querySelectorAll('[data-bg]')];
  const loadBackground = (element) => {
    if (!element || element.dataset.bgLoaded === 'true') {
      return;
    }

    element.style.backgroundImage = `url("${element.dataset.bg}")`;
    element.dataset.bgLoaded = 'true';
    element.classList.add('is-bg-loaded');
  };

  if (backgroundElements.length > 0) {
    const eagerBackgrounds = backgroundElements.filter((element) => element.hasAttribute('data-bg-eager'));
    const deferredBackgrounds = backgroundElements.filter((element) => !element.hasAttribute('data-bg-eager'));

    eagerBackgrounds.forEach(loadBackground);

    if ('IntersectionObserver' in window && deferredBackgrounds.length > 0) {
      const backgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          loadBackground(entry.target);
          backgroundObserver.unobserve(entry.target);
        });
      }, {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.01
      });

      deferredBackgrounds.forEach((element) => {
        backgroundObserver.observe(element);
      });
    } else {
      deferredBackgrounds.forEach(loadBackground);
    }
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const sections = document.querySelectorAll('.section');
  if (prefersReducedMotion) {
    sections.forEach((section) => {
      section.classList.add('fade-section', 'is-visible');
    });
  } else {
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      section.classList.add('fade-section');
      fadeInObserver.observe(section);
    });
  }

  // Timeline active state
  const timelineGroups = [...document.querySelectorAll('.timeline__list, .full-timeline__list')]
    .map((list) => ({
      list,
      items: [...list.children].filter((item) =>
        item.classList.contains('timeline__item') || item.classList.contains('full-timeline__item')
      )
    }))
    .filter((group) => group.items.length > 0);

  const updateTimelineGroup = (group) => {
    const viewportAnchor = window.innerHeight * 0.42;
    const visibleItems = group.items.filter((item) => {
      const rect = item.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });

    let activeItem;
    if (visibleItems.length > 0) {
      activeItem = visibleItems.reduce((closestItem, currentItem) => {
        const currentRect = currentItem.getBoundingClientRect();
        const closestRect = closestItem.getBoundingClientRect();
        const currentDistance = Math.abs(currentRect.top + currentRect.height / 2 - viewportAnchor);
        const closestDistance = Math.abs(closestRect.top + closestRect.height / 2 - viewportAnchor);
        return currentDistance < closestDistance ? currentItem : closestItem;
      });
    } else {
      const listRect = group.list.getBoundingClientRect();
      activeItem = listRect.top > viewportAnchor ? group.items[0] : group.items[group.items.length - 1];
    }

    group.items.forEach((item) => {
      item.classList.toggle('is-active', item === activeItem);
    });

    const listRect = group.list.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const dotOffset = parseFloat(getComputedStyle(group.list).getPropertyValue('--timeline-dot-offset')) || 0;
    const progress = Math.max(0, Math.min(group.list.scrollHeight, itemRect.top - listRect.top + dotOffset));
    group.list.style.setProperty('--timeline-progress', `${Math.round(progress)}px`);
  };

  if (timelineGroups.length > 0) {
    const updateTimelineGroups = () => {
      timelineGroups.forEach(updateTimelineGroup);
    };

    let timelineTicking = false;
    const requestTimelineUpdate = () => {
      if (timelineTicking) {
        return;
      }

      timelineTicking = true;
      window.requestAnimationFrame(() => {
        updateTimelineGroups();
        timelineTicking = false;
      });
    };

    updateTimelineGroups();

    window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineUpdate);
  }

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (!header) {
      return;
    }

    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
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
