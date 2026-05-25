document.addEventListener('DOMContentLoaded', () => {
    const user = window.auth?.getUsuario?.();
    const nameTargets = document.querySelectorAll('[data-platform-user-name], #platform-user-name');
    const avatarTargets = document.querySelectorAll('[data-platform-user-avatar], #platform-user-avatar');
    const logoutButtons = document.querySelectorAll('[data-platform-logout], #platform-logout-btn');
    const defaultAvatar = '../assets/img/default-profile.png';

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
                target.onerror = () => {
                    if (target && target.src !== defaultAvatar) {
                        target.src = defaultAvatar;
                    }
                    target.onerror = null;
                };

                // Caso o browser não dispare o onerror (ex: src vazio), aplica fallback imediatamente.
                if (!target.getAttribute('src')) {
                    target.src = defaultAvatar;
                }

                if (user.foto) {
                    target.src = user.foto;
                    target.alt = nomeExibir || 'Foto do perfil';
                } else {
                    target.src = defaultAvatar;
                    target.alt = 'Foto do perfil';
                }
            } else {
                