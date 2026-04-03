import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { order, orderActions } from '../../services/order/slice';
import { useParams } from 'react-router-dom';
import { ingredients as ingredientsSelector } from '../../services/ingredients/slice';

export const OrderInfo: FC = () => {
  const params = useParams();
  const orderId = params.number;
  if (!orderId) {
    return <Preloader />;
  }
  const dispatch = useDispatch();
  dispatch(orderActions.selectOrder(orderId));
  const orderData = useSelector(order);
  if (!orderData) {
    return <Preloader />;
  }
  const ingredients = useSelector(ingredientsSelector).filter((element) =>
    orderData.ingredients.includes(element._id)
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
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
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
