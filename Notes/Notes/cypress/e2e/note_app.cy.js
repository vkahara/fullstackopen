describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Valtteri Kähärä',
      username: 'vkahara',
      password: 'labra123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened',  function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of käsien heiluttelu, University of not Harvard (turkuamk) 2024')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('vkahara')
    cy.get('#password').type('labra123')
    cy.get('#login-button').click()

    cy.contains('Valtteri Kähärä logged in')
  })

  describe('when logged in', function() {
    describe('and several notes exist', function () {
      beforeEach(function () {
  
        cy.login({ username: 'vkahara', password: 'labra123' })
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
  
      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('vkahara')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('.error')
    .should('contain', 'wrong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

    cy.contains('Valtteri Kähärä logged in').should('not.exist')
  })

})