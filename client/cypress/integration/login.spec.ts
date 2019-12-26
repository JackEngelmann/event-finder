describe('login', () => {
  it('visit login page', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=footer-admin]').click()
    cy.url().should('include', 'login')
    cy.get('[data-cy=login-username-input]')
        .type('admin')
    cy.get('[data-cy=login-password-input]')
        .type('alexfalcojack')
    cy.get('[data-cy=login-submit-button]').click()
    cy.url().should('include', 'admin')
  })
})

// indicates that file is a module (to shut up typescript warning)
export {}
