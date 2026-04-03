import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorActions,
  currentOrder,
  requestOrderState,
  selectedIngredients
} from '../../services/burger-constructor/slice';
import { postOrder } from '../../services/burger-constructor/actions';
import { useNavigate } from 'react-router-dom';
import { isTokenExists } from '../../utils/burger-api';

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

  const orderModalData = useSelector(currentOrder) || null;

  const onOrderClick = () => {
    if (!isTokenExists()) {
      navigate('/login', { replace: true });
    }
    if (items && bun && constructorItems.ingredients.length > 0) {
      dispatch(constructorActions.requestToggle(true));
      dispatch(postOrder(items.map((item) => item._id)));
    }
  };

  const closeOrderModal = () => {
    dispatch(constructorActions.setCurrentOrder(null));
    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s: number, v) => s + v.price, 0),
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
