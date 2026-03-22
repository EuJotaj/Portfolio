/* === Menu Mobile === */
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.onclick = () => {
    menuBtn.classList.toggle('fa-times'); // Troca ícone para 'X'
    navLinks.classList.toggle('active');
};

/* === Link Ativo na Scroll === */
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.onscroll = () => {
    // Fecha o menu se rolar
    menuBtn.classList.remove('fa-times');
    navLinks.classList.remove('active');

    // Lógica do Link Ativo
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLi.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.nav-links li a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

/* === Filtro de Projetos === */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove a classe active de todos os botões
        filterButtons.forEach(button => button.classList.remove('active'));
        // Adiciona a classe active no botão clicado
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Adiciona uma animação suave ao aparecer
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300); // Tempo igual à transição CSS
            }
        });
    });
});