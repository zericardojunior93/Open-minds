// Dados de Planos e Assinaturas
window.subscriptionData = {
    minhaAssinatura: {
        id: "active_1",
        plano: "Aprendiz",
        status: "Ativo",
        proximaCobranca: "15/05/2026",
        valor: "R$ 29,00",
        periodo: "Mensal (12x)",
        inicio: "15/04/2026",
        renovacaoAutomatica: "Ativada",
        acesso: "Biblioteca essencial liberada",
        progresso: "38% da trilha principal concluida",
        certificado: "Disponivel ao concluir os modulos",
        suporte: "Suporte via forum e comunidade",
        recursosAtivos: [
            "Acesso aos cursos essenciais da plataforma",
            "Comunidade Open Minds liberada",
            "Trilhas introdutorias organizadas por area",
            "Historico de progresso vinculado ao perfil"
        ],
        metricas: [
            { label: "Cursos liberados", valor: "12" },
            { label: "Horas disponiveis", valor: "30h+" },
            { label: "Proxima cobranca", valor: "15/05" }
        ],
        pagamentos: [
            "Pagamento atual: Cartao final 4587",
            "Renovacao automatica habilitada",
            "Historico sem pendencias"
        ]
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
