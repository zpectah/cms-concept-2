import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';
import {
  Dialog,
  Button,
  PrimaryButton,
  SecondaryButton,
} from '../../../../components';
import { FilesPickerProps } from './types';
import { useFilesPicker } from './useFilesPicker';
import FilesPickerList from './FilesPickerList';

const FilesPicker = forwardRef<HTMLDivElement, FilesPickerProps>(
  (props, ref) => {
    const {
      fileType,
      fileTypes = [],
      value,
      onChange,
      multiple,
      id,
      placeholder,
      ignored = [],
      // required,
      // disabled,
      // error,
    } = props;

    const { t } = useTranslation(['common']);
    const {
      files,
      selectedValue,
      open,
      onOpen,
      onClose,
      onSelect,
      isRowSelected,
      onConfirm,
      onReset,
      onClear,
      // selected,
    } = useFilesPicker({
      fileType,
      fileTypes,
      multiple,
      ignored,
      value,
      onChange: onChange as (value: number | number[]) => void,
    });

    return (
      <>
        <Stack ref={ref} id={id} gap={1}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Button size="small" variant="outlined" onClick={onOpen}>
              {t('button.select')}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="warning"
              disabled={multiple ? value.length === 0 : value === 0}
              onClick={() => {
                onClear();
                if (multiple) {
                  onChange?.([]);
                } else {
                  onChange?.(0);
                }
              }}
            >
              {t('button.clear')}
            </Button>
          </Stack>
          <Stack>
            <FilesPickerList items={selectedValue} />
          </Stack>
        </Stack>
        <Dialog
          open={open}
          onClose={onClose}
          title={placeholder}
          maxWidth="md"
          fullWidth
          scroll="paper"
          actions={
            <>
              <SecondaryButton onClick={onClose}>
                {t('button.cancel')}
              </SecondaryButton>
              <Button variant="outlined" color="warning" onClick={onClear}>
                {t('button.clear')}
              </Button>
              <Button variant="outlined" color="warning" onClick={onReset}>
                {t('button.reset')}
              </Button>
              <PrimaryButton onClick={onConfirm}>
                {t('button.confirm')}
              </PrimaryButton>
            </>
          }
          content={
            <Box>
              <FilesPickerList
                items={files}
                onSelect={onSelect}
                isRowSelected={isRowSelected}
              />
            </Box>
          }
        />
      </>
    );
  }
);

export default FilesPicker;
