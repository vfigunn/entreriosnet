/* ============================================
   EntreRíos Net - Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header Scroll Effect ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navCta = document.getElementById('navCta');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      if (navCta) navCta.classList.toggle('open');
      
      // Animate hamburger
      const spans = hamburger.querySelectorAll('span');
      hamburger.classList.toggle('active');
      if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (navCta) navCta.classList.remove('open');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Speed Bars Animation ---
  const speedBars = document.querySelectorAll('.speed-bar-fill');
  
  const speedBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 300);
        speedBarObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  speedBars.forEach(bar => speedBarObserver.observe(bar));

  // --- Testimonials Carousel ---
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  
  if (track && prevBtn && nextBtn) {
    const allCards = track.querySelectorAll('.testimonial-card');
    const totalCards = allCards.length;
    let currentIndex = 0;

    function getCardsPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 4;
    }

    function updateCarousel() {
      const cardsPerView = getCardsPerView();
      // Calculate card width based on track width
      const trackWidth = track.parentElement.offsetWidth;
      const gap = 16;
      const cardWidth = (trackWidth - gap * (cardsPerView - 1)) / cardsPerView;
      
      // Set card widths explicitly
      allCards.forEach(card => {
        card.style.minWidth = cardWidth + 'px';
        card.style.maxWidth = cardWidth + 'px';
      });

      const offset = currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;
    }

    function getMaxIndex() {
      const cardsPerView = getCardsPerView();
      return Math.max(0, totalCards - cardsPerView);
    }

    nextBtn.addEventListener('click', () => {
      const maxIndex = getMaxIndex();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      const maxIndex = getMaxIndex();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex;
      }
      updateCarousel();
    });

    // Reset on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        currentIndex = 0;
        updateCarousel();
      }, 150);
    });

    // Initialize
    updateCarousel();
  }

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Solicitud enviada';
      submitBtn.style.background = '#8a9420';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Floating Cards Parallax on Mouse Move ---
  const hero = document.querySelector('.hero');
  const floatingCards = document.querySelectorAll('.float-card');

  if (hero && floatingCards.length > 0) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      floatingCards.forEach((card, i) => {
        const speed = (i + 1) * 8;
        const xMove = x * speed;
        const yMove = y * speed;
        card.style.transform = `translate(${xMove}px, ${yMove}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      floatingCards.forEach(card => {
        card.style.transform = '';
      });
    });
  }


  document.getElementById("contactForm").addEventListener("submit", function(e) {
      e.preventDefault();

      // Número de WhatsApp (sin +)
      const telefono = "543446667427";

      // Obtener valores
      const nombre = document.getElementById("name").value;
      const tel = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const direccion = document.getElementById("address").value;
      const plan = document.getElementById("plan").value;
      const mensajeExtra = document.getElementById("message").value;

      // Armar mensaje
      const mensaje = `
  Hola 👋, quiero solicitar el servicio:

  👤 Nombre: ${nombre}
  📞 Teléfono: ${tel}
  📧 Email: ${email}
  📍 Dirección: ${direccion}
  📦 Plan: ${plan}

  📝 Consulta adicional:
  ${mensajeExtra || "Sin mensaje adicional."}
  `;

      // Codificar mensaje
      const mensajeCodificado = encodeURIComponent(mensaje);

      // Crear URL
      const url = `https://wa.me/${telefono}?text=${mensajeCodificado}`;

      // Abrir WhatsApp
      window.open(url, "_blank");
  });

  document.getElementById("year").textContent = new Date().getFullYear();

});
