const API_BASE_URL = 'http://localhost:3000';

function authHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
}

function showBanner(message) {
  const el = document.getElementById('listarBanner');
  el.textContent = message;
  el.className = 'banner show error';
}

function hideBanner() {
  document.getElementById('listarBanner').className = 'banner';
}

function formatCurrency(value) {
  const num = Number(value);
  return isNaN(num) ? value : num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

async function carregarLista() {
  hideBanner();
  const container = document.getElementById('listaContainer');
  container.innerHTML = '<p class="empty-state">Carregando...</p>';

  try {
    const res = await fetch(`${API_BASE_URL}/products`, { headers: authHeaders() });

    if (!res.ok) {
      container.innerHTML = '';
      if (res.status === 401 || res.status === 403) {
        showBanner('Sessão inválida ou expirada. Faça login novamente para continuar.');
      } else {
        showBanner('Falha ao buscar produtos (' + res.status + ').');
      }
      return;
    }

    const produtos = await res.json();

    if (!produtos.length) {
      container.innerHTML = '<p class="empty-state">Nenhum produto cadastrado ainda.</p>';
      return;
    }

    const rows = produtos.map((p) => `
      <tr>
        <td>${p.id}</td>
        <td>${p.name ?? ''}</td>
        <td>${p.description ?? ''}</td>
        <td>${formatCurrency(p.price)}</td>
        <td>${p.quantity ?? ''}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <table>
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Preço</th><th>Qtd.</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } catch (err) {
    container.innerHTML = '';
    showBanner('Não foi possível conectar ao backend. Verifique se ele está rodando.');
  }
}

document.getElementById('btnAtualizar').addEventListener('click', carregarLista);
carregarLista();