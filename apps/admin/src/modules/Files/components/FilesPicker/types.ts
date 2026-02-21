import { FilesItem } from '@model';
import { FieldBase } from '../../../../components';

interface SingleFilesPicker {
  multiple?: false;
  value: number;
  onChange: (value: number) => void;
}

interface MultipleFilesPicker {
  multiple: true;
  value: number[];
  onChange: (value: number[]) => void;
}

type FilesPickerBase = SingleFilesPicker | MultipleFilesPicker;

export type FilesPickerFileType =
  | 'image'
  | 'audio'
  | 'video'
  | 'document'
  | 'archive';
type FilesPickerFileTypes = FilesPickerFileType[];

export type FilesPickerProps = FilesPickerBase & {
  id: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  ignored?: number[];
  fileType?: FilesPickerFileType;
  fileTypes?: FilesPickerFileTypes;
};

export interface FilesPickerFieldProps
  extends Omit<FieldBase, 'isReadOnly' | 'isFullWidth'> {
  filesPickerProps?: Partial<
    Omit<FilesPickerProps, 'multiple' | 'fileTypes' | 'fileType' | 'ignored'>
  >;
  isMultiple?: boolean;
  ignored?: number[];
  fileType?: FilesPickerFileType;
  fileTypes?: FilesPickerFileTypes;
}

export interface UseFilesPickerProps {
  fileType?: FilesPickerFileType;
  fileTypes?: FilesPickerFileTypes;
  multiple?: boolean;
  ignored?: number[];
  value: number | number[];
  onChange: (value: number | number[]) => void;
}

export interface FilesPickerListProps {
  items: FilesItem[];
  onSelect?: (id: number) => void;
  isRowSelected?: (id: number) => void;
}
