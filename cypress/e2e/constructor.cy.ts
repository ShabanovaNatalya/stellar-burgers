///<reference types = "cypress"/>

describe('Добавление ингредиента из списка в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.viewport(1300, 800);
    cy.visit('http://localhost:8080/');
  });

  afterEach(function () {
    cy.clearCookies();
  });

  it('добавление bun и main в конструктор', function () {
    //проверка добавления bun в конструктор
    cy.get('[data-cy=ingredient-bun]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-top]')
      .contains('Краторная булка N-200i (верх)')
      .should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains('Краторная булка N-200i (низ)')
      .should('exist');
    //проверка добавления main в конструктор
    cy.get('[data-cy=ingredient-main]').contains('Добавить').click();
    cy.get('[data-cy=constructor-main]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });

  it('проверка открытия/закрытия модального окна игридиента', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=ingredientName]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');

    //тест закрытия по крестику
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modalCloseButton]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Тест создание заказа', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' });

    // Установка токенов
    cy.window().then((win) => {
      win.localStorage.setItem(
        'refreshToken',
        JSON.stringify({ token: 'test-refreshToken' })
      );
    });
    cy.setCookie('accessToken', 'Bearer test-accessToken', {
      domain: 'localhost'
    });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:8080/');
  });

  afterEach(function () {
    cy.window().then((win) => {
      win.localStorage.clear();
      win.sessionStorage.clear();
    });
    cy.clearCookies();
  });

  it('добавление в конструктор, отправка заказа', function () {
    cy.get('[data-cy=ingredient-bun]').contains('Добавить').click();
    cy.get('[data-cy=ingredient-main]').contains('Добавить').click();
    cy.get('[data-cy=ingredient-sauce]').contains('Добавить').click();
    cy.get('[data-cy=onOrderButton]').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=order-number]').contains('69289').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');

    ///Проверка что конструктор пуст.
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
