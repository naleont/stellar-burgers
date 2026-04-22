import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/order/actions';
import { feeds } from '../../services/order/slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(feeds);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка загрузки ленты заказов: {error}</div>;
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetFeeds;
      }}
    />
  );
};
