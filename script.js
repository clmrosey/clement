// Toggle du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  });
  
  /*// Changement dynamique de la barre de navigation lors du scroll
  //const navbar = document.getElementById('navbar');
  //window.addEventListener('scroll', function() {
   // if (window.scrollY > 50) {
      navbar.style.background = 'var(--nav-bg)';
      navbar.style.padding = '10px 0';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.padding = '20px 0';
    }
  });*/

  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-nav');
    } else {
      navbar.classList.remove('fixed-nÒav');
    }
  });
  
  // Effet de translation au scroll pour les sections
  const sections = document.querySelectorAll('section');
  let latestScrollY = 0;
  let ticking = false;
  function onScroll() {
    latestScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  function update() {
    sections.forEach(section => {
      const speed = parseFloat(section.dataset.speed) || 1;
      const yPos = -(latestScrollY * speed / 20);
      section.style.transform = `translateY(${yPos}px)`;
    });
    ticking = false;
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  
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