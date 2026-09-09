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
    const setMenuState = (isOpen) => {
      burger.classList.toggle('is-open', isOpen);
      navLinks.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    burger.addEventListener('click', () => {
      const shouldOpen = !navLinks.classList.contains('is-open');
      setMenuState(shouldOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', (event) => {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedToggle = burger.contains(event.target);
      if (!clickedInsideMenu && !clickedToggle && navLinks.classList.contains('is-open')) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
        setMenuState(false);
      }
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

  /* ── DISCOVERY SELECTOR ── */
  const discoveryState = {
    technology: 'airjet',
    fabric: 'cotton',
    need: 'speed'
  };

  const discoveryProfiles = {
    airjet: {
      cotton: {
        speed: {
          name: 'Airjet Loom',
          copy: 'Ideal for cotton, blended and fast-turnaround fabric runs where consistent speed matters.',
          items: ['High-output weaving', 'Suitable for multiple fabric types', 'Parts and support available']
        },
        heavy: {
          name: 'Heavy Airjet Loom',
          copy: 'Recommended for heavier cotton and wider fabric runs where stable registration and repeatability matter.',
          items: ['Heavy cotton handling', 'Wide fabric suitability', 'Frame strength for long runs']
        },
        versatile: {
          name: 'Airjet Loom Range',
          copy: 'A flexible option for mills balancing fibre variety, output demands and easier machine selection.',
          items: ['Broad weaving range', 'Practical production flexibility', 'Support-led configuration']
        }
      },
      synthetic: {
        speed: {
          name: 'Airjet Loom',
          copy: 'A strong fit for quick-turn synthetic and blended production where speed and efficiency are priorities.',
          items: ['Fast output', 'Blended fabric support', 'Efficient operation']
        },
        heavy: {
          name: 'Heavy Airjet Loom',
          copy: 'A dependable choice for denser synthetic and mixed-fibre runs requiring machine stability.',
          items: ['Dense fabric support', 'Stable high-load performance', 'Production continuity']
        },
        versatile: {
          name: 'Airjet Loom',
          copy: 'Flexible for mills needing a balanced airjet platform across multiple product lines.',
          items: ['Flexible applications', 'Multiple fabric use', 'Strong parts availability']
        }
      },
      technical: {
        speed: {
          name: 'Airjet Loom',
          copy: 'Useful for technical fabric applications where steady output and machine tuning are essential.',
          items: ['Controlled production', 'Targeted fabric fit', 'Technical support available']
        },
        heavy: {
          name: 'Heavy Airjet Loom',
          copy: 'A practical option for heavier technical textiles demanding strength and repeatability.',
          items: ['Higher stability', 'Denser fabric capability', 'Long-run suitability']
        },
        versatile: {
          name: 'Airjet Loom Range',
          copy: 'A good fit when the factory needs an adaptable airjet platform across several fabric families.',
          items: ['Multi-fabric support', 'Balanced performance', 'Service-backed operation']
        }
      }
    },
    waterjet: {
      cotton: {
        speed: {
          name: 'Waterjet Loom',
          copy: 'Best suited to synthetic and filament-heavy output where smooth weaving remains the key priority.',
          items: ['Efficient synthetic runs', 'Smooth fabric output', 'Fast adjustment support']
        },
        heavy: {
          name: 'Heavy Waterjet Loom',
          copy: 'Recommended for dense, heavier synthetic fabric requirements and high-volume production runs.',
          items: ['Heavy fabric support', 'Stable operation', 'High-volume output']
        },
        versatile: {
          name: 'Waterjet Loom Range',
          copy: 'Favoured when the mill wants a practical platform for various synthetic and blended production setups.',
          items: ['Flexible fabric handling', 'Reliable support', 'Production continuity']
        }
      },
      synthetic: {
        speed: {
          name: 'Waterjet Loom',
          copy: 'A direct fit for synthetic and filament-heavy weaving lines centred on speed and continuity.',
          items: ['Synthetic-focused output', 'High-efficiency weaving', 'Lower downtime risk']
        },
        heavy: {
          name: 'Heavy Waterjet Loom',
          copy: 'Built for heavier synthetic cloth and wide output requirements where stability remains critical.',
          items: ['Heavy synthetic capacity', 'Wide fabric production', 'Consistency under load']
        },
        versatile: {
          name: 'Waterjet Loom Range',
          copy: 'Useful for mills seeking versatility across multiple synthetic fabric programmes.',
          items: ['Wide application fit', 'Stable output', 'Service support']
        }
      },
      technical: {
        speed: {
          name: 'Waterjet Loom',
          copy: 'A practical recommendation for technical synthetic fabrics where output consistency matters.',
          items: ['Technical fabric fit', 'Smooth output', 'Sustained weaving performance']
        },
        heavy: {
          name: 'Heavy Waterjet Loom',
          copy: 'Well suited to technical textile jobs that need stronger mechanical stability and heavier fabric support.',
          items: ['Stronger fabric handling', 'Stable heavy runs', 'Production-focused fit']
        },
        versatile: {
          name: 'Waterjet Loom Range',
          copy: 'A flexible choice for diversified technical and synthetic programmes with ongoing support needs.',
          items: ['Multi-programme fit', 'Stable production', 'Spare support']
        }
      }
    }
  };

  function updateDiscovery() {
    const card = document.querySelector('.match-card');
    if (!card) return;
    const profile = discoveryProfiles[discoveryState.technology]?.[discoveryState.fabric]?.[discoveryState.need];
    if (!profile) return;

    card.querySelector('[data-match-name]').textContent = profile.name;
    card.querySelector('[data-match-copy]').textContent = profile.copy;

    profile.items.forEach((item, idx) => {
      const target = card.querySelector(`[data-match-item="${idx + 1}"]`);
      if (target) target.textContent = item;
    });
  }

  document.querySelectorAll('[data-discovery-group]').forEach(group => {
    const options = group.querySelectorAll('[data-discovery-option]');
    const groupKey = group.getAttribute('data-discovery-group');

    options.forEach(option => {
      option.addEventListener('click', () => {
        options.forEach(btn => btn.classList.toggle('is-active', btn === option));
        discoveryState[groupKey] = option.getAttribute('data-discovery-option');
        updateDiscovery();
      });
    });
  });

  updateDiscovery();

  /* ── APPLICATION CHIPS ── */
  const appChips = document.querySelectorAll('.app-chip');
  const appPanels = document.querySelectorAll('[data-app-content]');

  appChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const selected = chip.getAttribute('data-app');
      appChips.forEach(btn => btn.classList.toggle('is-active', btn === chip));
      appPanels.forEach(panel => {
        panel.classList.toggle('is-active', panel.getAttribute('data-app-content') === selected);
      });
    });
  });

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
