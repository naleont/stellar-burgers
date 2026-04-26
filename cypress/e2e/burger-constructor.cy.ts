describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.interceptIngredients();
    cy.visit('http://localhost:4000/');
  });

  it('тест на загрузку и отображение ингредиентов из моковых данных', () => {
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response).to.not.be.undefined;
      expect(interception.response!.body.data.length).to.be.greaterThan(0);
    });
  });
});

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.interceptIngredients();
    cy.visit('http://localhost:4000/');
    cy.waitForIngredients();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('тест на добавление ингредиента в конструктор', () => {
      cy.get('[data-testid="ingredient-item"]')
        .filter(':contains("Биокотлета")')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get('[data-testid="constructor-ingredients"]').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });

    it('тест на добавление булки в конструктор', () => {
      cy.get('[data-testid="ingredient-item"]')
        .filter(':contains("Краторная булка")')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.get('[data-testid="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i (верх)'
      );

      cy.get('[data-testid="constructor-bun-bottom"]').should(
        'contain',
        'Краторная булка N-200i (низ)'
      );
    });
  });
});
