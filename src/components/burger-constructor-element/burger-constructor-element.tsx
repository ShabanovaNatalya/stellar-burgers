import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  handleDeleteIngredient,
  sortIngredients
} from '../../services/slices/constructor/constructorSlices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(sortIngredients({ from: index, to: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(sortIngredients({ from: index, to: index - 1 }));
    };

    const handleClose = () => {
      dispatch(handleDeleteIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
