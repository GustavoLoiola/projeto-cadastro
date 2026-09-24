// 1. Guarda de autenticação na página principal
const token = localStorage.getItem('token');
if (!token) {
  alert('Acesso restrito. Faça login para continuar.');
  window.location.href = 'login.html';
}

function showBanner(type, message) {
  const el = document.getElementById('editarBanner');
  el.textContent = message;
  el.className = 'banner show ' + type;
}

const form = document.getElementById('productForm');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const product = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      price: Number(document.getElementById('price').value),
      quantity: Number(document.getElementById('quantity').value)
    };

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Token enviado nos bastidores
        },
        body: JSON.stringify(product)
      });

      if (response.status === 403) {
        showBanner('error', 'Sessão inválida ou expirada. Faça login novamente.');
        localStorage.removeItem('auth_token');
        return;
      }

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      console.log('Produto cadastrado com sucesso:', data);
      alert('Produto cadastrado com sucesso!');
      form.reset();

    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar produto.');
    }
  });
}

// Função utilitária para logout (pode ser chamada por um botão Sair)
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}