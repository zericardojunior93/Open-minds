(function () {
    const FALLBACK_KNOWLEDGE = {
        identity: {
            name: "Nexi",
            role: "Assistente oficial da Open Minds",
            persona: "Feminina, amigavel, parceira e positiva"
        },
        products: [
            {
                id: "plan_aprendiz",
                name: "Plano Aprendiz",
                price: "12x R$ 29/mes",
                description: "Plano de entrada para quem quer comecar na Open Minds.",
                duration: "Acesso por 12 meses",
                benefits: ["Marketplace essencial", "Trilhas introdutorias", "Comunidade Open Minds", "Suporte via forum"]
            },
            {
                id: "plan_inovador",
                name: "Plano Inovador",
                price: "12x R$ 79/mes",
                description: "Plano premium com acesso mais completo para evolucao continua.",
                duration: "Acesso vitalicio aos conteudos",
                benefits: ["Cursos premium ilimitados", "Gamificacao completa", "Comunidade exclusiva", "Marketplace hibrido", "Suporte prioritario"]
            },
            {
                id: "plan_expert",
                name: "Plano Expert",
                price: "12x R$ 149/mes",
                description: "Plano mais avancado para quem quer acelerar carreira e mentoria.",
                duration: "Acesso vitalicio + Mentorias",
                benefits: ["Mentorias diretas 1on1", "Certificados reconhecidos", "Projetos com parceiros reais", "Todos os beneficios do Inovador", "Consultoria de carreira"]
            },
            {
                id: "student_area",
                name: "Area do aluno",
                price: "Inclusa para assinantes",
                description: "Plataforma privada para assistir cursos, ver assinatura e acessar aulas.",
                duration: "Acesso enquanto a assinatura estiver ativa",
                benefits: ["Biblioteca de cursos", "Pagina de aulas", "Painel de assinatura", "Experiencia separada do site institucional"]
            }
        ],
        rules: {
            focusMessage: "No momento, eu foco nos servicos e produtos da Open Minds. Se quiser, posso te ajudar com planos, cursos, assinatura ou a area do aluno."
        }
    };

    let generatorPromise = null;
    let generator = null;
    const PRESET_QUESTIONS = [
        "Quais planos a Open Minds oferece?",
        "Quanto custa o plano Inovador?",
        "Quais beneficios o plano Expert inclui?",
        "Como funciona a area do aluno?"
    ];

    function normalizeText(value) {
        return (value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    function cleanText(value) {
        return (value || "")
            .replace(/Ã¡/g, "á")
            .replace(/Ã£/g, "ã")
            .replace(/Ã§/g, "ç")
            .replace(/Ã©/g, "é")
            .replace(/Ãª/g, "ê")
            .replace(/Ã­/g, "í")
            .replace(/Ã³/g, "ó")
            .replace(/Ã´/g, "ô")
            .replace(/Ãº/g, "ú")
            .replace(/Ãµ/g, "õ")
            .replace(/Ã‰/g, "É")
            .replace(/Ã/g, "à");
    }

    function normalizePlanName(name) {
        const raw = cleanText(name || "");
        return raw.charAt(0) + raw.slice(1).toLowerCase();
    }

    function normalizePlanDescription(name) {
        const key = normalizeText(name);
        if (key.includes("aprendiz")) return "Plano de entrada para iniciar a jornada na Open Minds.";
        if (key.includes("inovador")) return "Plano premium com mais recursos e acesso amplo aos conteudos.";
        if (key.includes("expert")) return "Plano mais avancado com mentoria e apoio de carreira.";
        return "Plano da Open Minds.";
    }

    function safePeriod(period) {
        return cleanText(period || "").replace(/\s+/g, "");
    }

    function unique(array) {
        return [...new Set(array)];
    }

    function getKnowledge() {
        const plans = window.subscriptionData?.planosDisponiveis?.map((plan) => ({
            id: plan.id,
            name: `Plano ${normalizePlanName(plan.nome)}`,
            rawName: plan.nome,
            price: `${plan.preco}${safePeriod(plan.periodo)}`,
            description: normalizePlanDescription(plan.nome),
            duration: cleanText(plan.duracao),
            benefits: plan.beneficios.map(cleanText)
        })) || FALLBACK_KNOWLEDGE.products.filter((item) => item.id !== "student_area");

        const courses = window.courseData?.map((course) => ({
            id: course.id,
            title: cleanText(course.title),
            area: cleanText(course.area),
            level: cleanText(course.level),
            duration: cleanText(course.duration),
            students: cleanText(course.students),
            description: cleanText(course.description),
            lessons: (course.lessons || []).map(cleanText)
        })) || [];

        const activeSubscription = window.subscriptionData?.minhaAssinatura
            ? {
                plan: cleanText(window.subscriptionData.minhaAssinatura.plano),
                status: cleanText(window.subscriptionData.minhaAssinatura.status),
                value: cleanText(window.subscriptionData.minhaAssinatura.valor),
                renewal: cleanText(window.subscriptionData.minhaAssinatura.proximaCobranca),
                access: cleanText(window.subscriptionData.minhaAssinatura.acesso),
                progress: cleanText(window.subscriptionData.minhaAssinatura.progresso),
                support: cleanText(window.subscriptionData.minhaAssinatura.suporte)
            }
            : null;

        return {
            identity: FALLBACK_KNOWLEDGE.identity,
            products: [
                ...plans,
                {
                    id: "student_area",
                    name: "Area do aluno",
                    rawName: "Area do aluno",
                    price: "Inclusa para assinantes",
                    description: "Plataforma privada para assistir cursos, ver assinatura e acessar aulas.",
                    duration: "Acesso enquanto a assinatura estiver ativa",
                    benefits: ["Biblioteca de cursos", "Pagina de aulas", "Painel de assinatura", "Experiencia separada do site institucional"]
                }
            ],
            courses,
            activeSubscription,
            rules: FALLBACK_KNOWLEDGE.rules
        };
    }

    function detectIntent(message) {
        const normalized = normalizeText(message);
        if (!normalized) return "unknown";
        if (/(oi|ola|bom dia|boa tarde|boa noite)/.test(normalized)) return "greeting";
        if (/(quais|lista|mostrar|me fale).*(planos|plano)|tem plano/.test(normalized)) return "plans_list";
        if (/(preco|precos|valor|quanto custa|mensalidade)/.test(normalized)) return "price";
        if (/(beneficio|beneficios|vantagem|vantagens|inclui|incluido|inclui o que)/.test(normalized)) return "benefits";
        if (/(compar|diferenca|diferenca entre|qual melhor)/.test(normalized)) return "compare";
        if (/(curso|cursos|catalogo|biblioteca|trilha)/.test(normalized)) return "courses";
        if (/(area do aluno|plataforma|aulas|assistir)/.test(normalized)) return "student_area";
        if (/(minha assinatura|plano ativo|renovacao|cobranca)/.test(normalized)) return "active_subscription";
        return "generic_open_minds";
    }

    function findPlan(message, knowledge) {
        const normalized = normalizeText(message);
        return knowledge.products.find((product) => {
            const aliases = unique([
                normalizeText(product.name),
                normalizeText(product.rawName),
                normalizeText((product.name || "").replace("Plano ", "")),
                normalizeText(product.id)
            ].filter(Boolean));
            return aliases.some((alias) => alias && normalized.includes(alias));
        }) || null;
    }

    function findCourse(message, knowledge) {
        const normalized = normalizeText(message);
        let bestCourse = null;
        let bestScore = 0;

        knowledge.courses.forEach((course) => {
            if (normalized.includes(normalizeText(course.title))) {
                bestCourse = course;
                bestScore = 999;
                return;
            }

            const tokens = unique(normalizeText(course.title).split(/\s+/).filter((token) => token.length > 3));
            const score = tokens.reduce((sum, token) => sum + (normalized.includes(token) ? 1 : 0), 0);
            if (score > bestScore) {
                bestCourse = course;
                bestScore = score;
            }
        });

        return bestScore >= 2 ? bestCourse : null;
    }

    function isOpenMindsQuestion(message, knowledge) {
        const normalized = normalizeText(message);
        const keywords = [
            "open minds", "plano", "assinatura", "curso", "aula", "nexi", "aprendiz", "inovador",
            "expert", "beneficio", "preco", "valor", "mensalidade", "mentoria", "catalogo",
            "area do aluno", "biblioteca", "trilha", "renovacao", "assinante"
        ];

        return keywords.some((keyword) => normalized.includes(keyword)) ||
            knowledge.products.some((product) => normalized.includes(normalizeText(product.name))) ||
            knowledge.courses.some((course) => normalized.includes(normalizeText(course.title)));
    }

    function formatPlanSummary(plan) {
        return `${plan.name}: ${plan.price}. ${plan.description}`;
    }

    function buildRetrievedContext(question, knowledge) {
        const plan = findPlan(question, knowledge);
        const course = findCourse(question, knowledge);
        const lines = [
            "Voce e Nexi, assistente oficial da Open Minds.",
            "Responda em portugues do Brasil, de forma simples, direta e curta.",
            "Use apenas o contexto abaixo."
        ];

        if (plan) {
            lines.push(`Plano encontrado: ${plan.name}. Preco: ${plan.price}. Duracao: ${plan.duration}. Beneficios: ${plan.benefits.join(", ")}.`);
        }
        if (course) {
            lines.push(`Curso encontrado: ${course.title}. Area: ${course.area}. Nivel: ${course.level}. Duracao: ${course.duration}. Descricao: ${course.description}.`);
        }
        if (knowledge.activeSubscription) {
            const sub = knowledge.activeSubscription;
            lines.push(`Assinatura ativa: plano ${sub.plan}, status ${sub.status}, valor ${sub.value}, proxima cobranca ${sub.renewal}.`);
        }

        lines.push(`Pergunta: ${question}`);
        lines.push("Resposta:");
        return lines.join("\n");
    }

    function answerFromRules(question, knowledge) {
        const intent = detectIntent(question);
        const plan = findPlan(question, knowledge);
        const course = findCourse(question, knowledge);
        const active = knowledge.activeSubscription;

        if (intent === "greeting") {
            return "Oi! Eu sou a Nexi. Posso te ajudar com planos, cursos, assinatura e a area do aluno da Open Minds.";
        }
        if (intent === "plans_list") {
            const plans = knowledge.products.filter((item) => item.id !== "student_area").map(formatPlanSummary);
            return `Hoje a Open Minds tem ${plans.join(" ")} Se quiser, eu posso comparar os planos para voce.`;
        }
        if ((intent === "price" || intent === "benefits") && plan) {
            if (intent === "price") {
                return `${plan.name} custa ${plan.price} e oferece ${plan.duration}. Se quiser, eu tambem posso te mostrar os beneficios principais.`;
            }
            return `${plan.name} inclui ${plan.benefits.slice(0, 4).join(", ")}. Se quiser, eu tambem posso te dizer o preco desse plano.`;
        }
        if (intent === "compare") {
            const plans = knowledge.products.filter((item) => item.id !== "student_area");
            const summary = plans.map((item) => `${normalizePlanName(item.rawName || item.name)}: ${item.price}`).join(" | ");
            return `Resumo rapido: ${summary}. Aprendiz e mais basico, Inovador e o mais equilibrado, e Expert e o mais completo.`;
        }
        if (intent === "courses" && course) {
            return `${course.title} e um curso de ${course.area}, nivel ${course.level}, com ${course.duration}. ${course.description}`;
        }
        if (intent === "courses") {
            const examples = knowledge.courses.slice(0, 4).map((item) => item.title).join(", ");
            return `A Open Minds tem cursos como ${examples}. Se quiser, me diga qual curso voce quer conhecer melhor.`;
        }
        if (intent === "student_area") {
            return "A area do aluno e a plataforma privada da Open Minds para assistir cursos, acessar aulas e acompanhar a assinatura. Ela fica disponivel para assinantes.";
        }
        if (intent === "active_subscription" && active) {
            return `Seu plano ativo esta como ${active.plan}, status ${active.status}, com valor de ${active.value} e proxima cobranca em ${active.renewal}.`;
        }
        if (course) {
            return `${course.title} e um curso de ${course.area}, nivel ${course.level}, com ${course.duration}. Se quiser, eu posso resumir as aulas dessa trilha.`;
        }
        if (plan) {
            return `${formatPlanSummary(plan)} Os beneficios principais sao ${plan.benefits.slice(0, 3).join(", ")}.`;
        }
        return null;
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
                    <button class="nexi-close" type="button" aria-label="Fechar">x</button>
                </div>
                <div class="nexi-messages"></div>
                <div class="nexi-footer">
                    <div class="nexi-status-row">
                        <span class="nexi-dot"></span>
                        <span class="nexi-status">Base local pronta. Modelo ainda nao carregado.</span>
                    </div>
                    <div class="nexi-questions"></div>
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

    function appendTypingMessage(messagesEl) {
        const item = document.createElement("div");
        item.className = "nexi-message assistant typing";
        item.innerHTML = `
            <span class="nexi-typing-dot"></span>
            <span class="nexi-typing-dot"></span>
            <span class="nexi-typing-dot"></span>
        `;
        messagesEl.appendChild(item);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return item;
    }

    function renderQuestionButtons(root) {
        const container = root.querySelector(".nexi-questions");
        container.innerHTML = PRESET_QUESTIONS.map((question) => `
            <button class="nexi-question-btn" type="button" data-question="${question}">
                ${question}
            </button>
        `).join("");
    }

    function setQuestionsDisabled(root, disabled) {
        root.querySelectorAll(".nexi-question-btn").forEach((button) => {
            button.disabled = disabled;
        });
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
            setStatus(root, "ready", "Modelo de apoio pronto.");
            return generator;
        }

        if (!generatorPromise) {
            generatorPromise = (async () => {
                setStatus(root, "loading", "Carregando modelo de apoio no navegador...");
                const { pipeline, env } = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1");
                env.allowLocalModels = false;
                return pipeline("text2text-generation", "Xenova/flan-t5-small");
            })();
        }

        generator = await generatorPromise;
        setStatus(root, "ready", "Modelo de apoio pronto.");
        return generator;
    }

    async function answerWithModel(root, question, knowledge) {
        const model = await ensureGenerator(root);
        const prompt = buildRetrievedContext(question, knowledge);
        const result = await model(prompt, {
            max_new_tokens: 70,
            temperature: 0.1,
            repetition_penalty: 1.15
        });
        return (result?.[0]?.generated_text || "").trim();
    }

    async function askNexi(root, question) {
        const messagesEl = root.querySelector(".nexi-messages");
        const knowledge = getKnowledge();
        appendMessage(messagesEl, "user", question);
        setQuestionsDisabled(root, true);
        const typingMessage = appendTypingMessage(messagesEl);

        if (!isOpenMindsQuestion(question, knowledge)) {
            typingMessage.remove();
            appendMessage(messagesEl, "assistant", knowledge.rules.focusMessage);
            setQuestionsDisabled(root, false);
            return;
        }

        const rulesAnswer = answerFromRules(question, knowledge);
        if (rulesAnswer) {
            setTimeout(() => {
                typingMessage.remove();
                appendMessage(messagesEl, "assistant", rulesAnswer);
                setStatus(root, "ready", "Resposta guiada pela base local.");
                setQuestionsDisabled(root, false);
            }, 3000);
            return;
        }

        try {
            setStatus(root, "loading", "Nexi esta montando a resposta...");
            const answer = await answerWithModel(root, question, knowledge);
            typingMessage.remove();
            appendMessage(messagesEl, "assistant", answer || knowledge.rules.focusMessage);
            setStatus(root, "ready", "Modelo de apoio pronto.");
        } catch (error) {
            console.error("Erro ao responder com a Nexi:", error);
            setStatus(root, "", "Nao foi possivel usar o modelo agora.");
            typingMessage.remove();
            appendMessage(messagesEl, "assistant", "Consigo te ajudar melhor com perguntas diretas sobre planos, cursos, assinatura ou area do aluno da Open Minds.");
        }
        setQuestionsDisabled(root, false);
    }

    function bindWidget(root) {
        const panel = root.querySelector(".nexi-panel");
        const launcher = root.querySelector(".nexi-launcher");
        const closeBtn = root.querySelector(".nexi-close");
        const messagesEl = root.querySelector(".nexi-messages");

        appendMessage(messagesEl, "assistant", "Oi! Eu sou a Nexi. Posso responder sobre planos, cursos, assinatura e a area do aluno da Open Minds.");
        appendMessage(messagesEl, "assistant", "Escolha uma das perguntas abaixo para eu te ajudar mais rapido.");
        renderQuestionButtons(root);

        launcher.addEventListener("click", () => {
            panel.hidden = !panel.hidden;
            if (!panel.hidden) {
                setStatus(root, "ready", "Base local pronta para responder.");
            }
        });

        closeBtn.addEventListener("click", () => {
            panel.hidden = true;
        });

        root.querySelector(".nexi-questions").addEventListener("click", async (event) => {
            const button = event.target.closest(".nexi-question-btn");
            if (!button) return;
            await askNexi(root, button.dataset.question);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createWidget);
    } else {
        createWidget();
    }
})();
