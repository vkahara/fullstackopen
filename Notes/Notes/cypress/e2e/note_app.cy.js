describe('Note app', function() {

  beforeEach(function() {

    cy.request('POST', 'https://localhost:3001/api/testing/reset')
    const user = {
      name: 'Valtteri Kähärä',
      username: 'vkahara',
      password: 'labra123'
    }
    cy.request('POST', 'https://localhost:3001/api/users')
    cy.visit('http://localhost:5173')
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
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('input:first').type('vkahara')
      cy.get('input:last').type('labra123')
      cy.get('#login-button').click()
    })


    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })

})