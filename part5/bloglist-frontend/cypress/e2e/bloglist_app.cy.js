describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Valtteri Kähärä',
      username: 'vkahara',
      password: 'labra123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('vkahara')
      cy.get('#password').type('labra123')
      cy.get('#login-button').click()

      cy.contains('Valtteri Kähärä logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('vkahara')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.contains('Valtteri Kähärä logged in').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'vkahara', password: 'labra123' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create').click()

      cy.get('.message')
        .should('contain', 'Added new blog test title by test author')

      cy.contains('test title test author')
    })

    it('user can like blog', function() {
      cy.createBlog({ title: 'test title', author: 'test author', url: 'http://example.com' })
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('user can delete own blog', function() {
      cy.createBlog({ title: 'test title', author: 'test author', url: 'http://example.com' })
      cy.contains('view').click()

      cy.contains('remove').click()
      cy.contains('test title test author').should('not.exist')

    })

    it('only creator can see delete button no one else', function() {
      cy.createBlog({ title: 'test title', author: 'test author', url: 'http://example.com' })
      cy.contains('view').click()
      cy.contains('remove')
      cy.contains('logout').click()

      const secondUser = {
        name: 'Aku Ankka',
        username: 'aankka',
        password: 'labra123'
      }
      cy.request('POST', 'http://localhost:3003/api/users', secondUser)
      cy.login({ username: 'aankka', password: 'labra123' })

      cy.contains('view').click()
      cy.contains('remove').should('not.exist')

    })

    it.only('blogs are ordered by likes', function() {
      cy.createBlog({ title: 'least likes', author: 'least author', url: 'http://example.com' })
      cy.createBlog({ title: 'most likes', author: 'most author', url: 'http://example.com' })

      cy.get('.blog').eq(0).should('contain', 'least likes')
      cy.get('.blog').eq(1).should('contain', 'most likes')

      cy.contains('most likes').parent().as('blogPost')

      cy.get('@blogPost').contains('view').click()
      cy.get('@blogPost').find('.likeButton').click()
      cy.get('@blogPost').contains('likes 1')
      cy.get('@blogPost').find('.likeButton').click()
      cy.get('@blogPost').contains('likes 2')

      cy.get('.blog').eq(0).should('contain', 'most likes')
      cy.get('.blog').eq(1).should('contain', 'least likes')
    })
  })
})