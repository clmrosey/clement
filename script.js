// Toggle du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  });

  // Changement de la barre de navigation lors du scroll
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-nav');
    } else {
      navbar.classList.remove('fixed-nav');
    }
  });

  // Effet de parallaxe sophistiqué pour le header
  let latestScrollY = 0;
  let ticking = false;

  function parallaxScroll() {
    latestScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  function updateParallax() {
    // Parallaxe pour les couches du header
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.5;
      const yPos = latestScrollY * speed;
      layer.style.transform = `translateY(${yPos}px)`;
    });

    // Parallaxe pour le contenu du hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      const speed = parseFloat(heroContent.dataset.speed) || 0.2;
      const yPos = latestScrollY * speed;
      heroContent.style.transform = `translateY(${yPos}px)`;
    }

    // Parallaxe pour les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const speed = parseFloat(section.dataset.speed) || 0.5;

      // Calculer le décalage basé sur la position de la section
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrolled = window.innerHeight - rect.top;
        const rate = scrolled * speed / 50;
        section.style.transform = `translateY(${-rate}px)`;
      }
    });

    ticking = false;
  }

  document.addEventListener('scroll', parallaxScroll, { passive: true });

  // Animation d'apparition des sections au scroll
  document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          // On peut dé-observer si on veut que l'animation ne se joue qu'une fois
          // sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  });

  // Animation des barres de progression pour les outils avec IntersectionObserver
  document.addEventListener("DOMContentLoaded", function() {
    const progressElements = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target;
          const target = progress.getAttribute('data-progress');
          progress.style.width = target + '%';
          observer.unobserve(progress);
        }
      });
    }, { threshold: 0.5 });

    progressElements.forEach(el => {
      observer.observe(el);
    });
  });