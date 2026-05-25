document.addEventListener('DOMContentLoaded', () => {
    const socialTargets = {
        Facebook: 'https://www.facebook.com/',
        Twitter: 'https://x.com/',
        Instagram: 'https://www.instagram.com/',
        WhatsApp: 'https://web.whatsapp.com/',
        YouTube: 'https://www.youtube.com/',
        TikTok: 'https://www.tiktok.com/'
    };

    const pageTargets = {
        'Sobre Nós': 'sobre.html',
        'Carreiras': 'carreiras.html',
        'Imprensa': 'em-breve.html',
        'Blog': 'blog.html',
        'Parceiros': 'em-breve.html',
        'Cursos Tech': 'cursos.html',
        'Mentorias': 'em-breve.html',
        'Certificados': 'em-breve.html',
        'Marketplace': 'em-breve.html',
        'Nexi IA': 'em-breve.html',
        'E-books': 'em-breve.html',
        'Webinars': 'em-breve.html',
        'Eventos': 'em-breve.html',
        'Podcasts Tech': 'em-breve.html',
        'Artigos': 'em-breve.html',
        'Suporte': 'contato.html',
        'WhatsApp': 'contato.html',
        'Central de Ajuda': 'contato.html',
        'Vendas': 'contato.html',
        'Ouvidoria': 'contato.html',
        'All Posts': '#blog-root',
        'EXPLORAR TRILHAS': 'cursos.html',
        'Começar agora': 'planos.html'
    };

    document.querySelectorAll('a[href="#"]').forEach((link) => {
        const imgAlt = link.querySelector('img')?.getAttribute('alt')?.trim();

        if (imgAlt && socialTargets[imgAlt]) {
            link.href = socialTargets[imgAlt];
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            return;
        }

        const text = link.textContent.trim();
        const target = pageTargets[text];

        if (target) {
            link.href = target;
        }
    });
});
