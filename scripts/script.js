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

});
