// Dados de Planos e Assinaturas
window.subscriptionData = {
    minhaAssinatura: {
        id: "active_1",
        plano: "Aprendiz",
        status: "Ativo",
        proximaCobranca: "15/05/2026",
        valor: "R$ 29,00",
        periodo: "Mensal (12x)"
    },
    planosDisponiveis: [
        {
            id: "plan_aprendiz",
            nome: "APRENDIZ",
            desconto: "20% OFF",
            preco: "12x R$ 29",
            periodo: "/mês",
            duracao: "Acesso por 12 meses",
            botao: "MATRICULAR-SE",
            destaque: false,
            beneficios: [
                "Marketplace essencial",
                "Trilhas introdutórias",
                "Comunidade Open Minds",
                "Suporte via fórum"
            ]
        },
        {
            id: "plan_inovador",
            nome: "INOVADOR",
            desconto: "25% OFF",
            preco: "12x R$ 79",
            periodo: "/mês",
            duracao: "Acesso vitalício aos conteúdos",
            botao: "ASSINAR AGORA",
            destaque: true,
            beneficios: [
                "Cursos premium ilimitados",
                "Gamificação completa",
                "Comunidade exclusiva",
                "Marketplace híbrido",
                "Suporte prioritário"
            ]
        },
        {
            id: "plan_expert",
            nome: "EXPERT",
            desconto: "30% OFF",
            preco: "12x R$ 149",
            periodo: "/mês",
            duracao: "Acesso vitalício + Mentorias",
            botao: "ESCOLHER EXPERT",
            destaque: false,
            beneficios: [
                "Mentorias diretas (1on1)",
                "Certificados reconhecidos",
                "Projetos com parceiros reais",
                "Todos benefícios Inovador",
                "Consultoria de Carreira"
            ]
        }
    ]
};
