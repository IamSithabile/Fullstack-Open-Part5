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

  it.only('succedds with correct information', function () {
    cy.contains('Login').click()

    cy.get('input#username').type('mluukkai')
    cy.get('input#password').type('salainen')
    cy.get('button#login-button').click()

    cy.get('.success').should('contain', 'Successfully logged in')
  })

  it.only('fails with incorrect information', function () {
    cy.contains('Login').click()

    cy.get('input#username').type('mluukkai')
    cy.get('input#password').type('salaixnen')
    cy.get('button#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'background-color', 'rgba(255, 77, 77, 0.7)')
  })
})
