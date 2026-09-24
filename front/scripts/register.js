const form = document.getElementById('registerForm');
const banner = document.getElementById('formBanner');
const strengthFill = document.getElementById('strengthFill');

const rules = {
  nome: {
    validate: (v) => v.trim().length >= 3,
    message: 'Informe pelo menos 3 caracteres.'
  },
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Informe um e-mail válido (precisa conter @ e domínio).'
  },
  telefone: {
    validate: (v) => v.trim() === '' || /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(v.trim()),
    message: 'Informe um telefone válido, ex.: (11) 91234-5678.'
  },
  senha: {
    validate: (v) => v.length >= 6,
    message: 'A senha deve ter no mínimo 6 caracteres.'
  },
  confirmarSenha: {
    validate: (v) => v.length > 0 && v === document.getElementById('senha').value,
    message: 'As senhas não são idênticas.'
  }
};

function setFieldState(name, isValid, isEmpty) {
  const fieldEl = form.querySelector(`[data-field="${name}"]`);
  if (!fieldEl) return;
  const errorEl = fieldEl.querySelector('.error-msg');

  fieldEl.classList.remove('valid', 'invalid');

  if (isEmpty) {
    if (errorEl) errorEl.textContent = '';
    return;
  }

  if (isValid) {
    fieldEl.classList.add('valid');
    if (errorEl) errorEl.textContent = '';
  } else {
    fieldEl.classList.add('invalid');
    if (errorEl) errorEl.textContent = rules[name].message;
  }
}

function validateField(name) {
  const input = document.getElementById(name);
  if (!input) return true;
  const value = input.value;
  const isOptionalAndEmpty = name === 'telefone' && value.trim() === '';
  const isEmpty = value.trim() === '' && name !== 'telefone';

  if (isOptionalAndEmpty) {
    setFieldState(name, true, true);
    return true;
  }

  const isValid = rules[name].validate(value);
  setFieldState(name, isValid, isEmpty && document.activeElement !== input);
  return isValid;
}

function updateStrength() {
  const value = document.getElementById('senha').value;
  let score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;

  const colors = ['#DCE3E0', '#B3452F', '#C98A3A', '#4C8C6F', '#1F6F5C'];
  const widths = [0, 25, 50, 75, 100];

  if (strengthFill) {
    strengthFill.style.width = widths[score] + '%';
    strengthFill.style.background = colors[score];
  }
}

['nome', 'email', 'telefone', 'senha', 'confirmarSenha'].forEach((name) => {
  const input = document.getElementById(name);
  if (!input) return;
  input.addEventListener('input', () => {
    validateField(name);
    if (name === 'senha') {
      updateStrength();
      if (document.getElementById('confirmarSenha').value) {
        validateField('confirmarSenha');
      }
    }
  });
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

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const fieldNames = ['nome', 'email', 'telefone', 'senha', 'confirmarSenha'];
  const results = fieldNames.map((name) => validateField(name));
  const allValid = results.every(Boolean);

  banner.classList.remove('show', 'success', 'error');

  if (!allValid) {
    banner.textContent = 'Corrija os campos destacados antes de continuar.';
    banner.classList.add('show', 'error');
    return;
  }

  // Payload formatado de acordo com seu RegisterRequest record
  const payload = {
    name: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('senha').value,
    phone: document.getElementById('telefone').value.trim() || '',
    role: 'USER' // ou defina dinamicamente se tiver um select
  };

  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      banner.textContent = 'Conta criada com sucesso! Redirecionando...';
      banner.classList.add('show', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } else {
      const errorMsg = await response.text();
      banner.textContent = errorMsg || 'Erro ao realizar cadastro.';
      banner.classList.add('show', 'error');
    }
  } catch (err) {
    console.error('Erro de conexão:', err);
    banner.textContent = 'Não foi possível conectar ao servidor.';
    banner.classList.add('show', 'error');
  }
});