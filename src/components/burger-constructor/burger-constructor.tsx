import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorActions,
  constructorSlice,
  requestOrderState,
  selectedIngredients
} from '../../services/burger-constructor/slice';
import { postOrder } from '../../services/burger-constructor/actions';
import { useNavigate } from 'react-router-dom';
import { order } from '../../services/order/slice';

export const BurgerConstructor: FC = () => {
  const items = useSelector(selectedIngredients);
  const bun = items.find((element) => element.type === 'bun');
  const constructorItems = {
    bun: bun,
    ingredients: items.filter((element) => element._id !== bun?._id)
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRequest = useSelector(requestOrderState);

  //   const orderModalData = useSelector({{
  //     _id: string;
  //     status: string;
  //     name: string;
  //     createdAt: string;
  //     updatedAt: string;
  //     number: number;
  //     ingredients: string[];
  // }}) || null;

  const orderModalData = null;

  const onOrderClick = () => {
    if (items && bun && constructorItems.ingredients.length > 0) {
      dispatch(constructorActions.requestToggle(true));
      dispatch(postOrder(items.map((item) => item._id)));
      const orderModalData = useSelector(order);
    }
    // if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s: number, v) => s + v.price, 0),
    [constructorItems]
  );
  console.log(orderRequest);

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
