import { Link } from 'react-router-dom';
import { Menu, IconButton } from '@chakra-ui/react';
import { IconMenu } from '@tabler/icons-react';
import { useMenuItems } from '../../hooks';

const MainMenu = () => {
  const { primary } = useMenuItems();

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant="outline" size="sm">
          <IconMenu />
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {primary.map((item) => {
            return (
              <Menu.Item
                key={item.id}
                value={item.path}
                asChild
                css={{ cursor: 'pointer' }}
              >
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default MainMenu;
