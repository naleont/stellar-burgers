// Получение ингредиентов
Cypress.Commands.add('interceptIngredients', () => {
  cy.fixture('ingredients.json').then((mockIngredients) => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: mockIngredients
    }).as('getIngredients');
  });
});

Cypress.Commands.add('waitForIngredients', () => {
  cy.wait('@getIngredients');
});

// Создание заказа
Cypress.Commands.add('interceptOrder', () => {
  cy.fixture('order.json').then((mockOrder) => {
    cy.intercept('POST', '**/orders', {
      statusCode: 200,
      body: mockOrder
    }).as('createOrder');
  });
});

// Обновление токена
Cypress.Commands.add('interceptRefreshToken', () => {
  cy.intercept('POST', '**/auth/token', {
    statusCode: 200,
    body: {
      success: true,
      accessToken: 'new-mock-token-67890',
      refreshToken: 'new-mock-refresh-token-12345'
    }
  }).as('refreshToken');
});

// Логин
Cypress.Commands.add('interceptLogin', () => {
  cy.fixture('user.json').then((mockUser) => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: mockUser
    }).as('login');
  });
});

// Проверка авторизации
Cypress.Commands.add('interceptAuthUser', () => {
  cy.intercept('GET', '**/auth/user', {
    statusCode: 200,
    body: {
      success: true,
      user: {
        email: 'testuser@example.com',
        name: 'Test User'
      }
    }
  }).as('getAuthUser');

  cy.intercept('POST', '**/auth/register', {
    statusCode: 200,
    body: {
      success: true,
      accessToken: 'mock-token-12345',
      refreshToken: 'mock-refresh-token-67890',
      user: {
        email: 'testuser@example.com',
        name: 'Test User'
      }
    }
  }).as('register');
});

// Установка мокового токена
Cypress.Commands.add('setMockToken', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('accessToken', 'mock-token-12345');
    win.localStorage.setItem('refreshToken', 'mock-refresh-token-67890');
    // win.document.cookie = 'accessToken=mock-token-12345; path=/';
  });
});

// Авторизация
Cypress.Commands.add('mockAuth', () => {
  cy.interceptAuthUser();
  cy.interceptLogin();
  cy.interceptRefreshToken();
  cy.setMockToken();

  cy.intercept('*', (req) => {
    if (req.headers && req.headers.authorization) {
      console.log('Request with auth:', req.method, req.url);
    }
  });
});

// Сборка бургера
Cypress.Commands.add('buildBurger', () => {
  cy.get('[data-testid="ingredient-item"]')
    .filter(':contains("Краторная булка")')
    .first()
    .within(() => {
      cy.get('button').contains('Добавить').click();
    });

  cy.get('[data-testid="ingredient-item"]')
    .filter(':contains("Биокотлета")')
    .first()
    .within(() => {
      cy.get('button').contains('Добавить').click();
    });

  cy.get('[data-testid="ingredient-item"]')
    .filter(':contains("Соус Spicy-X")')
    .first()
    .within(() => {
      cy.get('button').contains('Добавить').click();
    });
});

declare namespace Cypress {
  interface Chainable<Subject = any> {
    interceptIngredients(): Chainable<void>;
    waitForIngredients(): Chainable<void>;
    interceptLogin(): Chainable<void>;
    interceptOrder(): Chainable<void>;
    interceptAuthUser(): Chainable<void>;
    setMockToken(): Chainable<void>;
    mockAuth(): Chainable<void>;
    interceptRefreshToken(): Chainable<void>;
    buildBurger(): Chainable<void>;
    // setAuthCookie(name: string, value: string): Chainable<void>;
  }
}
