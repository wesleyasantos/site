const { createApp, ref, reactive, onMounted, computed } = Vue;

createApp({
    setup() {
        // Mobile menu state
        const isMobileMenuOpen = ref(false);
        
        // Hero slider
        const heroSlides = [
            { 
                title: "Garanticoop: Soluções Financeiras para o seu Negócio", 
                description: "Acesso facilitado ao crédito para micro e pequenas empresas através de garantias seguras e ágeis."
            },
            { 
                title: "Financiamento mais acessível", 
                description: "Obtenha taxas reduzidas e condições especiais para alavancar o crescimento da sua empresa."
            },
            { 
                title: "Menos burocracia, mais negócios", 
                description: "Processo simplificado e ágil para aprovação de suas garantias."
            }
        ];
        const currentHeroSlide = ref(0);
        let heroSlideInterval;
        
        // Partners
        const partners = reactive([
            { name: "COOPERATIVA AILOS", logo: "src/public/parceiros/AILOS.png" },
            { name: "BRDE", logo: "src/public/parceiros/BRDE.png" },
            { name: "CASA DO EMPREENDEDOR", logo: "src/public/parceiros/CASA EMP.png" },
            { name: "COOPESF", logo: "src/public/parceiros/COOPESF.png" },
            { name: "CRESOL", logo: "src/public/parceiros/CRESOL.png" },
            { name: "FOMENTO PARANÁ", logo: "src/public/parceiros/FOMENTO.png" },
            { name: "GOVERNO DO ESTADO DO PARANÁ", logo: "src/public/parceiros/GOVERNO.png" },
            { name: "RAPIDIUM", logo: "src/public/parceiros/RAPIDIUM.png" },
            { name: "SEBRAE", logo: "src/public/parceiros/SEBRAE.png" },
            { name: "SICOOB", logo: "src/public/parceiros/SICOOB.png" },
            { name: "SICREDI", logo: "src/public/parceiros/SICREDI.png" },
            { name: "UNICRED", logo: "src/public/parceiros/UNICRED.png" },
            { name: "UNIPRIME", logo: "src/public/parceiros/UNIPRIME.png" },
        ]);
        
        // Services
        const services = reactive([
            {
                title: "Garantia de Crédito",
                description: "Oferecemos garantias complementares que possibilitam o acesso ao crédito para sua empresa, facilitando a aprovação de financiamentos junto às instituições financeiras.",
                image: "src/public/img/garantia-de-credito.jpg",
                btnHover: false
            },
            {
                title: "Consultoria Financeira",
                description: "Nossa equipe especializada oferece orientação personalizada para identificar a melhor solução de crédito para o seu negócio, considerando seu perfil e necessidades.",
                image: "src/public/img/consult-financeira.png",
                btnHover: false
            },
            {
                title: "Capacitação Empresarial",
                description: "Promovemos cursos, workshops e eventos para capacitar empreendedores em gestão financeira, planejamento estratégico e outros temas relevantes para o sucesso do seu negócio.",
                image: "src/public/img/treina-empresarial.jpg",
                btnHover: false
            }
        ]);
        
        // Stats
        const stats = reactive([
            {
                icon: "fas fa-handshake",
                value: 18000,
                current: 0,
                label: "Empresas Atendidas"
            },
            {
                icon: "fas fa-money-bill-wave",
                value: 25000,
                current: 0,
                label: "Garantias Emitidas"
            },
            {
                icon: "fas fa-chart-line",
                value: 1,
                current: 0,
                label: "Bilhão em Crédito"
            },
            {
                icon: "fas fa-star",
                value: 98,
                current: 0,
                label: "% Satisfação"
            }
        ]);
        
        // Testimonials
        const testimonials = reactive([
            {
                text: "Graças à Garanticoop, conseguimos um financiamento para expandir nossa fábrica. O processo foi rápido e a equipe nos orientou em cada etapa. Hoje, aumentamos nossa produção em 40%.",
                name: "João Silva",
                company: "Fábrica de Móveis Silva",
                photo: "src/public/img/assoc-homem-1.jpg"
            },
            {
                text: "Como empreendedora iniciante, não tinha garantias suficientes para obter crédito. A Garanticoop foi fundamental para viabilizar meu sonho. Recomendo a todos os pequenos empresários.",
                name: "Maria Oliveira",
                company: "Confeitaria Doce Sabor",
                photo: "src/public/img/assoc-mulher-1.jpg"
            },
            {
                text: "Nossa empresa precisava renovar a frota de veículos e encontramos na Garanticoop o apoio necessário. Além da garantia, recebemos orientação sobre as melhores condições de financiamento disponíveis no mercado.",
                name: "Carlos Santos",
                company: "Distribuidora Santos",
                photo: "src/public/img/assoc-homem-2.jpg"
            }
        ]);
        const currentTestimonialSlide = ref(0);
        let testimonialSlideInterval;
        
        // Contact form - Formulário da página principal
        const contactForm = reactive({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            sending: false,
            status: '',
            message: ''
        });
        
        // Current year for footer
        const currentYear = computed(() => new Date().getFullYear());
        
        // Methods
        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
        };
        
        const closeMobileMenu = () => {
            isMobileMenuOpen.value = false;
        };
        
        const scrollToSection = (sectionId, closeMobile = false) => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                if (closeMobile && isMobileMenuOpen.value) {
                    closeMobileMenu();
                }
            }
        };
        
        const changeHeroSlide = (index) => {
            currentHeroSlide.value = index;
            resetHeroSlideInterval();
        };
        
        const nextHeroSlide = () => {
            currentHeroSlide.value = (currentHeroSlide.value + 1) % heroSlides.length;
        };
        
        const resetHeroSlideInterval = () => {
            clearInterval(heroSlideInterval);
            heroSlideInterval = setInterval(nextHeroSlide, 5000);
        };
        
        const changeTestimonialSlide = (index) => {
            currentTestimonialSlide.value = index;
            resetTestimonialSlideInterval();
        };
        
        const nextTestimonial = () => {
            currentTestimonialSlide.value = (currentTestimonialSlide.value + 1) % testimonials.length;
            resetTestimonialSlideInterval();
        };
        
        const prevTestimonial = () => {
            currentTestimonialSlide.value = (currentTestimonialSlide.value - 1 + testimonials.length) % testimonials.length;
            resetTestimonialSlideInterval();
        };
        
        const resetTestimonialSlideInterval = () => {
            clearInterval(testimonialSlideInterval);
            testimonialSlideInterval = setInterval(nextTestimonial, 6000);
        };
        
        const animateStats = () => {
            stats.forEach((stat) => {
                const duration = 2000; // 2 seconds
                const steps = 60;
                const increment = stat.value / steps;
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= stat.value) {
                        stat.current = stat.value;
                        clearInterval(timer);
                    } else {
                        stat.current = Math.floor(current);
                    }
                }, duration / steps);
            });
        };
        
        // Função para formatar o telefone do formulário de contato
        const formatContactPhone = () => {
            let value = contactForm.phone.replace(/\D/g, '');
            
            if (value.length <= 11) {
                // Aplica a máscara
                if (value.length > 2) {
                    value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
                }
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10);
                }
            } else {
                // Limita a 11 dígitos
                value = value.substring(0, 11);
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
            }
            
            contactForm.phone = value;
        };
        
        // Função para o formulário de contato
        const handleContactFormSubmit = () => {
            console.log("Função handleContactFormSubmit chamada");
            console.log("Valores do formulário:", {
                name: contactForm.name,
                email: contactForm.email,
                phone: contactForm.phone,
                subject: contactForm.subject,
                message: contactForm.message
            });
            
            // Verifica se o formulário é válido
            if (!validateContactForm()) {
                console.log("Validação falhou");
                return;
            }
            
            console.log("Validação passou, preparando para enviar");
            contactForm.sending = true;
            contactForm.status = '';
            contactForm.message = '';
            
            // Preparação dos dados para o email
            const templateParams = {
                name: contactForm.name,
                email: contactForm.email,
                phone: contactForm.phone || 'Não informado',
                subject: contactForm.subject,
                message: contactForm.message,
                current_year: new Date().getFullYear(),
                to_email: 'marketing@garanticoop.com.br'
            };
            
            console.log("Parâmetros do template:", templateParams);
            console.log("emailjs disponível?", typeof emailjs !== 'undefined');
            
            // Verifica se o EmailJS está disponível
            if (typeof emailjs !== 'undefined') {
                // Use o service_id correto do EmailJS e um template_id diferente para o contato
                console.log("Tentando enviar email via EmailJS");
                emailjs.send('service_iffzqoi', 'template_tlp8t8n', templateParams)
                    .then(function(response) {
                        console.log('Email de contato enviado!', response.status, response.text);
                        handleContactSuccess();
                    }, function(error) {
                        console.error('Erro ao enviar email de contato:', error);
                        handleContactError();
                    });
            } else {
                // Fallback - simulação de envio
                console.log('EmailJS não encontrado. Simulando envio de contato...');
                console.log('Dados do formulário de contato:', templateParams);
                
                // Simula um delay de processamento
                setTimeout(() => {
                    handleContactSuccess();
                }, 2000);
            }
        };
        
        // Validação do formulário de contato
        const validateContactForm = () => {
            // Verifica se o e-mail é válido
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactForm.email)) {
                contactForm.status = 'error';
                contactForm.message = 'Por favor, informe um endereço de e-mail válido.';
                return false;
            }
            
            // Verifica se o nome tem pelo menos 3 caracteres
            if (contactForm.name.trim().length < 3) {
                contactForm.status = 'error';
                contactForm.message = 'Por favor, informe seu nome.';
                return false;
            }
            
            // Verifica se há uma mensagem
            if (!contactForm.message || contactForm.message.trim().length < 10) {
                contactForm.status = 'error';
                contactForm.message = 'Por favor, digite uma mensagem com pelo menos 10 caracteres.';
                return false;
            }
            
            return true;
        };
        
        // Função para tratar sucesso no envio do contato
        const handleContactSuccess = () => {
            contactForm.sending = false;
            contactForm.status = 'success';
            contactForm.message = 'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.';
            
            // Limpa o formulário
            contactForm.name = '';
            contactForm.email = '';
            contactForm.phone = '';
            contactForm.subject = '';
            contactForm.message = '';
            
            // Remove a mensagem de sucesso após alguns segundos
            setTimeout(() => {
                contactForm.status = '';
                contactForm.message = '';
            }, 5000);
        };
        
        // Função para tratar erro no envio do contato
        const handleContactError = () => {
            contactForm.sending = false;
            contactForm.status = 'error';
            contactForm.message = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.';
        };
        
        // Abre o WhatsApp
        const openWhatsapp = () => {
            window.open('https://wa.me/554532524435?text=Olá, gostaria de mais informações sobre as soluções da Garanticoop.', '_blank');
        };
        
        onMounted(() => {
            // Initialize sliders
            resetHeroSlideInterval();
            resetTestimonialSlideInterval();
            
            // Setup intersection observer for fade-in elements
            const fadeElements = document.querySelectorAll('.fade-in');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                        
                        // If counter items become visible, start animation
                        if (entry.target.classList.contains('counter-item') && !counterAnimated) {
                            animateStats();
                            counterAnimated = true;
                        }
                    }
                });
            }, observerOptions);
            
            fadeElements.forEach(el => observer.observe(el));
        });
        
        let counterAnimated = false;
        
        return {
            isMobileMenuOpen,
            heroSlides,
            currentHeroSlide,
            partners,
            services,
            stats,
            testimonials,
            currentTestimonialSlide,
            contactForm,
            currentYear,
            toggleMobileMenu,
            closeMobileMenu,
            scrollToSection,
            changeHeroSlide,
            changeTestimonialSlide,
            nextTestimonial,
            prevTestimonial,
            formatContactPhone,
            handleContactFormSubmit,
            validateContactForm,
            openWhatsapp
        };
    }
}).mount('#app');