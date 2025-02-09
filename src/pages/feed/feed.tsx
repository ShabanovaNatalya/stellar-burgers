import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { loadOrders } from '../../features/product/productSlice';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((store) => store.product.ordersList);

  const handleLoadOrders = () => {
    dispatch(loadOrders());
    console.log(1);
  };

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleLoadOrders} />;
};
