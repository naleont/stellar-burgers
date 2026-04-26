describe('Создание заказа', () => {
  beforeEach(() => {
    cy.interceptIngredients();
    cy.interceptOrder();
    cy.mockAuth();

    cy.visit('http://localhost:4000/');

    cy.wait('@getIngredients');
    // cy.wait('@getAuthUser');
  });

  it('тест на создание заказа', () => {
    cy.buildBurger();

    cy.get('button').contains('Оформить заказ').should('be.enabled');

    cy.get('button').contains('Оформить заказ').click();

    cy.wait('@createOrder').then((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response!.statusCode).to.equal(200);

      const requestBody = interception.request.body;
      expect(requestBody).to.have.property('ingredients');
      expect(requestBody.ingredients).to.be.an('array').that.is.not.empty;
    });

    cy.get('[data-testid="modal"]').should('be.visible');

    cy.fixture('order.json').then((mockOrder) => {
      const orderNumber = mockOrder.order.number;
      cy.get('[data-testid="modal"]').should('contain', orderNumber);
    });

    cy.get('[data-testid="modal-close-button"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="constructor-ingredients-list"]').within(() => {
      cy.get('[class*="burger_constructor_element"]').should('have.length', 0);

      cy.contains('Выберите начинку').should('be.visible');
    });

    cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
  });
});
