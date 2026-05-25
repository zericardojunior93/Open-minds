(function () {
    const PRODUCT_KNOWLEDGE = {
        identity: {
            name: "Nexi",
            role: "Assistente oficial da Open Minds",
            persona: "Feminina, amigavel, parceira e positiva"
        },
        products: [
            {
                name: "Plano Aprendiz",
                price: "12x R$ 29/mes",
                description: "Plano de entrada para quem quer comecar na Open Minds.",
                benefits: [
                    "Marketplace essencial",
                    "Trilhas introdutorias",
                    "Comunidade Open Minds",
                    "Suporte via forum"
                ]
            },
            {
                name: "Plano Inovador",
                price: "12x R$ 79/mes",
                description: "Plano premium com acesso mais completo para evolucao continua.",
                benefits: [
                    "Cursos premium ilimitados",
                    "Gamificacao completa",
                    "Comunidade exclusiva",
                    "Marketplace hibrido",
                    "Suporte prioritario"
                ]
            },
            {
                name: "Plano Expert",
                price: "12x R$ 149/mes",
                description: "Plano mais avancado para quem quer acelerar carreira e mentoria.",
                benefits: [
                    "Mentorias diretas 1on1",
                    "Certificados reconhecidos",
                    "Projetos com parceiros reais",
                    "Todos os beneficios do Inovador",
                    "Consultoria de carreira"
                ]
            },
            {
                name: "Area do aluno",
                price: "Inclusa para assinantes",
                description: "Plataforma privada para assistir cursos, ver assinatura e acessar aulas.",
                benefits: [
                    "Biblioteca de cursos",
                    "Pagina de aulas",
                    "Painel de assinatura",
                    "Experiencia de plataforma separada do site institucional"
                ]
            }
        ],
        courses: [
            "Arquitetura de Cloud & DevOps",
            "Engenheiro de Prompt & Automacao Profissional",
            "Engenheiro de Dados: Fundamentos e Pratica",
            "Especialista em Ciberseguranca",
            "Analista de Dados & BI",
            "Dev Full Stack Moderno",
            "IA Generativa: De Python a Agentes Autonomos",
            "Gamificando a Vida: Estrategias de Engajamento",
            "Aceleracao Tech: Front-End, Mobile e DevOps",
            "Desbloqueie seu Potencial: Curso Pratico de Habilidades Tecnicas",
            "Cursos Digitais para Todos",
            "Domine as Habilidades Digitais do Futuro: Seu Guia Completo"
        ],
        rules: {
            focusMessage: "No momento, eu foco nos servicos e produtos da Open Minds. Se quiser, posso te ajudar com planos, cursos, assinatura ou a area do aluno."
        }
    };

    const PRODUCT_CONTEXT = [
        `Identidade: ${PRODUCT_KNOWLEDGE.identity.name}, ${PRODUCT_KNOWLEDGE.identity.role}, ${PRODUCT_KNOWLEDGE.identity.persona}.`,
        "Produtos da Open Minds:",
        ...PRODUCT_KNOWLEDGE.products.map((product) =>
            `- ${product.name} | Preco: ${product.price} | Descricao: ${product.description} | Beneficios: ${product.benefits.join(", ")}.`
        ),
        `Cursos disponiveis: ${PRODUCT_KNOWLEDGE.courses.join("; ")}.`,
        `Se a pergunta estiver fora dessa base, responda: "${PRODUCT_KNOWLEDGE.rules.focusMessage}".`
    ].join("\n");

    let generatorPromise = null;
    let generator = null;

    function buildPrompt(question) {
        return [
            "Voce e Nexi, assistente oficial da Open Minds.",
            "Fale apenas em portugues do Brasil.",
            "Responda de forma simples, direta, amigavel e curta, em no maximo 2 frases.",
            "Use somente a base de conhecimento abaixo.",
            "Nao invente informacoes.",
            PRODUCT_CONTEXT,
            `Pergunta do usuario: ${question}`,
            "Resposta:"
        ].join("\n\n");
    }

    function isOpenMindsQuestion(message) {
        const normalized = message.toLowerCase();
        const keywords = [
            "open minds", "plano", "assinatura", "curso", "aula", "nexi", "aprendiz",
            "inovador", "expert", "beneficio", "preco", "valor", "mensal", "mentoria",
            "carreira", "catalogo", "area do aluno", "area do estudante", "biblioteca"
        ];

        return keywords.some((keyword) => normalized.includes(keyword)) ||
            PRODUCT_KNOWLEDGE.products.some((product) => normalized.includes(product.name.toLowerCase())) ||
            PRODUCT_KNOWLEDGE.courses.some((course) => normalized.includes(course.toLowerCase()));
    }

    function createWidget() {
        if (document.querySelector(".nexi-widget")) return;

        const root = document.createElement("div");
        root.className = "nexi-widget";
        root.innerHTML = `
            <div class="nexi-panel" hidden>
                <div class="nexi-header">
                    <div class="nexi-brand">
                        <div class="nexi-avatar">N</div>
                        <div>
                            <strong>Nexi</strong>
                            <span>Assistente da Open Minds</span>
                        </div>
                    </div>
                    <button class="nexi-close" type="button" aria-label="Fechar">✕</button>
                </div>
                <div class="nexi-messages"></div>
                <div class="nexi-footer">
                    <div class="nexi-status-row">
                        <span class="nexi-dot"></span>
                        <span class="nexi-status">Modelo ainda nao carregado.</span>
                    </div>
                    <form class="nexi-form">
                        <input class="nexi-input" type="text" placeholder="Pergunte sobre planos, cursos ou assinatura" />
                        <button class="nexi-send" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
            <button class="nexi-launcher" type="button" aria-label="Abrir chat da Nexi">💬</button>
        `;

        document.body.appendChild(root);
        bindWidget(root);
    }

    function appendMessage(messagesEl, role, text) {
        const item = document.createElement("div");
        item.className = `nexi-message ${role}`;
        item.textContent = text;
        messagesEl.appendChild(item);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function setStatus(root, type, text) {
        const dot = root.querySelector(".nexi-dot");
        const status = root.querySelector(".nexi-status");
        dot.classList.remove("ready", "loading");
        if (type) dot.classList.add(type);
        status.textContent = text;
    }

    async function ensureGenerator(root) {
        if (generator) {
            setStatus(root, "ready", "Modelo pronto para responder.");
            return generator;
        }

        if (!generatorPromise) {
            generatorPromise = (async () => {
                setStatus(root, "loading", "Carregando modelo no navegador...");
                const { pipeline, env } = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1");
                env.allowLocalModels = false;
                return pipeline("text2text-generation", "Xenova/flan-t5-small");
            })();
        }

        generator = await generatorPromise;
        setStatus(root, "ready", "Modelo pronto para responder.");
        return generator;
    }

    async function askNexi(root, question) {
        const messagesEl = root.querySelector(".nexi-messages");
        appendMessage(messagesEl, "user", question);

        if (!isOpenMindsQuestion(question)) {
            appendMessage(messagesEl, "assistant", PRODUCT_KNOWLEDGE.rules.focusMessage);
            return;
        }

        try {
            const model = await ensureGenerator(root);
            setStatus(root, "loading", "Nexi esta pensando...");
            const prompt = buildPrompt(question);
            const result = await model(prompt, {
                max_new_tokens: 90,
                temperature: 0.2,
                repetition_penalty: 1.1
            });

            const answer = (result?.[0]?.generated_text || "").trim() || PRODUCT_KNOWLEDGE.rules.focusMessage;
            appendMessage(messagesEl, "assistant", answer);
            setStatus(root, "ready", "Modelo pronto para responder.");
        } catch (error) {
            console.error("Erro ao carregar a Nexi:", error);
            setStatus(root, "", "Nao foi possivel carregar o modelo agora.");
            appendMessage(messagesEl, "assistant", "Tive um problema tecnico para responder agora. Posso tentar novamente se voce perguntar sobre um plano ou curso da Open Minds.");
        }
    }

    function bindWidget(root) {
        const panel = root.querySelector(".nexi-panel");
        const launcher = root.querySelector(".nexi-launcher");
        const closeBtn = root.querySelector(".nexi-close");
        const form = root.querySelector(".nexi-form");
        const input = root.querySelector(".nexi-input");
        const messagesEl = root.querySelector(".nexi-messages");

        appendMessage(messagesEl, "assistant", "Bem-vindo(a)! Eu sou a Nexi. Posso te ajudar com planos, cursos, assinatura e a area do aluno da Open Minds.");

        launcher.addEventListener("click", async () => {
            panel.hidden = !panel.hidden;
            if (!panel.hidden) {
                input.focus();
                try {
                    await ensureGenerator(root);
                } catch (error) {
                    console.error(error);
                }
            }
        });

        closeBtn.addEventListener("click", () => {
            panel.hidden = true;
        });

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const question = input.value.trim();
            if (!question) return;
            input.value = "";
            await askNexi(root, question);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createWidget);
    } else {
        createWidget();
    }
})();
