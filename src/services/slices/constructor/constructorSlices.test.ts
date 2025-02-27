import {
  handleAddIngredient,
  handleDeleteIngredient,
  reducer,
  sortIngredients
} from './constructorSlices';

describe('Test constructorSlices', () => {
  test('Тест экшена добавления ингредиента (bun)', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };
    const addIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const newState = reducer(initialState, handleAddIngredient(addIngredient));

    const { bun, ingredients } = newState;

    expect(bun).toEqual({ ...addIngredient, id: expect.any(String) });
    expect(ingredients).toEqual([]);
  }),
    test('Тест экшена добавления ингредиента (ingredients)', () => {
      const addIngredient = {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
      };

      const initialState = {
        bun: null,
        ingredients: []
      };
      const newState = reducer(
        initialState,
        handleAddIngredient(addIngredient)
      );
      const { bun, ingredients } = newState;
      expect(bun).toEqual(null);
      expect(ingredients).toEqual([
        { ...addIngredient, id: expect.any(String) }
      ]);
    }),
    test('Тест   экшена удаления ингредиента', () => {
      const initialState = {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            id: '19568'
          },
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            id: '28452'
          },
          {
            _id: '643d69a5c3f7b9001cfa0945',
            name: 'Соус с шипами Антарианского плоскоходца',
            type: 'sauce',
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-01-large.png',
            id: '33562'
          }
        ]
      };

      const deletedIngredient = {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        id: '33562'
      };

      const newState = reducer(
        initialState,
        handleDeleteIngredient(deletedIngredient)
      );

      const { ingredients } = newState;
      expect(ingredients).toEqual([
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: '19568'
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          id: '28452'
        }
      ]);
    });

  test('Тестэкшена изменения порядка ингредиентов в начинке', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: '19568'
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          id: '28452'
        },
        {
          _id: '643d69a5c3f7b9001cfa0945',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-01-large.png',
          id: '33562'
        }
      ]
    };
    const newState = reducer(initialState, sortIngredients({ from: 1, to: 0 }));

    const { ingredients } = newState;

    expect(ingredients).toEqual([
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '28452'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '19568'
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        id: '33562'
      }
    ]);
  });
});
