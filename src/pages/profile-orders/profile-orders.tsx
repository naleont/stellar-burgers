import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feeds } from '../../services/order/slice';
import { getFeeds } from '../../services/order/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  const orders: TOrder[] = useSelector(feeds);

  if (!orders.length) {
    return <ProfileOrdersUI orders={[]} />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
