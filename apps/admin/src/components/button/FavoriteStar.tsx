import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { useModelFavorites } from '../../hooks';
import { IconButtonPlus } from '../ui';
import { FavoriteStarProps } from './types';

const StarIconFilled = styled(IconStarFilled)(({ theme }) => ({
  color: theme.palette.warning.main,
}));
const StarIconEmpty = styled(IconStar)(({ theme }) => ({
  color: theme.palette.grey['500'],
}));

const FavoriteStar = ({
  model,
  id,
  iconButtonProps,
  iconSize = '1.25rem',
}: FavoriteStarProps) => {
  const { t } = useTranslation();
  const { toggleFavoriteItem, isItemFavorite } = useModelFavorites(model);

  const isFavorite = isItemFavorite(id);

  return (
    <IconButtonPlus
      onClick={() => toggleFavoriteItem(id)}
      tooltip={
        isFavorite
          ? t('components:button.removeFavorite')
          : t('components:button.addFavorite')
      }
      size="small"
      {...iconButtonProps}
    >
      {isFavorite ? (
        <StarIconFilled size={iconSize} />
      ) : (
        <StarIconEmpty size={iconSize} />
      )}
    </IconButtonPlus>
  );
};

export default FavoriteStar;
