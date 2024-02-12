describe('Note app', function() {

  beforeEach(function() {
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
})