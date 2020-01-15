describe('language', () => {
  it('desktop: switching language should the language of the month selector', () => {
    cy.login()
    cy.visit('http://localhost:3000/#/event?date=2019-12-26T20:22:41.306Z')
    cy.contains('Auswahl akzeptieren').click()
    cy.get('[data-cy=calendar]').contains('Dezember')
    cy.get('[data-cy=language-toggle]').click()
    cy.get('[data-cy=calendar]').contains('December')
  })

  it('mobile: swtich language of day selector', () => {
    cy.login()
    cy.visit('http://localhost:3000/#/event?date=2019-12-26T20:22:41.306Z')
    cy.contains('Auswahl akzeptieren').click()
    cy.viewport('samsung-s10')
    cy.get('[data-cy=day-quick-switch]').contains('Dezember')
    cy.get('[data-cy=language-toggle]').click()
    cy.get('[data-cy=day-quick-switch]').contains('December')
  })
})

// indicates that file is a module (to shut up typescript warning)
export {}
