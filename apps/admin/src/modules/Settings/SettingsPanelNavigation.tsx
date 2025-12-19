import { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import { getConfig } from '../../config';

const SettingsPanelNavigation = () => {
  const { routes } = getConfig();

  const [panelIndex, setPanelIndex] = useState(0);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabItems = [
    {
      name: 'global',
      path: `${routes.settings.root}/${routes.settings.panels.global}`,
      label: 'global', // TODO
      visible: true, // TODO
    },
    {
      name: 'client',
      path: `${routes.settings.root}/${routes.settings.panels.client}`,
      label: 'client', // TODO
      visible: true, // TODO
    },
    {
      name: 'languages',
      path: `${routes.settings.root}/${routes.settings.panels.locales}`,
      label: 'languages', // TODO
      visible: true, // TODO
    },
    {
      name: 'blacklist',
      path: `${routes.settings.root}/${routes.settings.panels.blacklist}`,
      label: 'blacklist', // TODO
      visible: true, // TODO
    },
  ];

  const changePanelHandler = (event: SyntheticEvent, value: number) => {
    const panel = tabItems[value];
    const path = panel.path;

    navigate(path);
  };

  useEffect(() => {
    if (pathname) {
      const index = tabItems.findIndex((item) => item.path === pathname);

      if (index > -1) setPanelIndex(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        aria-label="settings panel navigation"
        onChange={changePanelHandler}
        value={panelIndex}
        slotProps={{
          indicator: { style: { transition: 'none' } },
        }}
      >
        {tabItems.map(
          ({ name, label, visible }, index) =>
            visible && <Tab key={name} label={label} />
        )}
      </Tabs>
    </Box>
  );
};

export default SettingsPanelNavigation;
