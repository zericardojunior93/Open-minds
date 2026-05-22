document.addEventListener('DOMContentLoaded', () => {
    const user = window.auth?.getUsuario?.();
    const nameTargets = document.querySelectorAll('[data-platform-user-name], #platform-user-name');
    const avatarTargets = document.querySelectorAll('[data-platform-user-avatar], #platform-user-avatar');
    const logoutButtons = document.querySelectorAll('[data-platform-logout], #platform-logout-btn');

    if (user) {
        // Nome especial para Conta de Desenvolvedor
        let nomeExibir = user.nome;
        if (user.email === 'zericardojunior93@gmail.com') {
            nomeExibir = 'Conta de Desenvolvedor';
        }
        nameTargets.forEach((target) => {
            target.textContent = nomeExibir || 'Aluno Open Minds';
        });

        avatarTargets.forEach((target) => {
            if (target.tagName === 'IMG') {
                if (user.foto) {
                    target.src = user.foto;
                    target.alt = nomeExibir || 'Foto do perfil';
                } else {
                    target.src = 'img/default-profile.png';
                    target.alt = 'Foto do perfil';
                }
            } else {
                target.textContent = (nomeExibir || user.email || 'Aluno').trim().charAt(0).toUpperCase();
            }
        });
    }

    logoutButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            window.auth?.logout?.();
        });
    });
});
