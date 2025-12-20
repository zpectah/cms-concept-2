import { styled } from '@mui/material';
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
  const { toggleFavoriteItem, isItemFavorite } = useModelFavorites(model);

  const isFavorite = isItemFavorite(id);

  return (
    <IconButtonPlus
      onClick={() => toggleFavoriteItem(id)}
      tooltip="Favorite item"
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
