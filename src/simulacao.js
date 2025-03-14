// Usando Vue.js via CDN que já está importado no HTML
const { createApp, ref, reactive, computed } = Vue;

createApp({
    setup() {
        // Mobile menu state
        const isMobileMenuOpen = ref(false);
        
        // Lista de cidades brasileiras para o dropdown
        const brazilianCities = [
            "São Paulo - SP", "Rio de Janeiro - RJ", "Brasília - DF", "Salvador - BA", "Fortaleza - CE", 
            "Belo Horizonte - MG", "Manaus - AM", "Curitiba - PR", "Recife - PE", "Porto Alegre - RS",
            "Belém - PA", "Goiânia - GO", "Guarulhos - SP", "Campinas - SP", "São Luís - MA",
            "São Gonçalo - RJ", "Maceió - AL", "Duque de Caxias - RJ", "Campo Grande - MS", "Natal - RN",
            "Teresina - PI", "São Bernardo do Campo - SP", "Nova Iguaçu - RJ", "João Pessoa - PB", 
            "Santo André - SP", "São José dos Campos - SP", "Osasco - SP", "Jaboatão dos Guararapes - PE", 
            "Ribeirão Preto - SP", "Uberlândia - MG", "Sorocaba - SP", "Contagem - MG", "Aracaju - SE", 
            "Feira de Santana - BA", "Cuiabá - MT", "Joinville - SC", "Juiz de Fora - MG", "Londrina - PR", 
            "Aparecida de Goiânia - GO", "Niterói - RJ", "Porto Velho - RO", "Serra - ES", "Caxias do Sul - RS",
            "Florianópolis - SC", "Macapá - AP", "Santos - SP", "Mauá - SP", "Vila Velha - ES",
            "Toledo - PR", "Cascavel - PR", "Foz do Iguaçu - PR", "Maringá - PR", "Ponta Grossa - PR",
            "Guarapuava - PR", "Paranaguá - PR", "Apucarana - PR", "Umuarama - PR", "Francisco Beltrão - PR",
            "Pato Branco - PR"
        ];
        
        // Formulário de simulação
        const simulationForm = reactive({
            name: '',
            email: '',
            phone: '',
            isWhatsapp: true, // Novo campo para verificar se o telefone é WhatsApp
            cpfCnpj: '', // Alterado de cnpj para cpfCnpj
            companyName: '',
            establishmentTime: '', // Alterado de operationTime para establishmentTime
            city: '', // Novo campo para cidade
            filteredCities: [], // Para armazenar cidades filtradas
            showCityDropdown: false, // Controla a visibilidade do dropdown
            amount: '',
            term: '',
            purpose: '',
            revenue: '',
            notes: '',
            sending: false,
            status: '',
            message: ''
        });
        
        // Ano atual para o footer
        const currentYear = computed(() => new Date().getFullYear());
        
        // Métodos
        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
        };
        
        const closeMobileMenu = () => {
            isMobileMenuOpen.value = false;
        };
        
        // Formatação de CPF ou CNPJ
        const formatCpfCnpj = () => {
            let value = simulationForm.cpfCnpj.replace(/\D/g, '');
            
            if (value.length <= 11) {
                // Formata como CPF: 000.000.000-00
                value = value.replace(/^(\d{3})(\d)/, '$1.$2');
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');
            } else {
                // Formata como CNPJ: 00.000.000/0000-00
                value = value.substring(0, 14); // Limita a 14 dígitos
                value = value.replace(/^(\d{2})(\d)/, '$1.$2');
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            }
            
            simulationForm.cpfCnpj = value;
        };
        
        // Formatação de valor monetário: R$ 0.000,00
        const formatAmount = () => {
            let value = simulationForm.amount.replace(/\D/g, '');
            
            if (value === '') {
                simulationForm.amount = '';
                return;
            }
            
            // Converte para número
            let numericValue = parseFloat(value) / 100;
            
            // Formata como moeda brasileira
            let formattedValue = numericValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            });
            
            simulationForm.amount = formattedValue;
        };
        
        // Formatar telefone: (00) 00000-0000
        const formatPhone = () => {
            let value = simulationForm.phone.replace(/\D/g, '');
            
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
            
            simulationForm.phone = value;
        };
        
        // Função para lidar com input na cidade
        const handleCityInput = () => {
            if (simulationForm.city.trim() !== '') {
                const query = simulationForm.city.toLowerCase();
                simulationForm.filteredCities = brazilianCities
                    .filter(city => city.toLowerCase().includes(query))
                    .slice(0, 10); // Limita a 10 resultados
                simulationForm.showCityDropdown = true;
            } else {
                simulationForm.showCityDropdown = false;
            }
        };
        
        // Função para selecionar cidade do dropdown
        const selectCity = (city) => {
            simulationForm.city = city;
            simulationForm.showCityDropdown = false;
        };
        
        // Validação do formulário
        const validateForm = () => {
            // Verifica se o e-mail é válido
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(simulationForm.email)) {
                simulationForm.status = 'error';
                simulationForm.message = 'Por favor, informe um endereço de e-mail válido.';
                return false;
            }
            
            // Verifica se o CPF/CNPJ tem pelo menos a quantidade mínima de caracteres
            if (simulationForm.cpfCnpj.replace(/\D/g, '').length < 11) {
                simulationForm.status = 'error';
                simulationForm.message = 'Por favor, informe um CPF ou CNPJ válido.';
                return false;
            }
            
            // Verifica se o nome tem pelo menos 5 caracteres
            if (simulationForm.name.trim().length < 5) {
                simulationForm.status = 'error';
                simulationForm.message = 'Por favor, informe seu nome completo.';
                return false;
            }
            
            // Verifica se o telefone tem pelo menos a quantidade mínima de caracteres
            if (simulationForm.phone.replace(/\D/g, '').length < 10) {
                simulationForm.status = 'error';
                simulationForm.message = 'Por favor, informe um telefone válido com DDD.';
                return false;
            }
            
            return true;
        };
        
        // Envio do formulário
        const handleSimulationSubmit = () => {
            // Valida o formulário antes de enviar
            if (!validateForm()) {
                document.querySelector('.simulation-form').scrollIntoView({ behavior: 'smooth' });
                return;
            }
            
            simulationForm.sending = true;
            simulationForm.status = '';
            simulationForm.message = '';
            
            // Preparação dos dados para o email
            const templateParams = {
                name: simulationForm.name,
                email: simulationForm.email,
                phone: simulationForm.phone,
                is_whatsapp: simulationForm.isWhatsapp ? 'WhatsApp' : '',  // Altera o formato para exibição direta
                phone_numbers_only: simulationForm.phone.replace(/\D/g, ''),
                cpf_cnpj: simulationForm.cpfCnpj,
                company_name: simulationForm.companyName,
                establishment_time: simulationForm.establishmentTime,
                city: simulationForm.city,
                amount: simulationForm.amount,
                term: simulationForm.term,
                purpose: simulationForm.purpose,
                revenue: simulationForm.revenue,
                notes: simulationForm.notes || 'Não informado',
                current_year: new Date().getFullYear(),
                to_email: 'marketing@garanticoop.com.br'
            };
            
            // Verifica se o EmailJS está disponível
            if (typeof emailjs !== 'undefined') {
                // Envio via EmailJS
                emailjs.send('service_iffzqoi', 'template_ywyp1li', templateParams)
                    .then(function(response) {
                        console.log('Email enviado!', response.status, response.text);
                        handleSuccess();
                    }, function(error) {
                        console.error('Erro ao enviar email:', error);
                        handleError();
                    });
            } else {
                // Fallback - simulação de envio quando EmailJS não está configurado
                console.log('EmailJS não encontrado. Simulando envio...');
                console.log('Dados do formulário:', templateParams);
                
                // Simula um delay de processamento
                setTimeout(() => {
                    handleSuccess();
                }, 2000);
            }
        };
        
        // Função para tratar sucesso no envio
        const handleSuccess = () => {
            simulationForm.sending = false;
            simulationForm.status = 'success';
            simulationForm.message = 'Sua solicitação de simulação foi enviada com sucesso! Nossa equipe entrará em contato em breve.';
            
            // Limpa o formulário
            simulationForm.name = '';
            simulationForm.email = '';
            simulationForm.phone = '';
            simulationForm.cpfCnpj = '';
            simulationForm.companyName = '';
            simulationForm.establishmentTime = '';
            simulationForm.city = '';
            simulationForm.amount = '';
            simulationForm.term = '';
            simulationForm.purpose = '';
            simulationForm.revenue = '';
            simulationForm.notes = '';
            simulationForm.isWhatsapp = true;
            
            // Rola para o topo do formulário para mostrar a mensagem
            document.querySelector('.simulation-form').scrollIntoView({ behavior: 'smooth' });
            
            // Remove a mensagem de sucesso após alguns segundos
            setTimeout(() => {
                simulationForm.status = '';
                simulationForm.message = '';
            }, 8000);
        };
        
        // Função para tratar erro no envio
        const handleError = () => {
            simulationForm.sending = false;
            simulationForm.status = 'error';
            simulationForm.message = 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente ou entre em contato conosco por telefone.';
            
            // Rola para o topo do formulário para mostrar a mensagem de erro
            document.querySelector('.simulation-form').scrollIntoView({ behavior: 'smooth' });
        };
        
        // Abre o WhatsApp
        const openWhatsapp = () => {
            window.open('https://wa.me/554532524435?text=Olá, gostaria de mais informações sobre simulação de crédito na Garanticoop.', '_blank');
        };
        
        return {
            isMobileMenuOpen,
            simulationForm,
            currentYear,
            toggleMobileMenu,
            closeMobileMenu,
            formatCpfCnpj,
            formatAmount,
            formatPhone,
            handleCityInput,
            selectCity,
            handleSimulationSubmit,
            openWhatsapp
        };
    }
}).mount('#app');