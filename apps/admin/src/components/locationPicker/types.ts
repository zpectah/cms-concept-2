import { GpsLocation } from '@common';
import { InputProps } from '../ui';
import { FieldBase } from '../fields';

interface LocationPickerBase {
  value: GpsLocation;
  onChange: (value: GpsLocation) => void;
  initialThumbZoom?: number;
  onMapChange?: (center: GpsLocation, zoom: number) => void;
  /** Mapbox styles: https://docs.mapbox.com/api/maps/styles/ */
  styles?: string;
}

type OmittedInputProps =
  | 'fullWidth'
  | 'placeholder'
  | 'error'
  | 'required'
  | 'disabled'
  | 'isReadOnly'
  | 'ref';

export interface LocationPickerProps extends LocationPickerBase {
  disableThumbMap?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  placeholder?: string;
  id?: string;
  inputProps?: Partial<Omit<InputProps, OmittedInputProps>>;
}

export type UseLocationPickerProps = LocationPickerBase;

export interface LocationPickerFieldProps extends FieldBase {
  locationPickerProps?: Partial<LocationPickerProps>;
}
