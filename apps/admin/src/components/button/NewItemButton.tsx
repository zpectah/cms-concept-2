import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Menu, MenuItem } from '@mui/material';
import { IconDots } from '@tabler/icons-react';
import { Button, LinkButton } from '../ui';
import { useNewItem } from '../../hooks';
import { NewItemButtonProps } from './types';

const NewItemButton = ({ model }: NewItemButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { current, options } = useNewItem({ current: model });

  const open = Boolean(anchorEl);

  const openHandler = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const closeHandler = () => setAnchorEl(null);

  const linkHandler = (path: string) => {
    navigate(path);
    closeHandler();
  };

  return (
    <ButtonGroup color="success" variant="contained">
      {current && <LinkButton to={current.path}>{current.label}</LinkButton>}
      {options.length > 0 && (
        <>
          <Button
            id="new-item-button"
            aria-controls={open ? 'new-item-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={openHandler}
            size="small"
          >
            <IconDots size="1rem" />
          </Button>
          <Menu
            id="new-item-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={closeHandler}
            slotProps={{
              list: {
                'aria-labelledby': 'new-item-button',
              },
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {options.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => linkHandler(item.path)}
                disabled={item?.disabled}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </ButtonGroup>
  );
};

export default NewItemButton;
