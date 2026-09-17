// Validação do formulário
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formContato');
  const statusEnvio = document.getElementById('statusEnvio');
//ano atual no rodapé
document.getElementById('ano-atual').textContent = new Date().getFullYear();

//formulário de contato
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validação
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // 1. inputs de texto
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const empresa = document.getElementById('empresa').value;
    const mensagem = document.getElementById('mensagem').value;

    // 1.1 escolha do select 
    const selectDimensao = document.getElementById('dimensao');
    const dimensao = selectDimensao.options[selectDimensao.selectedIndex].text;

    const selectAssunto = document.getElementById('assunto');
    const assunto = selectAssunto.options[selectAssunto.selectedIndex].text;

  // 2. Envio via EmailJS
    emailjs.send("service_cimkvds", "template_u28b9f8", {
        nome: nome,
        email: email,
        empresa: empresa,
        dimensao: dimensao,
        assunto: assunto,
        mensagem: mensagem
    }).then(() => {
        statusEnvio.className = 'alert alert-success mt-3';
        statusEnvio.textContent = `Obrigado pelo contato, ${nome}! Retornaremos em breve.`;
        
        // 3. Limpa o formulário 
        form.reset(); 
        form.classList.remove('was-validated');
    }).catch((erro) => {
        statusEnvio.className = 'alert alert-danger mt-3';
        statusEnvio.textContent = 'Erro ao enviar. Tente novamente mais tarde.';
        console.error('Erro no EmailJS:', erro);
    });
  });
});

// Animação de entrada das colunas da sessão de serviços
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // Remove a classe ao sair da tela
    }
  });
});

const colunas = document.querySelectorAll('.hidden');
colunas.forEach((coluna) => observer.observe(coluna));