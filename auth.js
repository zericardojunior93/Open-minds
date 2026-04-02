// Utilitário de Autenticação Local (LocalStorage)
const AUTH_KEY = 'open_minds_user';
const USERS_KEY = 'open_minds_all_users';

window.auth = {
    // Cadastrar novo usuário
    cadastrar: (nome, email, senha) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Este e-mail já está cadastrado.' };
        }

        const newUser = { id: Date.now(), nome, email, senha };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        
        // Logar automaticamente após cadastro
        localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
        return { success: true };
    },

    // Fazer login
    login: (email, senha) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.senha === senha);

        if (user) {
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return { success: true };
        }
        return { success: false, message: 'E-mail ou senha incorretos.' };
    },

    // Sair (Logout)
    logout: () => {
        localStorage.removeItem(AUTH_KEY);
        window.location.href = 'index.html';
    },

    // Obter usuário logado
    getUsuario: () => {
        return JSON.parse(localStorage.getItem(AUTH_KEY));
    },

    // Verificar se está logado
    estaLogado: () => {
        return localStorage.getItem(AUTH_KEY) !== null;
    }
};
