/**
 * Central de Dados do Blog
 * Adicione novos posts nesta lista.
 */
const blogPosts = [
    {
        id: "1",
        titulo: "Transforme Seu Aprendizado com Gamificação e Supere as Barreiras das Plataformas Tradicionais!",
        autor: "José Ricardo",
        data: "há 6 dias",
        leitura: "3 min de leitura",
        resumo: "A forma como aprendemos está mudando rapidamente. Plataformas tradicionais de ensino, muitas vezes baseadas em métodos passivos e repetitivos, não conseguem manter o interesse e a motivação dos alunos. A gamificação surge como uma solução poderosa para transformar o aprendizado, tornando-o mais envolvente e eficaz do que nunca. Ao aplicar dinâmicas de jogos em contextos educacionais, conseguimos criar trilhas personalizadas onde o progresso é celebrado a cada pequena conquista, mantendo o engajamento e a fluidez do conhecimento de maneira contínua e estimulante para todos os perfis de estudantes",
        conteudo: `
            <p>A gamificação não é apenas sobre pontos e rankings, é sobre o engajamento psicológico e a jornada do herói na educação.</p>
            <p>Quando aplicamos elementos de game design em tarefas reais, ativamos gatilhos mentais que favorecem a retenção de conteúdo e a superação de desafios complexos.</p>
            <p>Na Open Minds, usamos essa técnica para garantir que cada etapa do seu aprendizado seja uma vitória.</p>
        `,
        temImagem: true,
        stats: { views: "4 visualizações", comentarios: "1 comentário" }
    },
    {
        id: "2",
        titulo: "Setup de Milhões: Estratégias Inovadoras para Montar Seu Escritório com Baixo Investimento",
        autor: "José Ricardo",
        data: "há 6 dias",
        leitura: "3 min de leitura",
        resumo: "Montar um escritório que pareça e funcione como um setup de milhões não precisa custar uma fortuna. Muitas vezes, o que diferencia um ambiente de trabalho eficiente e agradável não é o valor gasto, mas as escolhas inteligentes feitas durante a montagem. Se você quer criar um espaço funcional, confortável e que inspire sua produtividade diária, este guia prático vai te mostrar por onde começar, focando no que realmente importa na ergonomia e na organização sem pesar no bolso para garantir que seu ambiente de trabalho seja impecável em todos os detalhes, desde a iluminação até a disposição estratégica dos seus equipamentos essenciais",
        conteudo: `
            <p>Um bom setup começa pela ergonomia. A altura da sua tela e o suporte da sua cadeira são mais importantes que as luzes RGB.</p>
            <p>Escolhas como iluminação natural, organização de cabos e periféricos de qualidade básica podem transformar sua produtividade sem esvaziar sua conta bancária.</p>
        `,
        temImagem: true,
        stats: { views: "1 visualização", comentarios: "0 comentário" }
    },
    {
        id: "3",
        titulo: "O Erro Comum que Pode Desencorajar Iniciantes na Programação e Como Evitá-lo",
        autor: "José Ricardo",
        data: "há 6 dias",
        leitura: "3 min de leitura",
        resumo: "Começar a programar é um desafio empolgante, mas muitos iniciantes acabam desistindo logo no início. Um erro simples, porém muito comum, é o responsável por essa desistência precoce. Entender esse erro e saber como evitá-lo pode fazer toda a diferença para quem está começando a jornada na programação. Erro ao tentar aprender tudo de uma vez sem focar na base lógica pode gerar frustração e a sensação de que a programação não é para você, quando na verdade é apenas uma falha de estratégia que pode ser corrigida com passos pequenos e constantes",
        conteudo: `
            <p>O maior erro é tentar aprender "tudo ao mesmo tempo". A pressa em dominar frameworks antes de entender a lógica de programação.</p>
            <p>Foque no básico, entenda como o computador processa informações e então siga para as ferramentas complexas.</p>
        `,
        temImagem: true,
        stats: { views: "0 visualização", comentarios: "0 comentário" }
    },
    {
        id: "4",
        titulo: "Maximize sua Produtividade: 5 Ferramentas de IA para Desenvolvedores que Ganham 4 Horas no Dia",
        autor: "José Ricardo",
        data: "há 6 dias",
        leitura: "3 min de leitura",
        resumo: "A vida de um desenvolvedor é repleta de desafios, prazos curtos e tarefas repetitivas que consomem tempo precioso. Imagine recuperar quatro horas do seu dia utilizando ferramentas de inteligência artificial (IA) que automatizam processos, auxiliam na escrita de código e simplificam a resolução de problemas. Este artigo explora as melhores ferramentas do mercado para otimizar seu workflow diário e permitir que você foque no que realmente importa, que é a criatividade e a arquitetura de soluções complexas e eficientes",
        conteudo: `
            <p>Ferramentas como Copilot, ChatGPT e Claude estão revolucionando a forma como escrevemos código.</p>
            <p>Aprender a usar o Prompt Engineering corretamente pode te poupar horas de debugging e documentação maçante.</p>
        `,
        temImagem: false,
        stats: { views: "1 visualização", comentarios: "0 comentário" }
    },
    {
        id: "5",
        titulo: "Guia do Iniciante para Conquistar seu Primeiro Projeto Freela como Desenvolvedor",
        autor: "José Ricardo",
        data: "há 6 dias",
        leitura: "3 min de leitura",
        resumo: "Conseguir o primeiro projeto como freelancer pode parecer um desafio enorme para quem está começando na área de desenvolvimento. A dúvida sobre onde buscar oportunidades, como apresentar seu trabalho e como se organizar para entregar um serviço de qualidade é comum. Este guia foi feito para ajudar quem está começando do absoluto zero no mercado freelancer, trazendo dicas de posicionamento e como negociar seus primeiros valores de forma profissional e escalável",
        conteudo: `
            <p>O segredo do freela está no portfólio. Mostre o que você sabe resolver, não apenas o que você estudou.</p>
            <p>Plataformas como Workana, Upwork e parcerias locais são excelentes pontos de partida para ganhar experiência e autoridade.</p>
        `,
        temImagem: true,
        stats: { views: "0 visualização", comentarios: "0 comentário" }
    }
];

// Torna os dados acessíveis globalmente ou exportados se usar módulos
// No Vanilla, deixamos global para facilitar.
window.blogData = blogPosts;
