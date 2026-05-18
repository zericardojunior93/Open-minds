document.addEventListener('DOMContentLoaded', () => {
    const user = window.auth?.getUsuario?.();
    const nameTargets = document.querySelectorAll('[data-platform-user-name], #platform-user-name');
    const avatarTargets = document.querySelectorAll('[data-platform-user-avatar], #platform-user-avatar');
    const logoutButtons = document.querySelectorAll('[data-platform-logout], #platform-logout-btn');

    if (user) {
        nameTargets.forEach((target) => {
            target.textContent = user.nome || 'Aluno Open Minds';
        });

        avatarTargets.forEach((target) => {
            if (target.tagName === 'IMG') {
                if (user.foto) {
                    target.src = user.foto;
                    target.alt = user.nome || 'Foto do perfil';
                } else {
                    target.removeAttribute('src');
                    target.alt = 'Foto do perfil';
                }
            } else {
                target.textContent = (user.nome || user.email || 'Aluno').trim().charAt(0).toUpperCase();
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
