export const classNames = (
  ...args: Array<string | string[] | undefined | null | false>
): string => args.flat().filter(Boolean).join(' ').trim();

export const setDocumentMeta = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  if (title) document.title = title;
  if (description) {
    const descriptionElement = document.querySelector(
      "meta[name='description']"
    ) as HTMLElement;

    descriptionElement.setAttribute('content', description);
  }
};
