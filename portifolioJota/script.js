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
    const navButtons = document.querySelectorAll('nav button');
    if (navButtons.length >= 1) {
        const mailBtn = navButtons[0];

        mailBtn.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

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
            const projectName = card.querySelector('h3').innerText;
            alert(`Acessando o projeto: ${projectName}! Em uma versão final, isso abriria o link do projeto.`);
        });
        card.style.cursor = 'pointer';
    });

    // 6. Efeito de Digitação Contínua no Fundo (Typewriter Effect)
    const codeBg = document.querySelector('.code-bg pre');
    if (codeBg) {
        const codeText = `function processDataStream(buffer) {
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
        
        codeBg.textContent = '';
        let i = 0;
        
        function typeCode() {
            codeBg.textContent += codeText.charAt(i);
            i++;
            
            if (i >= codeText.length) {
                codeBg.textContent += '\n\n';
                i = 0;
            }
            
            // Mantém sempre scrollado para baixo
            codeBg.scrollTop = codeBg.scrollHeight;
            
            // Velocidade pseudo-aleatória de digitação
            setTimeout(typeCode, Math.random() * 30 + 10);
        }
        
        typeCode();
    }
});
