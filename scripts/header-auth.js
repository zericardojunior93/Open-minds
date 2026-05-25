// Utilitário para atualizar o Header com o estado de Autenticação
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');
    const auth = window.auth;

    if (loginBtn && auth) {
        const usuario = auth.getUsuario();

        if (usuario) {
            // Se estiver logado, muda o "Entrar" para um menu de usuário
            loginBtn.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span class="texto-ciano" style="font-weight: 700;">Olá, ${usuario.nome.split(' ')[0]}</span>
                    <button id="logout-btn" style="background: none; border: 1px solid #333; color: #888; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">Sair</button>
                </div>
            `;
            loginBtn.style.padding = '0';
            loginBtn.style.background = 'none';
            loginBtn.style.border = 'none';

            // Lógica de Logout
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                auth.logout();
            });

        } else {
            // Se não estiver logado, garante que o botão leve ao login.html
            loginBtn.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
        }
    }
});
