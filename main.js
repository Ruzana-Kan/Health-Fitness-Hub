  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Scroll observer: fade-in / left / right / scale ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 90);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
          .forEach(el => io.observe(el));

  /* ── Reading progress bar ── */
  const bar = document.getElementById('read-progress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = Math.min(100, (scrolled / total) * 100) + '%';

    /* Nav shadow */
    document.querySelector('nav').style.boxShadow =
      scrolled > 20 ? '0 4px 30px rgba(45,106,79,0.14)' : 'none';
  });

  /* ── Ripple effect on buttons ── */
  document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      r.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.3);
        transform:scale(0); animation:ripple 0.6s ease-out forwards;
      `;
      this.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });
  });

  /* ── Animated counter for stat numbers ── */
  const counters = document.querySelectorAll('.stat-number');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return;
      const suffix = raw.replace(/[0-9.]/g, '');
      let start = 0; const duration = 1400;
      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = (num < 10 ? (num * ease).toFixed(0) : Math.round(num * ease)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cio.observe(c));

  /* ── 3-D tilt on topic cards ── */
  document.querySelectorAll('.topic-card, .plan-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => card.style.transition = '', 500);
    });
  });

  /* ── Magnetic effect on CTA buttons ── */
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.25;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.25;
      btn.style.transform = `translateX(${dx}px) translateY(${dy - 3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ── Benefit icon heartbeat on scroll ── */
  const benefitIo = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.benefit-icon').forEach((icon, i) => {
          setTimeout(() => {
            icon.style.animation = 'heartbeat 0.8s ease';
            setTimeout(() => icon.style.animation = '', 900);
          }, i * 150);
        });
        benefitIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const strip = document.querySelector('.benefits-strip');
  if (strip) benefitIo.observe(strip);

  /* ── Typing cursor on hero H1 (one time) ── */
  const h1 = document.querySelector('.hero h1');
  if (h1) {
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = 'color:var(--green-light);animation:heartbeat 1s ease infinite;margin-left:4px;font-weight:300;';
    h1.appendChild(cursor);
    setTimeout(() => cursor.remove(), 3000);
  }