import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  currentIngredient,
  burgerActions
} from '../../services/ingredients/slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientId = params.id;

  if (!ingredientId) {
    return <Preloader />;
  }
  const dispatch = useDispatch();
  dispatch(burgerActions.selectIngredient(ingredientId));
  const ingredientData = useSelector(currentIngredient);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
