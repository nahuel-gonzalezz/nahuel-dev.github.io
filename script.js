// ===== se me jijean los jijolines =====
window.addEventListener('load', function() {
    const loader = document.getElementById('loaderScreen');
    const mainContent = document.getElementById('mainContent');
    
    setTimeout(() => {
        loader.classList.add('slide-down');
        mainContent.classList.add('loaded');
        
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
        }, 800);
    }, 1500);
});

document.body.classList.add('loading');

// ===== MENÚ  =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function openMenu() {
        navMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    closeMenu();
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
        });
    });
});

// ===== SCROLL ANIMADO PARA LINKS DEL FOOTER =====
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-nav-menu .nav-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ===== SCROLL INFINITO DE TELÉFONOS =====
document.addEventListener('DOMContentLoaded', function() {
    const group1 = document.getElementById('group1');
    const group2 = document.getElementById('group2');
    
    if (group1 && group2) {
        let scrollPos1 = 0;
        let scrollPos2 = 0;
        let animationId;
        
        function scrollGroups() {
            scrollPos1 -= 1;
            scrollPos2 += 1;
            
            const group1Height = group1.scrollHeight;
            const group2Height = group2.scrollHeight;
            const containerHeight = group1.parentElement.clientHeight;
            
            if (Math.abs(scrollPos1) >= group1Height - containerHeight) {
                scrollPos1 = 0;
            }
            if (scrollPos2 >= group2Height - containerHeight) {
                scrollPos2 = 0;
            }
            
            group1.style.transform = `translateY(${scrollPos1}px)`;
            group2.style.transform = `translateY(${scrollPos2}px)`;
            
            animationId = requestAnimationFrame(scrollGroups);
        }
        
        scrollGroups();
        
        const column1 = group1.parentElement;
        const column2 = group2.parentElement;
        
        column1.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
        column2.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
        column1.addEventListener('mouseleave', () => { animationId = requestAnimationFrame(scrollGroups); });
        column2.addEventListener('mouseleave', () => { animationId = requestAnimationFrame(scrollGroups); });
    }
});

// ===== BOTONES INFO SOBRE MÍ =====
document.addEventListener('DOMContentLoaded', function() {
    const texts = {
        quien: "<strong>¿Quién soy?</strong><br>Soy Nahuel, desarrollador web apasionado por crear soluciones digitales que realmente funcionen. Me especializo en sitios personalizados que ayudan a negocios a crecer en el mundo digital.",
        como: "<strong>¿Cómo trabajo?</strong><br>Trabajo de cerca con mis clientes, entendiendo sus necesidades y objetivos. Cada proyecto es único y recibe atención personalizada desde el primer contacto hasta la entrega final.",
        que: "<strong>¿Qué hago?</strong><br>Desarrollo sitios web modernos, rápidos y adaptados a cualquier dispositivo. Desde páginas institucionales hasta tiendas online completas con carrito de compras.",
        enfoque: "<strong>Mi enfoque</strong><br>Me enfoco en resultados reales. Cada línea de código está pensada para que tu negocio tenga una presencia digital efectiva que genere conversiones.",
        objetivo: "<strong>Mi objetivo</strong><br>Que tu negocio tenga una web profesional que trabaje para vos las 24 horas, ayudándote a captar más clientes y vender más."
    };
    
    const buttons = document.querySelectorAll('.info-bubble');
    const panel = document.getElementById('text-display-panel');
    const displayText = document.getElementById('display-text');
    const closePanelBtn = document.getElementById('close-panel');
    
    let currentActiveButton = null;
    
    function closePanel() {
        if (panel) {
            panel.classList.remove('active');
            if (currentActiveButton) {
                currentActiveButton.classList.remove('active');
                currentActiveButton = null;
            }
        }
    }
    
    function showText(key, button) {
        if (panel && displayText && texts[key]) {
            if (currentActiveButton === button && panel.classList.contains('active')) {
                closePanel();
                return;
            }
            
            displayText.innerHTML = texts[key];
            
            const buttonRect = button.getBoundingClientRect();
            const panelWidth = 320;
            
            let top = buttonRect.bottom + window.scrollY + 10;
            let left = buttonRect.left + window.scrollX;
            
            if (left + panelWidth > window.innerWidth) {
                left = window.innerWidth - panelWidth - 20;
            }
            if (left < 20) {
                left = 20;
            }
            
            panel.style.position = 'fixed';
            panel.style.top = `${buttonRect.bottom + 10}px`;
            panel.style.left = `${left}px`;
            panel.style.maxWidth = `${panelWidth}px`;
            
            if (currentActiveButton) {
                currentActiveButton.classList.remove('active');
            }
            
            button.classList.add('active');
            currentActiveButton = button;
            panel.classList.add('active');
        }
    }
    
    if (buttons.length && panel && closePanelBtn) {
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = button.getAttribute('data-key');
                if (key) showText(key, button);
            });
        });
        
        closePanelBtn.addEventListener('click', closePanel);
        
        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && !Array.from(buttons).some(btn => btn.contains(e.target))) {
                closePanel();
            }
        });
        
        window.addEventListener('resize', () => {
            if (panel.classList.contains('active') && currentActiveButton) {
                const key = currentActiveButton.getAttribute('data-key');
                if (key) showText(key, currentActiveButton);
            }
        });
    }
});

// ===== MODAL SERVICIOS =====
document.addEventListener('DOMContentLoaded', function() {
    const plusCard = document.querySelector('.plus-card');
    const modal = document.getElementById('servicesModal');
    const closeModal = modal ? modal.querySelector('.close-btn') : null;
    
    if (plusCard && modal && closeModal) {
        plusCard.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});

// ===== MODAL PROYECTOS =====
document.addEventListener('DOMContentLoaded', function() {
    const proyectosData = [
        {
            nombre: "E-commerce Fashion",
            descripcion: "Tienda online completa con carrito de compras, pasarela de pagos y panel de administración.",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
            imagen: "imagenes/p1.jpg",
            linkDemo: "#",
            linkRepo: "#"
        },
        {
            nombre: "Landing Page Restaurant",
            descripcion: "Landing page moderna con sistema de reservas online y menú interactivo.",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "PHP"],
            imagen: "imagenes/p2.jpg",
            linkDemo: "#",
            linkRepo: "#"
        },
        {
            nombre: "Dashboard Analytics",
            descripcion: "Panel de control con gráficos interactivos y estadísticas en tiempo real.",
            tecnologias: ["JavaScript", "Chart.js", "CSS3", "JSON"],
            imagen: "imagenes/p3.jpg",
            linkDemo: "#",
            linkRepo: "#"
        }
    ];
    
    const folderPlus = document.querySelector('.folder-plus');
    const modalProyectos = document.getElementById('proyectosModal');
    const modalBody = document.getElementById('proyectosModalBody');
    const closeModalProyectos = modalProyectos ? modalProyectos.querySelector('.close-btn') : null;
    
    function cargarProyectos() {
        if (!modalBody) return;
        
        modalBody.innerHTML = '';
        
        proyectosData.forEach(proyecto => {
            const proyectoItem = document.createElement('div');
            proyectoItem.className = 'proyecto-item';
            
            proyectoItem.innerHTML = `
                <div class="proyecto-imagen">
                    <img src="${proyecto.imagen}" alt="${proyecto.nombre}">
                </div>
                <div class="proyecto-info">
                    <h3>${proyecto.nombre}</h3>
                    <p>${proyecto.descripcion}</p>
                    <div class="proyecto-tecnologias">
                        ${proyecto.tecnologias.map(tech => `<span class="tecnologia-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="proyecto-links">
                        <a href="${proyecto.linkDemo}" target="_blank"><i class="fas fa-external-link-alt"></i> Ver Demo</a>
                        <a href="${proyecto.linkRepo}" target="_blank"><i class="fab fa-github"></i> Código</a>
                    </div>
                </div>
            `;
            
            modalBody.appendChild(proyectoItem);
        });
    }
    
    if (folderPlus && modalProyectos && closeModalProyectos) {
        folderPlus.addEventListener('click', () => {
            cargarProyectos();
            modalProyectos.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeModalProyectos.addEventListener('click', () => {
            modalProyectos.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modalProyectos) {
                modalProyectos.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    const folderItems = document.querySelectorAll('.folder:not(.folder-plus)');
    folderItems.forEach((folder, index) => {
        const projectName = folder.querySelector('.project-name');
        const btnVer = folder.querySelector('.btn-ver');
        
        if (proyectosData[index]) {
            if (projectName) projectName.textContent = proyectosData[index].nombre;
            if (btnVer) {
                btnVer.addEventListener('click', () => {
                    cargarProyectos();
                    if (modalProyectos) {
                        modalProyectos.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
            folder.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-ver')) {
                    cargarProyectos();
                    if (modalProyectos) {
                        modalProyectos.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
        }
    });
});

// ===== FAQ ACORDEÓN =====
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// ===== EMAILJS CONFIGURACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    }
    
    const contactForm = document.querySelector('.ng-contact-card-box form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.ng-contact-submit-trigger');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('¡Mensaje enviado con éxito! Te responderé a la brevedad.');
                contactForm.reset();
            }, 1500);
        });
    }
});

// ===== CARRUSEL MÓVIL - CORREGIDO CON ALTURA ADECUADA =====
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (carouselTrack && prevBtn && nextBtn) {
        const slides = Array.from(carouselTrack.children);
        const slidesCount = slides.length;
        let currentIndex = 0;
        let autoPlayInterval;
        let isDragging = false;
        let startPosX = 0;
        let currentTranslate = 0;
        
        function updateCarousel() {
            const slideWidth = carouselTrack.parentElement.clientWidth;
            const newPosition = -currentIndex * slideWidth;
            carouselTrack.style.transform = `translateX(${newPosition}px)`;
            updateDots();
        }
        
        function updateDots() {
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        function goToSlide(index) {
            if (index < 0) {
                currentIndex = slidesCount - 1;
            } else if (index >= slidesCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            updateCarousel();
            resetAutoPlay();
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        }
        
        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
        
        function createDots() {
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < slidesCount; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === currentIndex) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        goToSlide(i);
                    });
                    dotsContainer.appendChild(dot);
                }
            }
        }
        
        function handleDragStart(e) {
            isDragging = true;
            startPosX = e.type === 'mousedown' ? e.pageX : e.touches[0].clientX;
            const transform = carouselTrack.style.transform;
            const match = transform.match(/translateX\(([-\d.]+)px\)/);
            currentTranslate = match ? parseFloat(match[1]) : 0;
            carouselTrack.style.transition = 'none';
            clearInterval(autoPlayInterval);
        }
        
        function handleDragMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            const currentPosX = e.type === 'mousemove' ? e.pageX : e.touches[0].clientX;
            const diff = currentPosX - startPosX;
            const slideWidth = carouselTrack.parentElement.clientWidth;
            let newTranslate = currentTranslate + diff;
            
            const maxTranslate = 0;
            const minTranslate = -(slidesCount - 1) * slideWidth;
            
            if (newTranslate > maxTranslate) {
                newTranslate = maxTranslate - (newTranslate - maxTranslate) / 4;
            }
            if (newTranslate < minTranslate) {
                newTranslate = minTranslate - (newTranslate - minTranslate) / 4;
            }
            
            carouselTrack.style.transform = `translateX(${newTranslate}px)`;
        }
        
        function handleDragEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            carouselTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const slideWidth = carouselTrack.parentElement.clientWidth;
            const transform = carouselTrack.style.transform;
            const match = transform.match(/translateX\(([-\d.]+)px\)/);
            const currentTransform = match ? parseFloat(match[1]) : 0;
            const movedSlides = Math.round(currentTransform / slideWidth);
            let newIndex = -movedSlides;
            
            if (newIndex < 0) newIndex = 0;
            if (newIndex >= slidesCount) newIndex = slidesCount - 1;
            
            currentIndex = newIndex;
            updateCarousel();
            startAutoPlay();
        }
        
        window.addEventListener('resize', () => {
            updateCarousel();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
        
        carouselTrack.addEventListener('mousedown', handleDragStart);
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        
        carouselTrack.addEventListener('touchstart', handleDragStart);
        window.addEventListener('touchmove', handleDragMove);
        window.addEventListener('touchend', handleDragEnd);
        
        createDots();
        updateCarousel();
        startAutoPlay();
        
        const carouselContainer = carouselTrack.parentElement;
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
});

// ===== SCROLL SUAVE PARA TODOS LOS ENLACES =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        if (targetId && targetId !== '') {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
