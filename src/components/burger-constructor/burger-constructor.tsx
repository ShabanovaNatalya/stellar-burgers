import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getIsBurger } from '../../services/slices/constructor/constructorSlices';
import {
  handleCloseOrderModal,
  orderBurger
} from '../../services/slices/order/orderSlices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getIsBurger);
  const orderRequest = useSelector((store) => store.order.orderRequest);
  const orderModalData = useSelector((store) => store.order.orderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (item: TConstructorIngredient) => item._id
        ),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(handleCloseOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
