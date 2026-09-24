const API_BASE_URL = 'http://localhost:3000';

function authHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
}

function showBanner(type, message) {
  const el = document.getElementById('editarBanner');
  el.textContent = message;
  el.className = 'banner show ' + type;
}

function hideBanner() {
  document.getElementById('editarBanner').className = 'banner';
}

let produtoEmEdicaoId = null;

document.getElementById('btnBuscar').addEventListener('click', async () => {
  hideBanner();
  document.getElementById('editarForm').classList.remove('show');

  const id = document.getElementById('editarId').value.trim();
  if (!id) {
    showBanner('error', 'Informe um ID válido.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { headers: authHeaders() });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        showBanner('error', 'Sessão inválida ou expirada. Faça login novamente.');
      } else if (res.status === 404) {
        showBanner('error', 'Nenhum produto encontrado com esse ID.');
      } else {
        showBanner('error', 'Erro ao buscar produto (' + res.status + ').');
      }
      return;
    }

    const produto = await res.json();
    produtoEmEdicaoId = produto.id;

    document.getElementById('editNome').value = produto.name ?? '';
    document.getElementById('editDescricao').value = produto.description ?? '';
    document.getElementById('editPreco').value = produto.price ?? '';
    document.getElementById('editQuantidade').value = produto.quantity ?? '';

    document.getElementById('editarForm').classList.add('show');
  } catch (err) {
    showBanner('error', 'Não foi possível conectar ao backend.');
  }
});

document.getElementById('btnSalvar').addEventListener('click', async () => {
  if (!produtoEmEdicaoId) return;
  hideBanner();

  const payload = {
    name: document.getElementById('editNome').value.trim(),
    description: document.getElementById('editDescricao').value.trim(),
    price: parseFloat(document.getElementById('editPreco').value),
    quantity: parseInt(document.getElementById('editQuantidade').value, 10)
  };

  if (!payload.name || isNaN(payload.price) || isNaN(payload.quantity)) {
    showBanner('error', 'Preencha nome, preço e quantidade corretamente.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/products/${produtoEmEdicaoId}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        showBanner('error', 'Sessão inválida ou expirada. Faça login novamente.');
      } else {
        showBanner('error', 'Falha ao salvar alterações (' + res.status + ').');
      }
      return;
    }

    showBanner('success', 'Produto atualizado com sucesso!');
  } catch (err) {
    showBanner('error', 'Não foi possível conectar ao backend.');
  }
});