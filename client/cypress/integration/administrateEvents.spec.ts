describe('adinistrate events', () => {
  it('create single date event', () => {
    cy.login()
    cy.visit('http://localhost:3000/#/admin')
    cy.get('[data-cy=admin-create-event-button]').click()
    cy.url().should('contain', 'add-event')

    const eventInformation = {
      name: 'name-created',
      club: 'Gisela',
      admissionfee: '12',
      admissionfeewithdiscount: '10',
      amountoffloors: '3',
      description: 'created-description',
      specials: 'created-specials',
      minimumage: '18',
      genres: ['Techno', 'Schlager'],
      link: 'created-link',
      pricecategory: 'Average',
    }

    /**
     * fill in information
     */
    cy.get('[data-cy=addminaddevent-name-input]').type(
      eventInformation.name
    )

    // select the 15th of the current month as a date for the event
    cy.get('[data-cy=calendar-day-15').click()
    cy.get('[data-cy=adminaddevent-club-select]').select(eventInformation.club)
    cy.get('[data-cy=adminaddevent-admissionfee-input]').type(
      eventInformation.admissionfee
    )
    cy.get('[data-cy=adminaddevent-admissionfeewithdiscount-input]').type(
      eventInformation.admissionfeewithdiscount
    )
    cy.get('[data-cy=adminaddevent-amountoffloors-input]').type(
      eventInformation.amountoffloors
    )
    cy.get('[data-cy=adminaddevent-description-input]').type(
      eventInformation.description
    )
    cy.get('[data-cy=adminaddevent-specials-input]').type(
      eventInformation.specials
    )
    cy.get('[data-cy=adminaddevent-minimumage-input]').type(
      eventInformation.minimumage
    )
    cy.get('[data-cy=adminaddevent-pricecategory-select]').select(
      eventInformation.pricecategory
    )
    for (let genre of eventInformation.genres) {
      cy.contains(genre).click()
    }
    cy.get('[data-cy=adminaddevent-link-input]').type(eventInformation.link)
    cy.fixture('testPicture.jpg').then(fileContent => {
      cy.get('input[type=file]').upload({
        fileContent,
        fileName: 'testPicture.jpg',
        mimeType: 'image/jpeg',
      })
    })
    cy.wait(2000)

    /**
     * save
     */
    cy.get('[data-cy=adminaddevent-create]').click()
    cy.url().should('contain', '/event/')
    cy.wait(2000)

    /**
     * check filled in information
     */
    cy.get('h1').contains(eventInformation.name)
    cy.get('[data-cy=eventdetail-club-kv]').contains(eventInformation.club)
    cy.get('[data-cy=eventdetail-admissionfee-kv]').contains(
      eventInformation.admissionfee
    )
    cy.get('[data-cy=eventdetail-admissionfeewithdiscount-kv]').contains(
      eventInformation.admissionfeewithdiscount
    )
    cy.get('[data-cy=eventdetail-amountoffloors-kv]').contains(
      eventInformation.amountoffloors
    )
    cy.get('img').should(e => expect(e.attr('src')).contain('images/'))
    cy.get('section').contains(eventInformation.description)
    cy.get('[data-cy=eventdetail-specials-kv]').contains(
      eventInformation.specials
    )
    cy.get('[data-cy=eventdetail-minimumage-kv]').contains(
      eventInformation.minimumage
    )
    cy.get('[data-cy=eventdetail-link-kv] a').should(e =>
      expect(e.attr('href')).contain(eventInformation.link)
    )
    for (let genre of eventInformation.genres) {
      cy.get('[data-cy=eventdetail-genres-kv]').contains(genre)
    }
    cy.get(
      '[data-cy=eventdetail-pricecategory-kv] > [data-cy=keyvaluefield-value]'
    ).should('have.text', '€€')
  })

  it('update event', () => {
    cy.login()
    cy.visit('http://localhost:3000/#/admin')

    /**
     * create event with required information
     */
    cy.get('[data-cy=admin-create-event-button]').click()
    cy.url().should('contain', 'add-event')
    cy.get('[data-cy=addminaddevent-name-input]').type('name-created')
    // select the 15th of the current month as a date for the event
    cy.get('[data-cy=calendar-day-15').click()
    cy.get('[data-cy=adminaddevent-club-select]').select('Gisela')
    cy.get('[data-cy=adminaddevent-create]').click()
    cy.url().should('contain', '/event/')
    cy.wait(2000)

    /**
     * updte event with all information
     */
    cy.get('[data-cy=eventdetailpage-edit-button]').click()
    cy.url().should('contain', '/admin/event/')

    const eventInformation = {
      name: 'name-updated',
      club: 'Arteum',
      admissionfee: '13',
      admissionfeewithdiscount: '11',
      amountoffloors: '4',
      description: 'description-updated',
      specials: 'specials-updated',
      minimumage: '20',
      genres: ['Minimal', 'Techno'],
      link: 'link-updated',
      pricecategory: 'High',
    }

    cy.get('[data-cy=adminupdateevent-name-input]').type(
      eventInformation.name
    )

    // select the 16th of the current month as a date for the event
    cy.get('[data-cy=calendar-day-16').click()
    cy.get('[data-cy=adminupdateevent-club-select]').select(eventInformation.club)
    cy.get('[data-cy=adminupdateevent-admissionfee-input]').clear().type(
      eventInformation.admissionfee
    )
    cy.get('[data-cy=adminupdateevent-admissionfeewithdiscount-input]').clear().type(
      eventInformation.admissionfeewithdiscount
    )
    cy.get('[data-cy=adminupdateevent-amountoffloors-input]').clear().type(
      eventInformation.amountoffloors
    )
    cy.get('[data-cy=adminupdateevent-description-input]').clear().type(
      eventInformation.description
    )
    cy.get('[data-cy=adminupdateevent-specials-input]').clear().type(
      eventInformation.specials
    )
    cy.get('[data-cy=adminupdateevent-minimumage-input]').clear().type(
      eventInformation.minimumage
    )
    cy.get('[data-cy=adminupdateevent-pricecategory-select]').select(
      eventInformation.pricecategory
    )
    for (let genre of eventInformation.genres) {
      cy.contains(genre).click()
    }
    cy.get('[data-cy=adminupdateevent-link-input]').clear().type(eventInformation.link)
    cy.fixture('testPicture.jpg').then(fileContent => {
      cy.get('input[type=file]').upload({
        fileContent,
        fileName: 'testPicture.jpg',
        mimeType: 'image/jpeg',
      })
    })
    cy.wait(2000)

    /**
     * save
     */
    cy.get('[data-cy=adminupdateevent-save]').click()
    cy.url().should('contain', '/event/')
    cy.wait(2000)

    /**
     * check filled in information
     */
    cy.get('h1').contains(eventInformation.name)
    cy.get('[data-cy=eventdetail-club-kv]').contains(eventInformation.club)
    cy.get('[data-cy=eventdetail-admissionfee-kv]').contains(
      eventInformation.admissionfee
    )
    cy.get('[data-cy=eventdetail-admissionfeewithdiscount-kv]').contains(
      eventInformation.admissionfeewithdiscount
    )
    cy.get('[data-cy=eventdetail-amountoffloors-kv]').contains(
      eventInformation.amountoffloors
    )
    cy.get('img').should(e => expect(e.attr('src')).contain('images/'))
    cy.get('section').contains(eventInformation.description)
    cy.get('[data-cy=eventdetail-specials-kv]').contains(
      eventInformation.specials
    )
    cy.get('[data-cy=eventdetail-minimumage-kv]').contains(
      eventInformation.minimumage
    )
    cy.get('[data-cy=eventdetail-link-kv] a').should(e =>
      expect(e.attr('href')).contain(eventInformation.link)
    )
    for (let genre of eventInformation.genres) {
      cy.get('[data-cy=eventdetail-genres-kv]').contains(genre)
    }
    cy.get(
      '[data-cy=eventdetail-pricecategory-kv] > [data-cy=keyvaluefield-value]'
    ).should('have.text', '€€€')
  })
})

// indicates that file is a module (to shut up typescript warning)
export {}
