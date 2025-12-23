import {
  createButton,
  Toolbar,
  Separator,
  useEditorState,
} from 'react-simple-wysiwyg';
import {
  IconArrowBackUp,
  IconArrowForward,
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconListNumbers,
  IconList,
  IconLink,
  IconLinkOff,
  IconCode,
  IconCodeOff,
  IconClearFormatting,
} from '@tabler/icons-react';

// In case of missing translations for button captions, redesign all buttons similar to 'ButtonHtml' and create events via 'document.execCommand()'

const fontSize = '1.25rem';

const ButtonUndo = createButton(
  'Undo',
  <IconArrowBackUp size={fontSize} />,
  'undo'
);
const ButtonRedo = createButton(
  'Redo',
  <IconArrowForward size={fontSize} />,
  'redo'
);
const ButtonBold = createButton('Bold', <IconBold size={fontSize} />, 'bold');
const ButtonItalic = createButton(
  'Italic',
  <IconItalic size={fontSize} />,
  'italic'
);
const ButtonUnderline = createButton(
  'Underline',
  <IconUnderline size={fontSize} />,
  'underline'
);
const ButtonStrikeThrough = createButton(
  'strikeThrough',
  <IconStrikethrough size={fontSize} />,
  'strikeThrough'
);
const ButtonNumberedList = createButton(
  'orderedList',
  <IconListNumbers size={fontSize} />,
  'insertOrderedList'
);
const ButtonBulletList = createButton(
  'bulletList',
  <IconList size={fontSize} />,
  'insertUnorderedList'
);
const ButtonLink = createButton('Link', <IconLink size={fontSize} />, () => {
  document.execCommand('createLink', false, prompt('URL', '') || undefined);
});
const ButtonUnLink = createButton(
  'Unlink',
  <IconLinkOff size={fontSize} />,
  'unlink'
);
const ButtonClearFormatting = createButton(
  'Remove format',
  <IconClearFormatting size={fontSize} />,
  'removeFormat'
);
const ButtonHtml = ({ ...rest }) => {
  const editorState = useEditorState();

  const clickHandler = () => {
    editorState.update({
      htmlMode: !editorState.htmlMode,
    });
  };

  return (
    <button
      className="rsw-btn"
      data-active={editorState.htmlMode}
      onClick={clickHandler}
      tabIndex={-1}
      title="HTML code"
      type="button"
      {...rest}
    >
      {editorState.htmlMode ? (
        <IconCodeOff size={fontSize} />
      ) : (
        <IconCode size={fontSize} />
      )}
    </button>
  );
};

const WysiwygToolbar = () => (
  <Toolbar>
    <ButtonBold />
    <ButtonItalic />
    <ButtonUnderline />
    <ButtonStrikeThrough />
    <Separator />
    <ButtonNumberedList />
    <ButtonBulletList />
    <Separator />
    <ButtonLink />
    <ButtonUnLink />
    <Separator />
    <ButtonClearFormatting />
    <Separator />
    <ButtonUndo />
    <ButtonRedo />
    <Separator />
    <ButtonHtml />
    <Separator />
  </Toolbar>
);

export default WysiwygToolbar;
