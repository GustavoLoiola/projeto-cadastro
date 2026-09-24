const form = document.getElementById('loginForm');
const banner = document.getElementById('formBanner');

const rules = {
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Informe um e-mail válido (precisa conter @ e domínio).'
  },
  senha: {
    validate: (v) => v.length > 0,
    message: 'Informe sua senha.'
  }
};

function setFieldState(fieldEl, isValid, isEmpty, message) {
  if (!fieldEl) return;
  const errorEl = fieldEl.querySelector('.error-msg');
  fieldEl.classList.remove('valid', 'invalid');

  if (isEmpty) {
    if (errorEl) errorEl.textContent = '';
    return;
  }

  if (isValid) {
    if (errorEl) errorEl.textContent = '';
  } else {
    fieldEl.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  }
}

function validateField(name) {
  const input = document.getElementById(name);
  if (!input) return true;
  const fieldEl = form.querySelector(`[data-field="${name}"]`);
  const value = input.value;
  const isEmpty = value.trim() === '' && document.activeElement !== input;

  const isValid = rules[name].validate(value);
  setFieldState(fieldEl, isValid, isEmpty, rules[name].message);
  return isValid;
}

['email', 'senha'].forEach((name) => {
  const input = document.getElementById(name);
  if (!input) return;
  input.addEventListener('input', () => validateField(name));
  input.addEventListener('blur', () => validateField(name));
});

document.querySelectorAll('.toggle-visibility').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;
    const isPassword = target.type === 'password';
    target.type = isPassword ? 'text' : 'password';
    btn.textContent = isPassword ? 'OCULTAR' : 'MOSTRAR';
  });
});


const API_BASE_URL = 'http://localhost:3000';

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const results = ['email', 'senha'].map((name) => validateField(name));
  const allValid = results.every(Boolean);

  banner.classList.remove('show', 'success', 'error');

  if (!allValid) {
    banner.textContent = 'Corrija os campos destacados antes de continuar.';
    banner.classList.add('show', 'error');
    return;
  }

  const emailValue = document.getElementById('email').value.trim();

  const payload = {
    email: emailValue,           // <- corrigido: era "username"
    password: document.getElementById('senha').value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

   if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);

    banner.textContent = 'Login realizado com sucesso! Entrando...';
    banner.classList.add('show', 'success');

    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);

  } 
  else {
    banner.textContent = data.message || 'E-mail ou senha incorretos.';
    banner.classList.add('show', 'error');
  }
  
  } catch (err) {
    console.error('Erro na autenticação:', err);
    banner.textContent = 'Erro ao conectar com o servidor.';
    banner.classList.add('show', 'error');
  }
});

// --- Modal Esqueci a Senha ---
const forgotBtn = document.getElementById('forgotBtn');
const forgotOverlay = document.getElementById('forgotOverlay');
const forgotCancel = document.getElementById('forgotCancel');
const forgotSend = document.getElementById('forgotSend');
const recoveryInput = document.getElementById('recoveryEmail');
const recoveryField = document.querySelector('[data-field="recoveryEmail"]');

if (forgotBtn && forgotOverlay) {
  forgotBtn.addEventListener('click', () => {
    forgotOverlay.classList.add('show');
    recoveryInput.value = '';
    recoveryField.classList.remove('invalid');
    recoveryInput.focus();
  });

  forgotCancel.addEventListener('click', () => {
    forgotOverlay.classList.remove('show');
  });

  forgotOverlay.addEventListener('click', (e) => {
    if (e.target === forgotOverlay) forgotOverlay.classList.remove('show');
  });

  forgotSend.addEventListener('click', () => {
    const value = recoveryInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isValid) {
      recoveryField.classList.add('invalid');
      recoveryField.querySelector('.error-msg').textContent = 'Informe um e-mail válido.';
      return;
    }

    forgotOverlay.classList.remove('show');
    banner.textContent = 'Se o e-mail estiver cadastrado, enviamos um link de recuperação.';
    banner.classList.remove('error');
    banner.classList.add('show', 'success');
  });
}