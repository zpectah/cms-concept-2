import { useState, MouseEvent } from 'react';
import { Menu, MenuItem } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import CloseIcon from '@mui/icons-material/Close';
import { getConfig } from '../../config';
import { useLocale, useMenuItems } from '../../hooks';
import { IconButtonPlus } from '../ui';

const LocaleMenu = () => {
  const { multiLocale } = getConfig();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { locale } = useMenuItems();
  const { onChange } = useLocale();

  const open = Boolean(anchorEl);

  const openHandler = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const closeHandler = () => setAnchorEl(null);

  const selectHandler = (locale: string) => {
    onChange(locale);
    closeHandler();
  };

  if (!multiLocale) return;

  return (
    <>
      <IconButtonPlus
        id="locale-menu-button"
        aria-controls={open ? 'locale-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openHandler}
        tooltip="Locale menu"
      >
        {open ? (
          <CloseIcon color="inherit" />
        ) : (
          <TranslateIcon color="inherit" />
        )}
      </IconButtonPlus>
      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        slotProps={{
          list: {
            'aria-labelledby': 'locale-menu-button',
          },
        }}
      >
        {locale.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => selectHandler(item.id)}
            selected={item.isActive}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LocaleMenu;
