// UtilitÃ¡rio de AutenticaÃ§Ã£o Local (LocalStorage)
const AUTH_KEY = 'open_minds_user';
const USERS_KEY = 'open_minds_all_users';
const LOGOUT_KEY = 'open_minds_logged_out';
const FIREBASE_CONFIG = window.OPEN_MINDS_FIREBASE_CONFIG || null;

// FunÃ§Ã£o para criar um hash SHA-256 da senha
async function hashSenha(senha) {
    const msgUint8 = new TextEncoder().encode(senha);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function salvarUsuarioFirebase(firebaseUser) {
    const user = {
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        nome: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Aluno',
        email: firebaseUser.email || '',
        foto: firebaseUser.photoURL || '',
        provider: 'google'
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.removeItem(LOGOUT_KEY);
    return user;
}

function atualizarUsuarioLocal(dados) {
    const usuarioAtual = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');

    if (!usuarioAtual) {
        return null;
    }

    const usuarioAtualizado = {
        ...usuarioAtual,
        ...dados
    };
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const userIndex = users.findIndex((user) => user.id === usuarioAtual.id || user.email === usuarioAtual.email);

    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            nome: usuarioAtualizado.nome,
            email: usuarioAtualizado.email,
            foto: usuarioAtualizado.foto || ''
        };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(usuarioAtualizado));
    return usuarioAtualizado;
}

function getFirebaseAuth() {
    if (!window.firebase?.apps) return null;
    if (!FIREBASE_CONFIG) return null;

    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    return firebase.auth();
}

window.auth = {
    // Cadastrar novo usuÃ¡rio
    cadastrar: async (nome, email, senha) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Este e-mail jÃ¡ estÃ¡ cadastrado.' };
        }

        const senhaHash = await hashSenha(senha);
        const newUser = { id: Date.now(), nome, email, senha: senhaHash };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        
        // Logar automaticamente apÃ³s cadastro
        localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
        return { success: true };
    },

    // Fazer login
    login: async (email, senha) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const senhaHash = await hashSenha(senha);
        
        // Tenta encontrar pelo hash (novo padrÃ£o)
        let userIndex = users.findIndex(u => u.email === email && u.senha === senhaHash);
        
        // Se nÃ£o encontrou, tenta encontrar por texto puro (padrÃ£o antigo - migraÃ§Ã£o)
        if (userIndex === -1) {
            userIndex = users.findIndex(u => u.email === email && u.senha === senha);
            
            // Se encontrou por texto puro, migra para hash agora mesmo
            if (userIndex !== -1) {
                users[userIndex].senha = senhaHash;
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
                console.log('Senha migrada para hash com sucesso.');
            }
        }

        if (userIndex !== -1) {
            const user = users[userIndex];
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return { success: true };
        }
        return { success: false, message: 'E-mail ou senha incorretos.' };
    },

    loginComGoogle: async () => {
        const firebaseAuth = getFirebaseAuth();

        if (!firebaseAuth) {
            return { success: false, message: 'Firebase nao foi carregado nesta pagina.' };
        }

        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebaseAuth.signInWithPopup(provider);
            salvarUsuarioFirebase(result.user);
            return { success: true };
        } catch (error) {
            if (error?.code === 'auth/configuration-not-found') {
                return {
                    success: false,
                    message: 'Ative o login Google em Authentication > Sign-in method no Firebase.'
                };
            }

            return {
                success: false,
                message: error?.message || 'Nao foi possivel entrar com Google.'
            };
        }
    },


    // Sair (Logout)
    logout: () => {
        localStorage.setItem(LOGOUT_KEY, '1');
        const firebaseAuth = getFirebaseAuth();
        if (firebaseAuth) {
            firebaseAuth.signOut().catch(() => {});
        }

        localStorage.removeItem(AUTH_KEY);
        window.location.href = 'index.html';
    },

    // Obter usuÃ¡rio logado
    getUsuario: () => {
        return JSON.parse(localStorage.getItem(AUTH_KEY));
    },

    atualizarPerfil: (dados) => {
        return atualizarUsuarioLocal(dados);
    },

    // Verificar se estÃ¡ logado
    estaLogado: () => {
        return localStorage.getItem(AUTH_KEY) !== null;
    }
};

const firebaseAuth = getFirebaseAuth();
if (firebaseAuth) {
    firebaseAuth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser && localStorage.getItem(LOGOUT_KEY) !== '1') {
            salvarUsuarioFirebase(firebaseUser);
        }
    });
}


