import { ContentEditableEvent } from 'react-simple-wysiwyg';

// https://www.npmjs.com/package/react-simple-wysiwyg

export interface WysiwygProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string, event: ContentEditableEvent) => void;
  isError?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}
