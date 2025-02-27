import {
  http, // модуль для мокирования сетевых запросов
  HttpResponse // класс ответа на запрос
} from 'msw';

const URL = 'localhost:8080';

export const handlers = [
  http.get(`${URL}/ingredients`, () => {
    return HttpResponse.json({
      success: true,
      data: [
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
          __v: 0
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
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093f',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0944',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-03-large.png',
          __v: 0
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
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0947',
          name: 'Плоды Фалленианского дерева',
          type: 'main',
          proteins: 20,
          fat: 5,
          carbohydrates: 55,
          calories: 77,
          price: 874,
          image: 'https://code.s3.yandex.net/react/code/sp_1.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0948',
          name: 'Кристаллы марсианских альфа-сахаридов',
          type: 'main',
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0949',
          name: 'Мини-салат Экзо-Плантаго',
          type: 'main',
          proteins: 1,
          fat: 2,
          carbohydrates: 3,
          calories: 6,
          price: 4400,
          image: 'https://code.s3.yandex.net/react/code/salad.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/salad-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa094a',
          name: 'Сыр с астероидной плесенью',
          type: 'main',
          proteins: 84,
          fat: 48,
          carbohydrates: 420,
          calories: 3377,
          price: 4142,
          image: 'https://code.s3.yandex.net/react/code/cheese.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/cheese-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
          __v: 0
        }
      ]
    });
  }),
  http.get(`${URL}/auth/user`, () => {
    return HttpResponse.json({
      success: true,
      user: { email: 'test@mail.ru', name: 'Test' }
    });
  }),
  http.get(`${URL}/auth/login`, () => {
    return HttpResponse.json({
      success: true,
      accessToken:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTg5OTVjMTMzYWNkMDAxYmU0ZmIwMCIsImlhdCI6MTc0MDMzODU1OCwiZXhwIjoxNzQwMzM5NzU4fQ.WiffTBZFkDD_drkjBTglMDePCpTm4OHALrXqGkyWBZs',
      refreshToken:
        '479c628d0601d24757469d9135aa98a3c060226964c9552fffa5e92179c427f34c082706cffd3251',
      user: {
        email: 'test1@mail.ru',
        name: 'Test'
      }
    });
  }),
  http.get(`${URL}/orders/all`, () => {
    return HttpResponse.json({
      success: true,
      name: 'Test',
      order: {
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0
          }
        ],
        _id: '67bb7512133acd001be53540',
        owner: {
          name: 'Natalya',
          email: 'tashka131@mail.ru',
          createdAt: '2025-02-09T12:02:36.543Z',
          updatedAt: '2025-02-15T13:13:16.478Z'
        },
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-02-23T19:20:50.930Z',
        updatedAt: '2025-02-23T19:20:51.535Z',
        number: 69289,
        price: 2964
      }
    });
  }),
  http.get(`${URL}/orders/all`, () => {
    return HttpResponse.json({
      success: true,
      orders: [
        {
          _id: '67bdfe2f133acd001be53af3',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa094a',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Астероидный фалленианский краторный экзо-плантаго люминесцентный метеоритный бургер',
          createdAt: '2025-02-25T17:30:23.703Z',
          updatedAt: '2025-02-25T17:30:24.455Z',
          number: 69421
        },
        {
          _id: '67bde8ab133acd001be53acc',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Space краторный минеральный экзо-плантаго люминесцентный бургер',
          createdAt: '2025-02-25T15:58:35.444Z',
          updatedAt: '2025-02-25T15:58:36.045Z',
          number: 69420
        }
      ]
    });
  })
];
