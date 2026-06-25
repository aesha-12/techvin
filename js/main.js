/* ════════════════════════════════════════════════════════════
   TECHVIN MACHINERY — CORE INTERACTIONS
   ════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL STATE ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── MOBILE MENU ── */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
      document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.r-up');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ── ACCORDION (used on products / spares pages) ── */
  document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.closest('[data-accordion-item]');
      const isOpen = panel.classList.contains('is-open');
      const parent = panel.parentElement;

      if (parent.hasAttribute('data-accordion-single')) {
        parent.querySelectorAll('[data-accordion-item]').forEach(item => {
          item.classList.remove('is-open');
          const body = item.querySelector('[data-accordion-body]');
          if (body) body.style.maxHeight = null;
        });
      }

      if (!isOpen) {
        panel.classList.add('is-open');
        const body = panel.querySelector('[data-accordion-body]');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        panel.classList.remove('is-open');
        const body = panel.querySelector('[data-accordion-body]');
        if (body) body.style.maxHeight = null;
      }
    });
  });

  /* ── FILTER TABS (products / gallery) ── */
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-filter]');
    const targetSelector = group.getAttribute('data-filter-group');
    const targets = document.querySelectorAll(targetSelector);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.getAttribute('data-filter');

        targets.forEach(t => {
          const cats = (t.getAttribute('data-cat') || '').split(' ');
          const show = filter === 'all' || cats.includes(filter);
          t.style.display = show ? '' : 'none';
        });
      });
    });
  });

  /* ── LIGHTBOX (gallery) ── */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const galleryItems = Array.from(document.querySelectorAll('[data-lightbox-src]'));
    let currentIdx = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      lightboxImg.src = galleryItems[idx].getAttribute('data-lightbox-src');
      lightboxImg.alt = galleryItems[idx].getAttribute('data-lightbox-alt') || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    function showNext(dir) {
      currentIdx = (currentIdx + dir + galleryItems.length) % galleryItems.length;
      lightboxImg.src = galleryItems[currentIdx].getAttribute('data-lightbox-src');
      lightboxImg.alt = galleryItems[currentIdx].getAttribute('data-lightbox-alt') || '';
    }

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', () => showNext(-1));
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', () => showNext(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    });
  }

  /* ── WEAVE CANVAS (hero background motif) ── */
  const canvas = document.getElementById('weaveCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w, h, raf;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }
    resize();
    window.addEventListener('resize', resize);

    const spacing = 46 * window.devicePixelRatio;
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(0,174,239,0.35)';
      ctx.lineWidth = 1 * window.devicePixelRatio;

      // Warp (vertical) threads
      for (let x = -spacing; x < w + spacing; x += spacing) {
        const offset = Math.sin((x / spacing) + t) * 6 * window.devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - offset, h);
        ctx.stroke();
      }
      // Weft (horizontal) threads
      ctx.strokeStyle = 'rgba(26,95,190,0.30)';
      for (let y = -spacing; y < h + spacing; y += spacing) {
        const offset = Math.cos((y / spacing) + t) * 6 * window.devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(w, y - offset);
        ctx.stroke();
      }

      if (!reducedMotion) {
        t += 0.0035;
        raf = requestAnimationFrame(draw);
      }
    }
    draw();
  }

  /* ── COUNTER ANIMATION (stat numbers) ── */
  document.querySelectorAll('[data-count-to]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const suffix = el.getAttribute('data-count-suffix') || '';
    const duration = 1400;
    let started = false;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          const startTime = performance.now();
          function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(target * eased);
            el.textContent = val + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
  });

});
