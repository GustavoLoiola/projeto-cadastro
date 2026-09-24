const API_BASE_URL = 'http://localhost:3000';

function authHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };

  if (token) headers['Authorization'] = 'Bearer ' + token;

  return headers;
}

function showBanner(type, message) {
  const el = document.getElementById('excluirBanner');
  el.textContent = message;
  el.className = 'banner show ' + type;
}

function hideBanner() {
  document.getElementById('excluirBanner').className = 'banner';
}

function formatCurrency(value) {
  const num = Number(value);
  return isNaN(num)
    ? value
    : num.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
}

let produtoParaExcluirId = null;

document.getElementById('btnBuscar').addEventListener('click', async () => {
  hideBanner();
  document.getElementById('excluirCard').classList.remove('show');

  const id = document.getElementById('excluirId').value.trim();

  if (!id) {
    showBanner('error', 'Informe um ID válido.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: authHeaders()
    });

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

    produtoParaExcluirId = produto.id;

    document.getElementById('excluirNome').textContent =
      produto.name ?? '(sem nome)';

    document.getElementById('excluirMeta').textContent =
      `Preço: ${formatCurrency(produto.price)} · Quantidade: ${produto.quantity ?? '-'}`;

    document.getElementById('excluirCard').classList.add('show');

  } catch (err) {
    showBanner('error', 'Não foi possível conectar ao backend.');
  }
});

document.getElementById('btnConfirmarExclusao').addEventListener('click', async () => {
  if (!produtoParaExcluirId) return;

  const nome = document.getElementById('excluirNome').textContent;

  const confirmado = confirm(
    `Tem certeza que deseja excluir "${nome}"? Essa ação não pode ser desfeita.`
  );

  if (!confirmado) return;

  hideBanner();

  try {
    const res = await fetch(
      `${API_BASE_URL}/products/${produtoParaExcluirId}`,
      {
        method: 'DELETE',
        headers: authHeaders()
      }
    );

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        showBanner('error', 'Sessão inválida ou expirada. Faça login novamente.');
      } else {
        showBanner('error', 'Falha ao excluir produto (' + res.status + ').');
      }

      return;
    }

    document.getElementById('excluirCard').classList.remove('show');
    document.getElementById('excluirId').value = '';
    produtoParaExcluirId = null;

    showBanner('success', 'Produto excluído com sucesso!');

  } catch (err) {
    showBanner('error', 'Não foi possível excluir o produto.');
  }
});