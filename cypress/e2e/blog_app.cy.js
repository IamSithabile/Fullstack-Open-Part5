describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser('Matti Luukkainen', 'mluukkai', 'salainen')
    cy.createUser('Administrator', 'root', 'Admin')
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

    it('a new note can be created', function () {
      cy.createBlog(
        'How to magically control browser, using telekenisis',
        'Or your mind',
        'www.caniHazTelekenisi.com'
      )

      cy.get('button#view').click()
      cy.contains('www.caniHazTelekenisi.com')
    })

    it('a new note can be liked', function () {
      cy.createBlog(
        'How to magically control browser, using telekenisis',
        'Or your mind',
        'www.caniHazTelekenisi.com'
      )

      cy.get('button#view').click()
      cy.contains('www.caniHazTelekenisi.com')

      cy.get('button#like').click()
      cy.contains(1)
    })

    it('can be deleted', function () {
      cy.createBlog(
        'How to magically control browser, using telekenisis',
        'Or your mind',
        'www.caniHazTelekenisi.com'
      )

      cy.get('button#view').click()

      cy.get('button#remove').click()
      cy.get('#title').should('not.be.visible')
    })
    it('can be deleted by creator', function () {
      cy.createBlog(
        'How to magically control browser, using telekenisis',
        'Or your mind',
        'www.caniHazTelekenisi.com'
      )

      cy.get('button#logout-button').click()

      cy.login('root', 'Admin')

      cy.get('button#view').click()

      cy.get('button#remove').should('not.exist')
    })

    it.only('blogs are sorted by likes', function () {
      const blogs = [
        {
          title: 'Blog 1',
          author: 'Author 1',
          likes: 100,
          url: 'https://example.com/blog-1',
        },
        {
          title: 'Blog 2',
          author: 'Author 2',
          likes: 50,
          url: 'https://example.com/blog-2',
        },
        {
          title: 'Blog 3',
          author: 'Author 3',
          likes: 25,
          url: 'https://example.com/blog-3',
        },
        {
          title: 'Blog 4',
          author: 'Author 4',
          likes: 10,
          url: 'https://example.com/blog-4',
        },
        {
          title: 'Blog 5',
          author: 'Author 5',
          likes: 5,
          url: 'https://example.com/blog-5',
        },
      ]

      cy.createBlog(
        blogs[0].title,
        blogs[0].author,
        blogs[0].likes,
        blogs[0].url
      )
      cy.createBlog(
        blogs[1].title,
        blogs[1].author,
        blogs[1].likes,
        blogs[1].url
      )
      cy.createBlog(
        blogs[2].title,
        blogs[2].author,
        blogs[2].likes,
        blogs[2].url
      )
      cy.createBlog(
        blogs[3].title,
        blogs[3].author,
        blogs[3].likes,
        blogs[3].url
      )
      cy.createBlog(
        blogs[4].title,
        blogs[4].author,
        blogs[4].likes,
        blogs[4].url
      )

      cy.get('.blogs').eq(0).should('contain', 'Blog 1')
      cy.get('.blogs').eq(1).should('contain', 'Blog 2')
      cy.get('.blogs').eq(2).should('contain', 'Blog 3')
      cy.get('.blogs').eq(3).should('contain', 'Blog 4')
      cy.get('.blogs').eq(4).should('contain', 'Blog 5')
    })
  })
})
