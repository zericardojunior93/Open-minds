// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Interatividade nos Cards de Tecnologia (Baseado na image_1.png)
    const techCards = document.querySelectorAll('.tech-card');
    
    // Define o primeiro card como ativo inicialmente (opcional, conforme design)
    if (techCards.length > 0) {
        techCards[0].classList.add('active');
    }

    techCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove a classe 'active' de todos os cards
            techCards.forEach(c => c.classList.remove('active'));
            
            // Adiciona a classe 'active' apenas ao card clicado
            card.classList.add('active');
            
            // Aqui você poderia adicionar lógica para mudar a descrição ao lado
            // com base no valor de 'data-tech'.
            const techName = card.getAttribute('data-tech');
            console.log(`Tecnologia selecionada: ${techName}`);
        });
    });

    // 2. Interatividade nas Trilhas Formativas (Baseado na image_5.png)
    const trilhaCards = document.querySelectorAll('.trilha-card');

    trilhaCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove a classe 'active' de todas as trilhas
            trilhaCards.forEach(c => c.classList.remove('active'));
            
            // Adiciona a classe 'active' apenas à trilha clicada (brilho ciano)
            card.classList.add('active');
            
            console.log(`Trilha selecionada: ${card.querySelector('h3').innerText}`);
        });
    });

    // 3. Newsletter do Rodapé
    const footerNewsletterForms = document.querySelectorAll('.footer-newsletter-form');
    footerNewsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Simulação de sucesso
                emailInput.disabled = true;
                emailInput.style.color = 'var(--ciano)';
                emailInput.value = 'Inscrito com sucesso!';
                form.querySelector('button').style.display = 'none';
                form.style.borderColor = 'var(--ciano)';
                form.style.background = 'rgba(0, 242, 254, 0.05)';
            }
        });
    });

    // 4. Ativar Link do Menu Dinamicamente
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Se a URL estiver vazia (home raíz) ou for index.html, ativa o link de Home
        if ((currentPath === "index.html" || currentPath === "") && (linkPath === "#inicio" || linkPath === "index.html")) {
            link.classList.add('active');
        } 
        // Verifica outras páginas como blog.html, cursos.html, etc
        else if (linkPath === currentPath) {
            link.classList.add('active');
        }
        // Caso especial: se estiver lendo um post, a aba "Blog" deve continuar ativa
        else if (currentPath === "post.html" && linkPath === "blog.html") {
            link.classList.add('active');
        }
    });

    // 5. Atalho para a area do aluno quando houver usuario autenticado
    const loginBtn = document.querySelector('.login-btn');
    if (window.auth && loginBtn && window.auth.estaLogado()) {
        const hasStudentLink = loginBtn.querySelector('a[href="aluno.html"]');
        const user = window.auth.getUsuario();

        if (!hasStudentLink && user) {
            loginBtn.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap; justify-content: flex-end;">
                    <a href="aluno.html" class="texto-ciano" style="text-decoration: none; font-weight: 700;">Area do aluno</a>
                    <span class="texto-ciano" style="font-weight: 700;">Ola, ${user.nome.split(' ')[0]}</span>
                    <button id="logout-btn-enhanced" style="background: none; border: 1px solid #333; color: #888; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">Sair</button>
                </div>
            `;
            loginBtn.style.padding = '0';
            loginBtn.style.background = 'none';
            loginBtn.style.border = 'none';

            const enhancedLogout = document.getElementById('logout-btn-enhanced');
            if (enhancedLogout) {
                enhancedLogout.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.auth.logout();
                });
            }
        }
    }

    // 6. Indicador do carrossel mobile de beneficios
    const benefitsSection = document.querySelector('.main-benefits');
    const benefitsCarousel = document.querySelector('.main-benefits-grid');

    if (benefitsSection && benefitsCarousel) {
        const updateBenefitsHint = () => {
            const maxScroll = benefitsCarousel.scrollWidth - benefitsCarousel.clientWidth;
            const hasOverflow = maxScroll > 4;
            const hasContentToRight = benefitsCarousel.scrollLeft < maxScroll - 4;

            benefitsSection.classList.toggle('has-more', hasOverflow);
            benefitsSection.classList.toggle('at-end', !hasOverflow || !hasContentToRight);
        };

        benefitsCarousel.addEventListener('scroll', updateBenefitsHint, { passive: true });
        window.addEventListener('resize', updateBenefitsHint);
        window.addEventListener('load', updateBenefitsHint);
        updateBenefitsHint();
    }

    // 7. Injeção Dinâmica da Barra de Destaque Superior com Cronômetro (Fixa/Permanente)
    const bar = document.createElement('div');
    bar.id = 'announcement-bar';
    bar.className = 'announcement-bar';
    
    // Define o caminho correto para a página de planos
    const isSubpage = window.location.pathname.includes('/pages/');
    const actionLink = isSubpage ? 'planos.html' : 'pages/planos.html';

    bar.innerHTML = `
        <div class="announcement-content-left">
            <span class="highlight-badge">Aceleração Tech</span>
            <span>⚡ Últimas horas com desconto especial nos planos!</span>
        </div>
        <div class="announcement-timer">
            <div class="timer-segment"><span id="timer-days">00</span><small>Dias</small></div>
            <span class="timer-separator">:</span>
            <div class="timer-segment"><span id="timer-hours">00</span><small>Horas</small></div>
            <span class="timer-separator">:</span>
            <div class="timer-segment"><span id="timer-mins">00</span><small>Min</small></div>
            <span class="timer-separator">:</span>
            <div class="timer-segment"><span id="timer-secs">00</span><small>Seg</small></div>
        </div>
        <div class="announcement-content-right">
            <a href="${actionLink}" class="announcement-btn">Garantir Vaga!</a>
        </div>
    `;
    
    // Insere a barra no topo absoluto do body
    document.body.insertBefore(bar, document.body.firstChild);

    // Inicializa o cronômetro
    startAnnouncementTimer();

    function startAnnouncementTimer() {
        let targetTime = localStorage.getItem('omAnnouncementTarget');
        if (!targetTime) {
            // Define 2 dias, 2 horas, 17 minutos, 24 segundos (181044 segundos)
            targetTime = Date.now() + 181044 * 1000;
            localStorage.setItem('omAnnouncementTarget', targetTime);
        } else {
            targetTime = parseInt(targetTime, 10);
            // Se expirou, reseta o tempo para manter a urgência sempre ativa
            if (targetTime < Date.now()) {
                targetTime = Date.now() + 181044 * 1000;
                localStorage.setItem('omAnnouncementTarget', targetTime);
            }
        }

        function updateTimer() {
            const now = Date.now();
            const diff = targetTime - now;

            if (diff <= 0) {
                document.getElementById('announcement-bar')?.remove();
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const dEl = document.getElementById('timer-days');
            const hEl = document.getElementById('timer-hours');
            const mEl = document.getElementById('timer-mins');
            const sEl = document.getElementById('timer-secs');

            if (dEl) dEl.textContent = String(days).padStart(2, '0');
            if (hEl) hEl.textContent = String(hours).padStart(2, '0');
            if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
            if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

});

