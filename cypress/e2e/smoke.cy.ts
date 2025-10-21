describe('Smoke', () => {
  it('loads and shows Next product button', () => {
    cy.visit('/')
    cy.contains('Next product').should('be.visible')
  })
})
