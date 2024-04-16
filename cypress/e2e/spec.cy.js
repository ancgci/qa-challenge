describe('Testes de Cadastro', () => {
  beforeEach(() => {
    cy.visit('https://qastage.buildbox.one/18/cadastro')
    cy.get('#btn-enroll', { timeout: 1000 }).click();
  })

  it('Deve validar campos obrigatórios', () => {
    // Verifica se os campos obrigatórios estão presentes
    cy.get('label[for="signup-personal-data-firstName"]').should('exist');
    cy.get('label[for="signup-personal-data-lastName"]').should('exist');
    cy.get('label[for="signup-personal-data-birthDate"]').should('exist');
    cy.get('label[for="signup-personal-data-cpf"]').should('exist');
    cy.get('label[for="signup-personal-data-email"]').should('exist');
    cy.get('label[for="signup-personal-data-email-confirm"]').should('exist');
    cy.get('.form-label.mb-2').contains('Nível de proficiência na língua inglesa').should('exist');
    // Tenta enviar o formulário sem preencher campos obrigatórios
    cy.get('[data-cy="button-signup_submit_button_1"]').click();
  })

  it('Deve validar formato de dados', () => {
    // Seleciona o campo de e-mail
    cy.get('[data-cy="input-signup-personal-data-email"]');
    // Digita um e-mail inválido (sem @)
    cy.get('[data-cy="input-signup-personal-data-email"]').type('emailinvalido.com');
    // Verifica se há mensagem de erro de e-mail inválido
    cy.get('.input-error').should('be.visible'); // verificação de erro
    // Insere senha com formato inválido
    cy.get('[data-cy="input-signup-personal-data-password"]');
    // Digita uma e-senha inválido (123)
    cy.get('[data-cy="input-signup-personal-data-password"]').type('123');
    // Verifica se há mensagem de erro de senha inválida
    cy.get('.input-error').should('be.visible'); //  verificação de erro
  })

  //('Deve validar entrada de dados inválida', () => {
  // Insere dados inválidos
  // cy.get('[data-cy=input-signup-personal-data-firstName]').type('7')    
  // Verificaria se a mensagem de erro e span class fossem unicos  , assim vai dar erro mesmo
  //  cy.get('span.input-error').should('have.text', 'Preencha corretamente')   
  // })   ;


  it('Deve cadastrar um novo usuário com dados válidos', () => {

    // Preenche campos com dados válidos
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type('John')
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type('Doe')
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type('10/01/2030')
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type('000.000.000-00')
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type('sr.antoniocarlos@gmail.com')
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type('sr.antoniocarlos@gmail.com')
    cy.get('[data-cy="input-signup-personal-data-password"]').type('Antonio2024')
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type('Antonio2024')
    cy.get('.form-container > .relative > #dropdown-button-1 > .overflow-y-scroll > .flex:nth-child(4)').click({force: true}) // possivel oportunidadex'
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').click();
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').should('be.checked');
    cy.get('[data-cy="button-signup_submit_button_3"]').click({force: true}); // possivel oportunidade

    // Verifica se foi redirecionado corretamente após o cadastro
    cy.url().should('include', '/cadastro')
    })
  })