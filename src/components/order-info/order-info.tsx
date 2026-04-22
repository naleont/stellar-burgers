import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { order, orderActions } from '../../services/order/slice';
import { useParams } from 'react-router-dom';
import { ingredients as ingredientsSelector } from '../../services/ingredients/slice';
import { getOrderByNumber } from '../../services/order/actions';

export const OrderInfo: FC = () => {
  const params = useParams();
  const orderId = params.number;
  const dispatch = useDispatch();

  const orderData = useSelector(order);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);
  const ingredients = useSelector(ingredientsSelector);

  useEffect(() => {
    dispatch(getOrderByNumber(Number(orderId)));
  }, []);

  const orderIngredients = useMemo(() => {
    if (!orderData || !ingredients.length) return [];
    return ingredients.filter((element) =>
      orderData.ingredients.includes(element._id)
    );
  }, [orderData, ingredients]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !orderIngredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = orderIngredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, orderIngredients]);

  if (!orderId) {
    return <Preloader />;
  }

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка загрузки заказа: {error}</div>;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
