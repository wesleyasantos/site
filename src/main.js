const { createApp, ref, reactive, onMounted, computed, watch } = Vue;

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
        
        // Função para formatar telefone (atualizada)
        const formatContactPhone = () => {
            let value = contactForm.phone.replace(/\D/g, '');
            
            if (value.length <= 2) {
                contactForm.phone = value.length ? `(${value}` : value;
            } else if (value.length <= 6) {
                contactForm.phone = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else if (value.length <= 10) {
                contactForm.phone = `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
            } else {
                value = value.substring(0, 11);
                contactForm.phone = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            }
        };
        
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
        
        // Função para validar o formulário (simplificada, mantida por compatibilidade)
        const validateContactForm = () => {
            // As validações estão na função independente, este é um stub
            return true;
        };
        
        // Função para o formulário de contato (simplificada, mantida por compatibilidade)
        const handleContactFormSubmit = (event) => {
            if (event) event.preventDefault();
            // A implementação real está na função independente
            // Esta função fica apenas como fallback
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

// Função de envio independente para o formulário de contato
window.handleContactFormDirectly = function() {
    console.log("Função de envio do formulário independente iniciada");
    
    // Prevenir acionamento duplo
    if (window.isContactFormSubmitting) {
        console.log("Envio já em andamento, ignorando clique");
        return;
    }
    
    window.isContactFormSubmitting = true;
    
    // Exibir feedback visual
    const submitButton = document.querySelector('.contact-form button[type="button"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Enviando...</span>';
    submitButton.disabled = true;
    
    // Obter os valores dos campos
    const nameInput = document.querySelector('.contact-form input[placeholder="Nome completo"]');
    const emailInput = document.querySelector('.contact-form input[placeholder="E-mail"]');
    const phoneInput = document.querySelector('.contact-form input[placeholder="Telefone"]');
    const subjectSelect = document.querySelector('.contact-form select');
    const messageTextarea = document.querySelector('.contact-form textarea');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const subject = subjectSelect.value;
    const message = messageTextarea.value.trim();
    
    // Função para exibir mensagem de status no estilo do simulacao.js
    const showStatus = (message, isError = false) => {
        // Seleciona o elemento de mensagem de status
        const statusContainer = document.getElementById('contactStatusMessage');
        const statusDiv = statusContainer ? statusContainer.querySelector('.form-message') : null;
        
        if (statusDiv) {
            // Define o conteúdo e as classes para estilo
            statusDiv.innerHTML = message;
            statusDiv.className = isError ? 'form-message error' : 'form-message success';
            
            // Mostra o contêiner de status
            statusContainer.style.display = 'block';
            
            // Se for sucesso, esconde após um tempo
            if (!isError) {
                setTimeout(() => {
                    statusContainer.style.display = 'none';
                }, 6000);
            }
        } else {
            // Fallback se o elemento não existir
            isError ? alert(message) : console.log(message);
        }
    };
    
    // Validações
    if (!name) {
        showStatus("Por favor, informe seu nome completo.", true);
        nameInput.focus();
        resetForm(false);
        return;
    }
    
    if (!email || !email.includes('@') || !email.includes('.')) {
        showStatus("Por favor, informe um e-mail válido.", true);
        emailInput.focus();
        resetForm(false);
        return;
    }
    
    if (!subject) {
        showStatus("Por favor, selecione um assunto.", true);
        subjectSelect.focus();
        resetForm(false);
        return;
    }
    
    if (!message || message.length < 10) {
        showStatus("Por favor, digite uma mensagem com pelo menos 10 caracteres.", true);
        messageTextarea.focus();
        resetForm(false);
        return;
    }
    
    // Parâmetros para o EmailJS
    const templateParams = {
        name: name,
        email: email,
        phone: phone || 'Não informado',
        subject: subject,
        message: message,
        current_year: new Date().getFullYear(),
        to_email: 'marketing@garanticoop.com.br'
    };
    
    console.log("Dados do formulário:", templateParams);
    
    // Limpar mensagens de status anteriores
    const statusContainer = document.getElementById('contactStatusMessage');
    if (statusContainer) {
        statusContainer.style.display = 'none';
    }
    
    // Enviar o email
    if (typeof emailjs !== 'undefined') {
        console.log("Enviando email com EmailJS");
        emailjs.send('service_iffzqoi', 'template_tlp8t8n', templateParams)
            .then(function(response) {
                console.log('Email enviado com sucesso!', response.status, response.text);
                
                // Limpar os campos
                nameInput.value = '';
                emailInput.value = '';
                phoneInput.value = '';
                subjectSelect.selectedIndex = 0;
                messageTextarea.value = '';
                
                // Exibir mensagem de sucesso
                showStatus("Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.");
                
                // Resetar estado do botão
                resetForm(true);
            })
            .catch(function(error) {
                console.error('Erro ao enviar email:', error);
                showStatus("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.", true);
                resetForm(true);
            });
    } else {
        console.error("EmailJS não disponível");
        showStatus("Serviço de email não disponível no momento. Por favor, tente novamente mais tarde ou entre em contato pelo WhatsApp.", true);
        resetForm(true);
    }
    
    // Função para resetar o estado do formulário
    function resetForm(complete) {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        window.isContactFormSubmitting = false;
        
        // Se o envio foi cancelado, manter os dados
        if (!complete) {
            // Atualizar os valores do Vue se possível
            tryUpdateVueState();
        }
    }
    
    // Tenta atualizar o estado do Vue para manter sincronizado
    function tryUpdateVueState() {
        try {
            const app = document.querySelector('#app').__vue_app__;
            if (app && app.config && app.config.globalProperties) {
                const vm = app.config.globalProperties;
                if (vm.contactForm) {
                    vm.contactForm.name = name;
                    vm.contactForm.email = email;
                    vm.contactForm.phone = phone;
                    vm.contactForm.subject = subject;
                    vm.contactForm.message = message;
                }
            }
        } catch (e) {
            console.log("Não foi possível atualizar o estado do Vue:", e);
        }
    }
};

// Função melhorada para formatação de telefone
window.formatPhoneNumber = function(value) {
    // Remove todos os caracteres não numéricos
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    
    // Formata como (XX) XXXXX-XXXX para celular ou (XX) XXXX-XXXX para fixo
    if (digits.length <= 2) {
        return `(${digits}`;
    } else if (digits.length <= 6) {
        return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
    } else if (digits.length <= 10) {
        // Telefone fixo: (XX) XXXX-XXXX
        return `(${digits.substring(0, 2)}) ${digits.substring(2, 6)}-${digits.substring(6)}`;
    } else {
        // Celular: (XX) XXXXX-XXXX (limita a 11 dígitos)
        return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7, 11)}`;
    }
};

// Configuração da formatação de telefone em tempo real
window.setupPhoneFormatting = function() {
    const phoneInput = document.querySelector('.contact-form input[placeholder="Telefone"]');
    
    if (phoneInput) {
        // Remove event listeners anteriores para evitar duplicação
        const newPhoneInput = phoneInput.cloneNode(true);
        phoneInput.parentNode.replaceChild(newPhoneInput, phoneInput);
        
        // Adiciona o novo event listener
        newPhoneInput.addEventListener('input', function() {
            // Guarda a posição do cursor antes da formatação
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const lastLength = this.value.length;
            
            // Formata o valor
            const originalValue = this.value;
            const formattedValue = window.formatPhoneNumber(originalValue);
            
            // Se o valor formatado for diferente, atualiza
            if (formattedValue !== originalValue) {
                this.value = formattedValue;
                
                // Ajusta a posição do cursor
                const newLength = this.value.length;
                const cursorPos = start + (newLength - lastLength);
                if (this === document.activeElement) {
                    this.setSelectionRange(cursorPos, cursorPos);
                }
                
                // Atualiza também o modelo Vue
                try {
                    const app = document.querySelector('#app').__vue_app__;
                    if (app && app.config && app.config.globalProperties) {
                        const vm = app.config.globalProperties;
                        if (vm.contactForm) {
                            vm.contactForm.phone = this.value;
                        }
                    }
                } catch (e) {
                    console.log("Não foi possível atualizar o modelo Vue:", e);
                }
            }
        });
        
        console.log("Formatação de telefone configurada com sucesso.");
    } else {
        console.log("Campo de telefone não encontrado.");
    }
};

// Sobrescrever a função formatContactPhone original no Vue
// para usar a nova implementação de formatação
window.overrideVuePhoneFormat = function() {
    try {
        const app = document.querySelector('#app').__vue_app__;
        if (app && app.config && app.config.globalProperties) {
            const vm = app.config.globalProperties;
            if (typeof vm.formatContactPhone === 'function') {
                // Substitui a implementação original pela nova
                vm.formatContactPhone = function() {
                    const phoneInput = document.querySelector('.contact-form input[placeholder="Telefone"]');
                    if (phoneInput && vm.contactForm) {
                        vm.contactForm.phone = window.formatPhoneNumber(phoneInput.value);
                    }
                };
                console.log("Função formatContactPhone substituída com sucesso.");
            }
        }
    } catch (e) {
        console.log("Não foi possível substituir a função formatContactPhone:", e);
    }
};

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Configura a formatação de telefone
    window.setupPhoneFormatting();
    
    // Reconfigura após um tempo para garantir que o Vue tenha inicializado
    setTimeout(window.setupPhoneFormatting, 500);
    setTimeout(window.setupPhoneFormatting, 1000);
    
    // Tenta substituir a função depois que o Vue estiver inicializado
    setTimeout(window.overrideVuePhoneFormat, 1000);
    
    // Verificar se o EmailJS está disponível
    if (typeof emailjs === 'undefined') {
        console.error("EmailJS não está disponível. Recarregando o script...");
        
        // Tentar recarregar o script
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
        script.onload = function() {
            if (typeof emailjs !== 'undefined') {
                emailjs.init("a7vq8iGtTJ92YJ0Dt");
                console.log("EmailJS carregado com sucesso após recarga");
            }
        };
        document.head.appendChild(script);
    } else {
        console.log("EmailJS disponível no carregamento da página");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Função para atualizar o ano atual no footer
    function updateFooterYear() {
      const currentYear = new Date().getFullYear();
      
      // Procura por elementos que contenham o texto "{{ currentYear }}" e substitui
      const footerTexts = document.querySelectorAll('.footer-bottom p');
      footerTexts.forEach(element => {
        if (element.innerHTML.includes('{{ currentYear }}')) {
          element.innerHTML = element.innerHTML.replace('{{ currentYear }}', currentYear);
        }
      });
      
      // Também procura por spans específicos para o ano
      const yearElements = document.querySelectorAll('#current-year');
      yearElements.forEach(element => {
        element.textContent = currentYear;
      });
    }
    
    // Executa imediatamente
    updateFooterYear();
    
    // Executa novamente após um breve atraso (caso o Vue não tenha terminado de renderizar)
    setTimeout(updateFooterYear, 500);
  });