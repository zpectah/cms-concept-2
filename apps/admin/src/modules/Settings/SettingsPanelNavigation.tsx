import { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Tabs, Tab } from '@mui/material';
import { getConfig } from '../../config';
import { useUserActions } from '../../hooks';

const SettingsPanelNavigation = () => {
  const { routes } = getConfig();

  const [panelIndex, setPanelIndex] = useState(0);

  const { t } = useTranslation(['views']);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { groups } = useUserActions(undefined);

  const tabItems = [
    {
      name: 'global',
      path: `${routes.settings.root}/${routes.settings.panels.global}`,
      label: t('views:settings.panels.global'),
      visible: groups.organization.view,
    },
    {
      name: 'client',
      path: `${routes.settings.root}/${routes.settings.panels.client}`,
      label: t('views:settings.panels.client'),
      visible: groups.system.view,
    },
    {
      name: 'languages',
      path: `${routes.settings.root}/${routes.settings.panels.languages}`,
      label: t('views:settings.panels.languages'),
      visible: groups.system.view,
    },
    {
      name: 'blacklist',
      path: `${routes.settings.root}/${routes.settings.panels.blacklist}`,
      label: t('views:settings.panels.blacklist'),
      visible: groups.system.view,
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
