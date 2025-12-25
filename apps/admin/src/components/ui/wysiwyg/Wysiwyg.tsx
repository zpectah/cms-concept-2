import { useEffect, useState, forwardRef, useMemo } from 'react';
import Editor, {
  EditorProvider,
  ContentEditableEvent,
} from 'react-simple-wysiwyg';
import { styled, Stack } from '@mui/material';
import { Textarea } from '../input';
import { WysiwygProps } from './types';
import WysiwygToolbar from './WysiwygToolbar';

const FieldWrapper = styled(Stack, {
  shouldForwardProp: (propName) => propName !== 'isError',
})<{ readonly isError?: boolean }>(({ theme, isError }) => ({
  '& .rsw-editor': {
    border: 0,
    borderRadius: 0,
  },
  '& .rsw-toolbar': {
    background: 'none',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey['700']
        : theme.palette.grey['400'],
    borderRadius: theme.shape.borderRadius,
    borderBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    '.rsw-btn': {
      color: theme.palette.text.primary,
      lineHeight: 1,

      '&:hover': {
        background: theme.palette.background.paper,
      },

      '&[data-active="true"]': {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
      },
    },
    '.rsw-separator': {
      marginLeft: 0,
      marginRight: 0,
      borderColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey['700']
          : theme.palette.grey['400'],
    },
    '.rsw-dd': {},
  },
  '& .rsw-ce': {
    // marginTop: theme.spacing(0.5),
    minHeight: '250px',
    padding: theme.spacing(1.5),
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: isError
      ? theme.palette.error.main
      : theme.palette.mode === 'dark'
      ? theme.palette.grey['700']
      : theme.palette.grey['400'],
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: '1px',
    color: theme.palette.text.primary,
    fontFamily: '"JetBrains Mono Variable", monospace',

    '&.rsw-html': {},
  },
}));

const Wysiwyg = forwardRef<HTMLInputElement, WysiwygProps>((props, ref) => {
  const {
    id,
    value,
    onChange,
    name,
    isError,
    disabled,
    required,
    readOnly,
    placeholder,
  } = props;

  const [html, setHtml] = useState<string>(value ?? '');
  const [focused, setFocused] = useState(false);

  const wrapperClassName = useMemo(() => {
    const classNames: string[] = [];

    if (focused) classNames.push('is-focused');
    if (isError) classNames.push('is-error');

    return classNames.join(' ');
  }, [focused, isError]);

  const changeHandler = (event: ContentEditableEvent) => {
    const newValue = event.target.value;

    setHtml(newValue);

    onChange?.(newValue, event);
  };
  const focusHandler = () => setFocused(true);
  const blurHandler = () => setFocused(false);

  useEffect(() => setHtml(value ?? ''), [value]);

  if (readOnly) {
    return (
      <Textarea
        id={id}
        name={name}
        value={html}
        ref={ref}
        disabled={disabled}
        rows={5}
        slotProps={{ input: { readOnly: true } }}
        placeholder={placeholder}
      />
    );
  }

  return (
    <EditorProvider>
      <FieldWrapper className={wrapperClassName} isError={isError}>
        <Editor
          id={id}
          name={name}
          value={html}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          containerProps={{
            style: { resize: 'vertical', borderColor: 'red' },
            'aria-required': required,
            'aria-disabled': disabled,
          }}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
        >
          <WysiwygToolbar />
        </Editor>
      </FieldWrapper>
    </EditorProvider>
  );
});

export default Wysiwyg;
