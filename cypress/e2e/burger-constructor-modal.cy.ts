describe('Модальное окно', () => {
  beforeEach(() => {
    cy.interceptIngredients();
    cy.visit('http://localhost:4000/');
    cy.waitForIngredients();
  });

  it('тест на открытие при клике на ингредиент', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.contains('Детали ингредиента').should('be.visible');
  });

  it('тест на закрытие по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('тест на закрытие по клику на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});