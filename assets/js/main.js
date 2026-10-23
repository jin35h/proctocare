(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = new Date().getFullYear());
  const form = document.querySelector('[data-appointment-form]');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const service = String(data.get('service') || 'Appointment enquiry').trim();
      const preferred = String(data.get('preferred') || 'Not specified').trim();
      const message = String(data.get('message') || '').trim();
      if (!name || !phone) {
        const status = form.querySelector('[data-form-status]');
        if (status) status.textContent = 'Please enter your name and phone number.';
        return;
      }
      const text = `Appointment enquiry for ProctoCare Hospital%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AConcern: ${encodeURIComponent(service)}%0APreferred time: ${encodeURIComponent(preferred)}%0AMessage: ${encodeURIComponent(message)}%0A%0APlease contact me about an appointment.`;
      const status = form.querySelector('[data-form-status]');
      if (status) status.textContent = 'Opening WhatsApp to send your enquiry. Please review the message before sending.';
      window.open(`https://wa.me/919428135435?text=${text}`, '_blank', 'noopener,noreferrer');
    });
  }
})();
