import { Menu, IconButton } from '@chakra-ui/react';
import { IconLanguage } from '@tabler/icons-react';
import { getConfig } from '../../config';
import { useLocale } from '../../hooks';

const LocalesMenu = () => {
  const {
    cms: { admin },
    locales,
    multiLocale,
  } = getConfig();

  const { onChange } = useLocale();

  if (!multiLocale) return;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant="outline">
          <IconLanguage />
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {admin.locale.active.map((loc) => (
            <Menu.Item
              key={loc}
              value={loc}
              onClick={() => onChange(loc)}
              css={{ cursor: 'pointer' }}
            >
              {(locales as Record<string, { label: string }>)[loc].label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default LocalesMenu;
