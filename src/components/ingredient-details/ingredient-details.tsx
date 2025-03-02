import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientList } from '../../features/product/productSlice';
import { useMatch } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientId = useMatch('/ingredients/:id')?.params.id;

  const ingredientData = useSelector(getIngredientList).find(
    (item: TIngredient) => {
      if (item._id === ingredientId) {
        return item;
      }
    }
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
