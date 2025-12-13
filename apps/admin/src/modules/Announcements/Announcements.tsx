import { Stack, Alert } from '@mui/material';
import { useAppStore } from '../../store';
import { AnnouncementsItem as CommonAnnouncementsItem } from '../../types';

interface AnnouncementsItemProps extends CommonAnnouncementsItem {
  onClose: (id: string) => void;
}

const AnnouncementsItem = ({
  onClose,
  id,
  severity,
  title,
}: AnnouncementsItemProps) => (
  <Alert
    id={id}
    severity={severity}
    onClose={() => onClose(id)}
    sx={{ borderRadius: 0, alignItems: 'center', justifyContent: 'center' }}
    slotProps={{
      message: { sx: { alignItems: 'center' } },
      action: { sx: { marginLeft: 0 } },
    }}
  >
    {title}
  </Alert>
);

const Announcements = () => {
  const { announcements, removeAnnouncement } = useAppStore();

  return (
    <Stack id="announcements" direction="column" gap={0} sx={{ width: '100%' }}>
      {announcements.map((item) => (
        <AnnouncementsItem
          key={item.id}
          onClose={() => removeAnnouncement(item.id)}
          {...item}
        />
      ))}
    </Stack>
  );
};

export default Announcements;
