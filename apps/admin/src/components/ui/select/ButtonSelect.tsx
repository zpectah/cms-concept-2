import { forwardRef, useState, MouseEvent } from 'react';
import { styled, Stack, Menu, MenuItem } from '@mui/material';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { Button } from '../button';
import { ButtonSelectProps } from './types';

const SelectWrapper = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  flexDirection: 'row',
  gap: theme.spacing(1),
}));

const ButtonSelect = forwardRef<HTMLButtonElement, ButtonSelectProps>(
  (props, ref) => {
    const {
      label,
      id = 'button-select',
      value,
      defaultValue,
      onChange,
      options = [],
      buttonProps,
    } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const icon = open ? (
      <IconChevronUp size="1rem" />
    ) : (
      <IconChevronDown size="1rem" />
    );

    const openHandler = (event: MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget);

    const closeHandler = () => setAnchorEl(null);

    const changeHandler = (value: string | number) => {
      onChange?.(value);
      closeHandler();
    };

    return (
      <SelectWrapper>
        <Button
          id={id}
          aria-controls={open ? `${id}-menu` : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={openHandler}
          value={defaultValue ?? value}
          ref={ref}
          endIcon={icon}
          {...buttonProps}
        >
          {(defaultValue || value) ?? label}
        </Button>
        <Menu
          id={`${id}-menu`}
          anchorEl={anchorEl}
          open={open}
          onClose={closeHandler}
          slotProps={{
            list: {
              'aria-labelledby': id,
            },
          }}
        >
          {options.map(({ label, ...option }) => {
            const itemIsSelected = option.value === (defaultValue ?? value);

            if (option.hidden) return null;

            return (
              <MenuItem
                key={option.id}
                onClick={() => changeHandler(option.value)}
                selected={itemIsSelected}
                {...option}
              >
                {label}
              </MenuItem>
            );
          })}
        </Menu>
      </SelectWrapper>
    );
  }
);

export default ButtonSelect;
