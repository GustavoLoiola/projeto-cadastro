const username = localStorage.getItem('name');
const sessionUserEl = document.getElementById('sessionUser');

if (username) {
  sessionUserEl.innerHTML = 'Bem vindo,  <strong>' + username + '!' + '</strong>';
} else {
  sessionUserEl.textContent = 'Nenhuma sessão ativa';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  window.location.href = 'index.html';
});