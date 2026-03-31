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
    
});
