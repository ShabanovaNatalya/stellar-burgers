///<reference types = "cypress"/>

const testIngredientBun = '[data-cy=ingredient-bun]';
const testIngredientMain = '[data-cy=ingredient-main]';
const modal = '[data-cy=modal]';
const modalOverlay = '[data-cy=modal-overlay]';

describe('Добавление ингредиента из списка в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.viewport(1300, 800);
    cy.visit('/');
    cy.wait(['@getIngredients', '@getUser']);
  });

  afterEach(function () {
    cy.clearCookies();
  });

  it('Добавление bun в конструктор', function () {
    cy.fixture('testData').then((data) => {
      cy.get(testIngredientBun).contains(data.addButtonText).click();
      cy.get('[data-cy=constructor-bun-top]')
        .contains(`${data.ingredientBun} (верх)`)
        .should('exist');
      cy.get('[data-cy=constructor-bun-bottom]')
        .contains(`${data.ingredientBun} (низ)`)
        .should('exist');
    });
  });

  it('Добавление main в конструктор', function () {
    cy.fixture('testData').then((data) => {
      cy.get(testIngredientMain).contains(data.addButtonText).click();
      cy.get('[data-cy=constructor-main]')
        .contains(data.ingredientMain)
        .should('exist');
    });
  });

  it('Открытие/закрытия модального окна игридиента', function () {
    cy.fixture('testData').then((data) => {
      cy.contains(data.ingredientBun).click();
      cy.contains(data.textIngredientDetails).should('exist');
      cy.get('[data-cy=ingredientName]')
        .contains(data.ingredientBun)
        .should('exist');
      cy.get(modalOverlay).click('left', { force: true });
      cy.get(modal).should('not.exist');
    });
  });

  it('Закрытие модального окна игридиента по крестику', function () {
    cy.fixture('testData').then((data) => {
      cy.contains(data.ingredientMain).click();
      cy.contains(data.textIngredientDetails).should('exist');
      cy.get('[data-cy=modalCloseButton]').click();
      cy.get(modal).should('not.exist');
    });
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
    cy.setUser(); // Установка токенов
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

  it('Проверка оформления заказа', function () {
    cy.fixture('testData').then((data) => {
      // добавление в конструктор ингредиентов
      cy.get(testIngredientBun).contains(data.addButtonText).click();
      cy.get(testIngredientMain).contains(data.addButtonText).click();
      cy.get('[data-cy=ingredient-sauce]').contains(data.addButtonText).click();
      // Нажатие на кнопку оформления заказа и открытие/проверка моального окна заказа
      cy.get('[data-cy=onOrderButton]').click();
      cy.get(modal).should('exist');
      cy.get('[data-cy=order-number]')
        .contains(data.orderNumber)
        .should('exist');
    });
    // Закрытие окна с номером заказа
    cy.get(modalOverlay).click('left', { force: true });
    cy.get(modal).should('not.exist');
    // Проверка что конструктор пуст
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
