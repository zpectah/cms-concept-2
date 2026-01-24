import { forwardRef, useMemo } from 'react';
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { useMenuItemsQuery } from '../../../../query';
import { MenuItemsPickerProps } from './types';

const MenuItemsPicker = forwardRef<HTMLInputElement, MenuItemsPickerProps>(
  (props, ref) => {
    const { value, multiple, ignored = [], menuId, ...rest } = props;

    const { menuItemsQuery } = useMenuItemsQuery({ menuId });

    const { data: menuItems } = menuItemsQuery;

    const options = useMemo(() => {
      const rows = [];
      const filtered = (menuItems ?? []).filter((item) => !item.deleted);

      if (!multiple)
        rows.push({
          id: '0',
          value: 0,
          label: 'Not selected',
        });

      filtered.forEach((item) => {
        if (ignored.includes(item.id)) return;

        rows.push({
          id: item.id,
          value: item.id,
          label: item.name,
        });
      });

      return rows;
    }, [menuItems, ignored, multiple]);

    return (
      <Select
        ref={ref}
        multiple={multiple}
        value={value}
        renderValue={(selected) => {
          if (multiple && Array.isArray(selected)) {
            return selected
              .map(
                (val) => options.find((opt) => opt.value === val)?.label || val
              )
              .join(',');
          }

          const selectedOption = options.find((opt) => opt.value === selected);
          return selectedOption ? <>{selectedOption.label}</> : <>{selected}</>;
        }}
        {...rest}
      >
        {options.map((item) => {
          const isChecked = multiple
            ? (value as (number | string)[])?.includes(item.value)
            : value === item.value;
          // const isCheckedAlt = item.value === 0 && !value;

          return (
            <MenuItem key={item.id} value={item.value}>
              <Checkbox checked={isChecked} />
              <ListItemText primary={item.label} />
            </MenuItem>
          );
        })}
      </Select>
    );
  }
);

export default MenuItemsPicker;
