document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Funcionalidades de Botões Específicos
    const viewProjectsBtn = document.getElementById('view-projects-btn');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', () => {
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const contactMeBtn = document.getElementById('contact-me-btn');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const scrollDownBtn = document.getElementById('scroll-down-btn');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Botão de Email na Navbar
    const mailBtn = document.querySelector('.nav-btn');
    if (mailBtn) {
        mailBtn.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // 2.1 Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if (menuToggle) menuToggle.querySelector('span').textContent = 'close';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
        if (menuToggle) menuToggle.querySelector('span').textContent = 'menu';
    }
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                openMobileMenu();
            } else {
                closeMobileMenu();
            }
        });
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }
    
    // Fechar menu ao clicar fora
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
    
    // Fechar menu ao clicar em um link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // 3. Animação de Entrada (Fade-in) ao rolar a página
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Highlight do link ativo na navbar ao rolar (Scroll Spy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav .hidden a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Efeito 3D (Tilt) nos cards de Projetos
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });

        // Clique simulado
        card.addEventListener('click', () => {
            if (card.tagName.toLowerCase() === 'a') return; // Se já é um link, não mostra o alert
            if (card.classList.contains('project-card-modal')) return; // Modal cuida do próprio clique
            const projectName = card.querySelector('h3').innerText;
            alert(`Acessando o projeto: ${projectName}! Em uma versão final, isso abriria o link do projeto.`);
        });
        card.style.cursor = 'pointer';
    });

    // 6. Efeito de Digitação Contínua no Fundo (Typewriter Effect)
    const codeCols = document.querySelectorAll('.code-bg .code-col');
    if (codeCols.length > 0) {
        const baseCode = `function processDataStream(buffer) {
  let offset = 0;
  const metrics = { throughput: 0, latency: 0 };
  
  while (offset < buffer.length) {
    const chunk = buffer.slice(offset, offset + 1024);
    if (validateChecksum(chunk)) {
      metrics.throughput += chunk.length;
      dispatch(chunk);
    } else {
      console.warn('Data corruption detected at offset: ', offset);
      recoverStream(buffer, offset);
    }
    offset += 1024;
  }
  
  return metrics;
}

class QuantumRouter {
  constructor(config = {}) {
    this.nodes = new Map();
    this.maxConnections = config.maxConnections || 1000;
  }

  async routePacket(packet, destination) {
    if (!this.nodes.has(destination)) {
      throw new Error('Destination unreachable.');
    }
    
    const route = this.calculateOptimalPath(packet.origin, destination);
    for (let hop of route) {
      await hop.transmit(packet);
      console.log(\`Packet passing through node \${hop.id}...\`);
    }
    
    return { status: 'DELIVERED', timestamp: Date.now() };
  }

  calculateOptimalPath(src, dest) {
    // Implementing A* algorithm optimized for low latency
    return []; // Route nodes simulated
  }
}

export const initSystemServices = async () => {
  console.log("Bootstrapping kernel modules...");
  const router = new QuantumRouter();
  const rawData = new Uint8Array(8192).fill(Math.random() * 255);
  
  const results = processDataStream(rawData);
  console.log('System telemetry:', results);
};
`;
        codeCols.forEach((col, index) => {
            col.textContent = '';
            // Cada coluna começa em um ponto diferente do texto, para não serem idênticas
            let i = index * Math.floor(baseCode.length / 3);
            
            // Cada coluna digita em uma velocidade base ligeiramente diferente
            const baseSpeed = Math.random() * 20 + 5; 
            
            function typePulse() {
                col.textContent += baseCode.charAt(i);
                i++;
                
                if (i >= baseCode.length) {
                    col.textContent += '\n\n';
                    i = 0;
                }
                
                // Mantém sempre scrollado para baixo
                col.scrollTop = col.scrollHeight;
                
                // Varia a velocidade a cada frame ligeiramente, em torno da velocidade base da coluna
                setTimeout(typePulse, baseSpeed + Math.random() * 15);
            }
            
            // Delay inicial diferente para cada coluna (0s a 1.5s) para completa assincronia
            setTimeout(typePulse, Math.random() * 1500);
        });
    }

    // 7. Projetos expansíveis (4 visíveis por padrão)
    const projectsExpandBtn = document.getElementById('projects-expand-btn');
    const extraProjects = document.querySelectorAll('.project-extra');
    let projectsExpanded = false;

    if (projectsExpandBtn) {
        if (extraProjects.length === 0) {
            projectsExpandBtn.classList.add('hidden');
        } else {
            projectsExpandBtn.addEventListener('click', () => {
                projectsExpanded = !projectsExpanded;

                extraProjects.forEach(card => {
                    if (projectsExpanded) {
                        card.classList.remove('hidden');
                        requestAnimationFrame(() => {
                            card.classList.add('is-visible');
                        });
                        return;
                    }

                    card.classList.remove('is-visible');
                    setTimeout(() => {
                        if (!projectsExpanded) {
                            card.classList.add('hidden');
                        }
                    }, 280);
                });

                projectsExpandBtn.classList.toggle('is-expanded', projectsExpanded);
                projectsExpandBtn.setAttribute('aria-expanded', String(projectsExpanded));
                projectsExpandBtn.innerHTML = projectsExpanded
                    ? 'Ver menos projetos <span class="material-symbols-outlined">expand_less</span>'
                    : 'Ver mais projetos <span class="material-symbols-outlined">expand_more</span>';
            });
        }
    }

    // 8. Modal universal de projetos
    const projectModal = document.getElementById('project-modal');
    const modalBackdrop = document.querySelector('.project-modal-backdrop');
    const modalClose = document.getElementById('project-modal-close');
    const modalGithub = document.getElementById('project-modal-github');
    const modalWeb = document.getElementById('project-modal-web');
    const modalName = document.getElementById('project-modal-name');
    const modalDescription = document.getElementById('project-modal-description');
    const modalGallery = document.getElementById('project-modal-gallery');
    const modalPlayable = document.getElementById('project-modal-playable');
    const modalPlayableIframe = document.getElementById('project-modal-playable-iframe');
    const playableIdle = document.getElementById('project-playable-idle');
    const playableStartBtn = document.getElementById('project-playable-start');
    const playableStopBtn = document.getElementById('project-playable-stop');
    const playableOpenBtn = document.getElementById('project-playable-open');
    const modalCards = document.querySelectorAll('.project-card-modal');
    let currentPlayableUrl = '';
    let currentProjectWebUrl = '';

    function setGithubButton(githubLink, isPrivateRepo) {
        if (!modalGithub) return;

        if (isPrivateRepo === 'true') {
            modalGithub.href = '#';
            modalGithub.classList.add('is-disabled');
            modalGithub.innerHTML = `
                <svg class="modal-github-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Repositório Privado
            `;
            return;
        }

        if (githubLink) {
            modalGithub.href = githubLink;
            modalGithub.classList.remove('is-disabled');
            modalGithub.innerHTML = `
                <svg class="modal-github-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Ver no GitHub
            `;
            return;
        }

        modalGithub.href = '#';
        modalGithub.classList.add('is-disabled');
        modalGithub.innerHTML = `
            <svg class="modal-github-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GitHub Indisponível
        `;
    }

    function setWebButton(webLink) {
        if (!modalWeb) return;

        const normalizedLink = (webLink || '').trim();
        if (normalizedLink) {
            const finalLink = /^https?:\/\//i.test(normalizedLink)
                ? normalizedLink
                : `https://${normalizedLink}`;
            currentProjectWebUrl = finalLink;
            modalWeb.href = finalLink;
            modalWeb.classList.remove('hidden');
        } else {
            currentProjectWebUrl = '';
            modalWeb.href = '#';
            modalWeb.classList.add('hidden');
        }
    }

    function renderGallery(imagesRaw, projectName) {
        if (!modalGallery) return;
        modalGallery.innerHTML = '';

        const images = (imagesRaw || '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

        if (images.length === 0) {
            modalGallery.innerHTML = '<p class="timeline-desc">Sem imagens disponíveis para este projeto.</p>';
            return;
        }

        images.forEach((imageSrc, index) => {
            const item = document.createElement('figure');
            item.className = 'project-modal-image-wrap';

            const img = document.createElement('img');
            img.className = 'project-modal-image';
            img.src = imageSrc;
            img.alt = `${projectName} - imagem ${index + 1}`;

            item.appendChild(img);
            modalGallery.appendChild(item);
        });
    }

    function setPlayableProject(playableUrl) {
        if (!modalPlayable || !modalPlayableIframe) return;

        if (playableUrl) {
            modalPlayable.classList.remove('hidden');
            currentPlayableUrl = playableUrl;
            modalPlayableIframe.src = '';
            modalPlayableIframe.classList.add('hidden');
            if (playableIdle) playableIdle.classList.remove('hidden');
            if (playableOpenBtn) playableOpenBtn.href = new URL(playableUrl, window.location.href).href;
            if (playableStartBtn) {
                playableStartBtn.classList.remove('hidden');
                playableStartBtn.classList.add('is-prominent');
            }
            if (playableStopBtn) playableStopBtn.classList.add('hidden');
        } else {
            modalPlayable.classList.add('hidden');
            modalPlayableIframe.src = '';
            modalPlayableIframe.classList.add('hidden');
            if (playableIdle) playableIdle.classList.add('hidden');
            currentPlayableUrl = '';
        }
    }

    function openProjectModal(card) {
        if (!projectModal) return;

        const projectName = card.dataset.projectName || 'Projeto';
        const projectDescription = card.dataset.projectDescription || 'Sem descrição disponível.';
        const projectGithub = card.dataset.projectGithub || '';
        const projectWeb = card.dataset.projectWeb || '';
        const projectImages = card.dataset.projectImages || '';
        const isPrivateRepo = card.dataset.projectGithubPrivate || 'false';
        const projectPlayableUrl = card.dataset.projectPlayableUrl || '';

        if (modalName) modalName.textContent = projectName;
        if (modalDescription) modalDescription.textContent = projectDescription;

        setGithubButton(projectGithub, isPrivateRepo);
        setWebButton(projectWeb);
        setPlayableProject(projectPlayableUrl);
        renderGallery(projectImages, projectName);

        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function startPlayableProject() {
        if (!modalPlayableIframe || !currentPlayableUrl) return;
        modalPlayableIframe.src = currentPlayableUrl;
        modalPlayableIframe.classList.remove('hidden');
        if (playableIdle) playableIdle.classList.add('hidden');
        if (playableStartBtn) {
            playableStartBtn.classList.add('hidden');
            playableStartBtn.classList.remove('is-prominent');
        }
        if (playableStopBtn) playableStopBtn.classList.remove('hidden');
    }

    function stopPlayableProject() {
        if (!modalPlayableIframe) return;
        modalPlayableIframe.src = '';
        modalPlayableIframe.classList.add('hidden');
        if (playableIdle && currentPlayableUrl) playableIdle.classList.remove('hidden');
        if (playableStartBtn && currentPlayableUrl) {
            playableStartBtn.classList.remove('hidden');
            playableStartBtn.classList.add('is-prominent');
        }
        if (playableStopBtn) playableStopBtn.classList.add('hidden');
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.add('hidden');
        document.body.style.overflow = '';
        stopPlayableProject();
    }

    modalCards.forEach(card => {
        card.addEventListener('click', () => {
            openProjectModal(card);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
    if (playableStartBtn) playableStartBtn.addEventListener('click', startPlayableProject);
    if (playableStopBtn) playableStopBtn.addEventListener('click', stopPlayableProject);
    if (modalWeb) {
        modalWeb.addEventListener('click', (event) => {
            if (!currentProjectWebUrl) return;
            event.preventDefault();
            window.open(currentProjectWebUrl, '_blank', 'noopener,noreferrer');
        });
    }
    if (playableOpenBtn) {
        playableOpenBtn.addEventListener('click', (event) => {
            if (!currentPlayableUrl) return;
            event.preventDefault();
            window.open(new URL(currentPlayableUrl, window.location.href).href, '_blank', 'noopener,noreferrer');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });
});

