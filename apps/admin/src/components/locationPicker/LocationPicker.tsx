import { forwardRef } from 'react';
import { styled, Box, Stack, Paper } from '@mui/material';
import { IconCurrentLocation } from '@tabler/icons-react';
import { InputPlus, IconButtonPlus, Dialog, Button } from '../ui';
import { LocationPickerProps } from './types';
import { useLocationPicker } from './useLocationPicker';

import 'mapbox-gl/dist/mapbox-gl.css';

const MainMapContainer = styled('div')(() => ({
  width: '100%',
  height: '100%',
  minHeight: '50vh',
  backgroundColor: 'grey',
}));

const ThumbMapContainer = styled(Paper)(() => ({
  width: '100%',
  height: '250px',
  backgroundColor: 'grey',
  position: 'relative',

  '&::before': {
    content: '""',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
}));

const LocationPicker = forwardRef<HTMLInputElement, LocationPickerProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      isError,
      isFullWidth,
      isDisabled,
      isReadOnly = true,
      isRequired,
      id,
      placeholder,
      inputProps,
      disableThumbMap,
      onMapChange,
      initialThumbZoom,
      styles,
    } = props;

    const {
      center,
      open,
      onOpen,
      onClose,
      refs,
      onReset,
      onSave,
      isEmptyValue,
    } = useLocationPicker({
      value,
      onChange,
      initialThumbZoom,
      onMapChange,
      styles,
    });

    return (
      <>
        <Stack direction="column" gap={2}>
          <Box>
            <InputPlus
              id={id}
              value={JSON.stringify(center.selected)}
              endAdornment={
                <IconButtonPlus onClick={onOpen}>
                  <IconCurrentLocation />
                </IconButtonPlus>
              }
              ref={ref}
              error={isError}
              isReadOnly={isReadOnly}
              required={isRequired}
              disabled={isDisabled}
              fullWidth={isFullWidth}
              placeholder={placeholder}
              {...inputProps}
            />
          </Box>
          {!disableThumbMap && (
            <ThumbMapContainer
              ref={refs.thumb}
              sx={{ display: isEmptyValue ? 'none' : 'block' }}
            />
          )}
        </Stack>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
          fullWidth
          keepMounted
          title="Select location"
          actions={
            <>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outlined" color="warning" onClick={onReset}>
                Reset
              </Button>
              <Button variant="contained" onClick={onSave}>
                Confirm
              </Button>
            </>
          }
        >
          <MainMapContainer id="main-map-container" ref={refs.main} />
        </Dialog>
      </>
    );
  }
);

export default LocationPicker;
