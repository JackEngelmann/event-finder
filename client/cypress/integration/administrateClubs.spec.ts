describe('administrate clubs', () => {
  it('create club', () => {
    cy.login()
    cy.visit('http://localhost:3000/#/admin')
    cy.get('[data-cy=admin-create-club-button]').click()
    cy.url().should('contain', 'add-club')

    const clubInformation = {
      name: 'name-created',
      contact: 'contact-created',
      address: 'address-created',
      description: 'description-created 🍃🔝🎉📢👉🌵🎵',
      email: 'email-created',
      link: 'link-created',
      region: 'region-created',
      specials: 'specials-created',
    }

    /**
     * fill in information
     */
    cy.get('[data-cy=clubeditor-name-input]').type(clubInformation.name)
    cy.get('[data-cy=clubeditor-address-input]').type(clubInformation.address)
    cy.get('[data-cy=clubeditor-contact-input]').type(clubInformation.contact)
    cy.get('[data-cy=clubeditor-description-input]').type(
      clubInformation.description
    )
    cy.get('[data-cy=clubeditor-email-input]').type(clubInformation.email)
    cy.get('[data-cy=clubeditor-link-input]').type(clubInformation.link)
    cy.get('[data-cy=clubeditor-region-input]').type(clubInformation.region)
    cy.get('[data-cy=clubeditor-specials-input]').type(clubInformation.specials)
    cy.get('[data-cy=imageurlsinput-add]').click()
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
    cy.get('[data-cy=adminaddclubpage-create]').click()
    cy.url().should('contain', '/club/')

    /**
     * check filled in information
     */
    cy.get('h1').contains(clubInformation.name)
    cy.get('[data-cy=clubdetailpage-address-kv]').contains(
      clubInformation.address
    )
    cy.get('[data-cy=clubdetailpage-contact-kv]').contains(
      clubInformation.contact
    )
    cy.get('section').contains(clubInformation.description)
    cy.get('[data-cy=clubdetailpage-email-kv]').contains(clubInformation.email)
    cy.get('[data-cy=clubdetailpage-link-kv] a').should(e => expect(e.attr('href')).contain(clubInformation.link))
    cy.get('[data-cy=clubdetailpage-region-kv]').contains(
      clubInformation.region
    )
    cy.get('[data-cy=clubdetailpage-specials-kv]').contains(
      clubInformation.specials
    )
    cy.get('img').should(e => expect(e.attr('src')).contain('images/'))
  })

  it('update club', () => {
    cy.login()
    cy.visit('http://localhost:3000/#/admin')

    /**
     * create with required information
     */
    cy.get('[data-cy=admin-create-club-button]').click()
    cy.url().should('contain', 'add-club')
    cy.get('[data-cy=clubeditor-name-input]').type('create-name')
    cy.get('[data-cy=adminaddclubpage-create]').click()
    cy.url().should('contain', '/club/')

    /**
     * update club with all information
     */
    cy.get('[data-cy=clubdetailpage-edit-button]').click()
    cy.url().should('contain', '/admin/club/')

    const clubInformation = {
      name: 'name-updated',
      contact: 'contact-updated',
      address: 'address-updated',
      description: 'description-updated 🍃🔝🎉📢👉🌵🎵',
      email: 'email-updated',
      link: 'link-updated',
      region: 'region-updated',
      specials: 'specials-updated',
    }

    cy.get('[data-cy=clubeditor-name-input]')
      .clear()
      .type(clubInformation.name)
    cy.get('[data-cy=clubeditor-address-input]')
      .clear()
      .type(clubInformation.address)
    cy.get('[data-cy=clubeditor-contact-input]')
      .clear()
      .type(clubInformation.contact)
    cy.get('[data-cy=clubeditor-description-input]')
      .clear()
      .type(clubInformation.description)
    cy.get('[data-cy=clubeditor-email-input]')
      .clear()
      .type(clubInformation.email)
    cy.get('[data-cy=clubeditor-link-input]')
      .clear()
      .type(clubInformation.link)
    cy.get('[data-cy=clubeditor-region-input]')
      .clear()
      .type(clubInformation.region)
    cy.get('[data-cy=clubeditor-specials-input]')
      .clear()
      .type(clubInformation.specials)
    cy.get('[data-cy=imageurlsinput-add]')
      .click()
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
    cy.get('[data-cy=adminupdateclub-save]').click()
    cy.url().should('contain', '/club/')
    cy.wait(2000)

    /**
     * check filled in information
     */
    cy.get('h1').contains(clubInformation.name)
    cy.get('[data-cy=clubdetailpage-address-kv]').contains(
      clubInformation.address
    )
    cy.get('[data-cy=clubdetailpage-contact-kv]').contains(
      clubInformation.contact
    )
    cy.get('section').contains(clubInformation.description)
    cy.get('[data-cy=clubdetailpage-email-kv]').contains(clubInformation.email)
    cy.get('[data-cy=clubdetailpage-link-kv] a').should(e => expect(e.attr('href')).contain(clubInformation.link))
    cy.get('[data-cy=clubdetailpage-region-kv]').contains(
      clubInformation.region
    )
    cy.get('[data-cy=clubdetailpage-specials-kv]').contains(
      clubInformation.specials
    )
    cy.get('img').should(e => expect(e.attr('src')).contain('images/'))
  })
})

// indicates that file is a module (to shut up typescript warning)
export {}
