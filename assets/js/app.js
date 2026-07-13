(() => {
  'use strict';

  const config = window.PORTFOLIO_CONFIG ?? {};
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const resumeButton = document.getElementById('resumeBtn');

  if (toggle && navLinks) {
    toggle.setAttribute('aria-expanded', 'false');

    const closeMenu = () => {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  if (resumeButton && config.resumeUrl) {
    resumeButton.href = config.resumeUrl;
    resumeButton.target = '_blank';
    resumeButton.rel = 'noopener noreferrer';
    resumeButton.removeAttribute('aria-disabled');
  } else if (resumeButton) {
    resumeButton.addEventListener('click', (event) => event.preventDefault());
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  const counters = document.querySelectorAll('.achieve-num');
  const startCounter = (element) => {
    const target = Number.parseInt(element.dataset.count, 10);
    const suffix = element.dataset.suffix || '+';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = window.setInterval(() => {
      current = Math.min(current + step, target);
      element.textContent = `${current}${suffix}`;
      if (current === target) window.clearInterval(timer);
    }, 30);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(startCounter);
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      projectCards.forEach((card) => {
        const tags = card.dataset.tags?.split(' ') ?? [];
        card.hidden = filter !== 'all' && !tags.includes(filter);
      });
    });
  });

  const contributionGrid = document.getElementById('contribGrid');
  if (contributionGrid) {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 26 * 7; index += 1) {
      const cell = document.createElement('div');
      const level = Math.random();
      cell.className = 'contrib-cell';
      if (level > 0.85) cell.dataset.level = '3';
      else if (level > 0.65) cell.dataset.level = '2';
      else if (level > 0.4) cell.dataset.level = '1';
      fragment.appendChild(cell);
    }
    contributionGrid.appendChild(fragment);
  }

  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMsg');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:robiulislamengg@gmail.com?subject=${subject}&body=${body}`;
    if (formMessage) formMessage.textContent = 'Opening your email client…';
  });
})();
