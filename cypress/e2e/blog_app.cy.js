describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('displays login form', function () {
    cy.contains('Login').click()

    cy.get('input#username')
    cy.get('input#password')
    cy.get('button#login-button')
  })

  it('succedds with correct information', function () {
    cy.contains('Login').click()

    cy.get('input#username').type('mluukkai')
    cy.get('input#password').type('salainen')
    cy.get('button#login-button').click()

    cy.get('.success').should('contain', 'Successfully logged in')
  })

  it('fails with incorrect information', function () {
    cy.contains('Login').click()

    cy.get('input#username').type('mluukkai')
    cy.get('input#password').type('salaixnen')
    cy.get('button#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'background-color', 'rgba(255, 77, 77, 0.7)')
  })

  describe('when a user is logged in', function () {
    beforeEach(function () {
      cy.login('mluukkai', 'salainen')
    })

    it.only('a new note can be created', function () {
      cy.contains('Create new blog').click()

      cy.get('input#title').type(
        'How to magically control browser, using telekenisis'
      )
      cy.get('input#author').type('Or your mind')
      cy.get('input#url').type('www.caniHazTelekenisi.com')
      cy.get('button#create-button').click()

      cy.contains('View').click()
      cy.contains('www.caniHazTelekenisi.com')
    })
  })
})
