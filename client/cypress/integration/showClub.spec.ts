import moment from 'moment'

describe('show club', () => {
  it('show upcoming events', () => {
    // create club
    cy.login()
    cy.visit('http://localhost:3000/#/admin')
    cy.acceptCookies()
    cy.get('[data-cy=admin-create-club-button]').click()
    cy.url().should('contain', 'add-club')

    const clubInformation = {
      name: 'show-club-test-' + Math.round(Math.random() * 10000),
    }
    cy.get('[data-cy=clubeditor-name-input]').type(clubInformation.name)
    cy.get('[data-cy=adminaddclubpage-create]').click()
    cy.url().should('contain', '/club/')
    cy.url().then(clubUrl => {
      cy.contains('Keine bevorstehenden Events')
      cy.visit('http://localhost:3000/#/admin')
      cy.get('[data-cy=admin-create-event-button]').click()
      cy.url().should('contain', 'add-event')
      const eventInformation = {
        name: 'name-created-' + Math.round(Math.random() * 10000),
        club: clubInformation.name,
        date: moment().add(1, 'day'),
      }
      cy.get('[data-cy=addminaddevent-name-input]').type(eventInformation.name)

      cy.get(`[data-cy=calendar-day-${eventInformation.date.date()}`).click()
      cy.get('[data-cy=adminaddevent-club-select]').select(
        eventInformation.club
      )
      cy.get('[data-cy=adminaddevent-create]').click()
      cy.url().should('contain', '/event/')
      cy.visit(clubUrl)
      cy.contains(eventInformation.name)
    })
  })
})

// indicates that file is a module (to shut up typescript warning)
export {}
