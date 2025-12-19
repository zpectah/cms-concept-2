import { useState, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { IconMenu, IconX } from '@tabler/icons-react';
import { useMenuItems } from '../../hooks';
import { IconButtonPlus } from '../ui';

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { pathname } = useLocation();
  const { main } = useMenuItems();

  const open = Boolean(anchorEl);

  const openHandler = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const closeHandler = () => setAnchorEl(null);

  return (
    <>
      <IconButtonPlus
        id="main-menu-button"
        aria-controls={open ? 'main-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openHandler}
        tooltip="Main menu"
      >
        {open ? <IconX /> : <IconMenu />}
      </IconButtonPlus>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        slotProps={{
          list: {
            'aria-labelledby': 'main-menu-button',
          },
        }}
      >
        {main.map((item) => {
          const isActive = pathname.includes(item.path);

          return (
            <MenuItem
              key={item.id}
              onClick={closeHandler}
              selected={isActive}
              component={Link}
              to={item.path}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default MainMenu;
