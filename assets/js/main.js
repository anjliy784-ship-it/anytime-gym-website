// assets/js/main.js
// Site-wide script: mobile navigation toggle & WhatsApp enquiry integration

document.addEventListener('DOMContentLoaded', function () {
  // ----- Mobile navigation toggle -----
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      navList.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
    });
  }

  // ----- WhatsApp enquiry integration -----
  const rawPhone = document.body.dataset.whatsappPhone || '';
  // Strip any non‑digit characters (e.g., '+' or spaces)
  const phone = rawPhone.replace(/\D/g, '');
  if (!phone) {
    console.warn('WhatsApp phone number not configured on <body>');
    return;
  }

  const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
  whatsappButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const plan = btn.dataset.plan ? btn.dataset.plan.trim() : '';
      const message = plan
        ? `I am interested in the ${plan} membership`
        : 'I would like to enquire about your gym services';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  });
});
