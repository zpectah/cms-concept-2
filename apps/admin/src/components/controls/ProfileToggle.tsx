import { useAppStore } from '../../store';
import { usePersonData, useProfile } from '../../hooks';
import { IconButtonPlus } from '../ui';

const ProfileToggle = () => {
  const { setProfileDialog } = useAppStore();
  const { user } = useProfile();
  const { renderPersonAvatar, getPersonName } = usePersonData();

  return (
    <IconButtonPlus
      tooltip={getPersonName({
        firstName: user?.first_name,
        lastName: user?.last_name,
        email: user?.email ?? '',
      })}
      onClick={() => setProfileDialog(true)}
    >
      {renderPersonAvatar({
        firstName: user?.first_name,
        lastName: user?.last_name,
        email: user?.email ?? '',
        avatarImage: user?.avatar_image,
        avatarHash: user?.avatar_hash,
        personType: 'user',
        thumbnail: true,
        size: '35px',
      })}
    </IconButtonPlus>
  );
};

export default ProfileToggle;
