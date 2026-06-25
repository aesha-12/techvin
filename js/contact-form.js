/* ════════════════════════════════════════════════════════════
   TECHVIN — CONTACT FORM LOGIC
   ════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const partsSection = document.getElementById('partsSection');
  const machineFieldWrap = document.getElementById('machineFieldWrap');
  const partsList = document.getElementById('partsList');
  const addPartBtn = document.getElementById('addPartBtn');
  const typeRadios = form.querySelectorAll('input[name="enquiryType"]');
  const formWrap = document.getElementById('formWrap');
  const formSuccess = document.getElementById('formSuccess');
  const resetBtn = document.getElementById('resetFormBtn');
  const submitBtn = document.getElementById('submitBtn');

  /* ── TOGGLE SECTIONS BY ENQUIRY TYPE ── */
  function updateVisibility() {
    const type = form.querySelector('input[name="enquiryType"]:checked')?.value;
    if (type === 'spares') {
      partsSection.classList.add('is-visible');
      machineFieldWrap.style.display = '';
    } else {
      partsSection.classList.remove('is-visible');
    }
  }
  typeRadios.forEach(r => r.addEventListener('change', updateVisibility));
  updateVisibility();

  /* ── DYNAMIC PART ROWS ── */
  function bindRemove(row) {
    const btn = row.querySelector('[data-remove-part]');
    btn.addEventListener('click', () => {
      if (partsList.querySelectorAll('[data-part-row]').length > 1) {
        row.remove();
        refreshRemoveVisibility();
      }
    });
  }
  function refreshRemoveVisibility() {
    const rows = partsList.querySelectorAll('[data-part-row]');
    rows.forEach((row, idx) => {
      const btn = row.querySelector('[data-remove-part]');
      btn.style.visibility = rows.length > 1 ? 'visible' : 'hidden';
    });
  }
  partsList.querySelectorAll('[data-part-row]').forEach(bindRemove);

  addPartBtn?.addEventListener('click', () => {
    const template = partsList.querySelector('[data-part-row]');
    const clone = template.cloneNode(true);
    clone.querySelectorAll('input').forEach(input => input.value = '');
    bindRemove(clone);
    partsList.appendChild(clone);
    refreshRemoveVisibility();
    clone.querySelector('input')?.focus();
  });

  /* ── URL PARAM PRE-FILL (?machine=YC920 or ?type=spares) ── */
  const params = new URLSearchParams(window.location.search);
  const machineParam = params.get('machine');
  const typeParam = params.get('type');

  if (machineParam) {
    const machineSelect = document.getElementById('fMachine');
    if (machineSelect) {
      const opt = Array.from(machineSelect.options).find(o => o.value === machineParam);
      if (opt) machineSelect.value = machineParam;
    }
  }
  if (typeParam === 'spares') {
    const sparesRadio = document.getElementById('typeSpares');
    if (sparesRadio) {
      sparesRadio.checked = true;
      updateVisibility();
    }
  }

  /* ── VALIDATION ── */
  function setError(field, show) {
    const wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.toggle('has-error', show);
  }

  function validatePhone(val) {
    const digits = val.replace(/\D/g, '');
    return digits.length === 10;
  }
  function validateEmail(val) {
    if (!val) return true; // optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function validateForm() {
    let valid = true;
    const name = document.getElementById('fName');
    const phone = document.getElementById('fPhone');
    const email = document.getElementById('fEmail');

    if (!name.value.trim()) { setError(name, true); valid = false; } else { setError(name, false); }
    if (!validatePhone(phone.value)) { setError(phone, true); valid = false; } else { setError(phone, false); }
    if (!validateEmail(email.value)) { setError(email, true); valid = false; } else { setError(email, false); }

    return valid;
  }

  /* ── SUBMIT (static-site simulation: logs payload, shows success state) ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = form.querySelector('.has-error input, .has-error select');
      firstError?.focus();
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = window.techvinTranslate ? window.techvinTranslate('form_submitting') : 'Sending…';

    // Collect payload (for static hosting, wire this to Formspree / Netlify Forms / EmailJS / your backend)
    const formData = new FormData(form);
    const payload = {
      enquiryType: formData.get('enquiryType'),
      name: formData.get('name'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      city: formData.get('city'),
      machine: formData.get('machine'),
      parts: formData.getAll('partName[]').map((name, i) => ({
        name,
        qty: formData.getAll('partQty[]')[i]
      })).filter(p => p.name),
      message: formData.get('message')
    };
    console.log('TECHVIN enquiry payload:', payload);

    setTimeout(() => {
      formWrap.classList.add('is-hidden');
      formSuccess.classList.add('is-visible');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 700);
  });

  resetBtn?.addEventListener('click', () => {
    form.reset();
    document.querySelectorAll('.field.has-error').forEach(f => f.classList.remove('has-error'));
    formSuccess.classList.remove('is-visible');
    formWrap.classList.remove('is-hidden');
    updateVisibility();
  });
});
