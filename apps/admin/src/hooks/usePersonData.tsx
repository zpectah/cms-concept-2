import { useTranslation } from 'react-i18next';
import { Paper } from '@mui/material';
import { userAccessNamesKeys, usersAccessKeys } from '@model';
import { getConfig } from '../config';

interface PersonBasic {
  firstName?: string;
  lastName?: string;
  email: string;
}

interface PersonBasicWithAvatar extends PersonBasic {
  avatarImage?: string;
  avatarHash?: string;
  size?: string;
  personType: 'user' | 'member';
  thumbnail?: boolean;
}

export const usePersonData = () => {
  const {
    uploads: { source },
  } = getConfig();

  const { t } = useTranslation(['options']);

  const getPersonName = ({
    firstName,
    lastName,
    email,
  }: PersonBasic): string => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }

    const namePart = firstName || lastName;
    if (namePart) {
      return namePart;
    }

    if (email) {
      return email;
    }

    return 'NA';
  };

  const getPersonInitials = ({
    firstName,
    lastName,
    email,
  }: PersonBasic): string => {
    if (firstName && lastName) {
      return (firstName[0] + lastName[0]).toUpperCase();
    }

    const namePart = firstName || lastName;
    if (namePart) {
      return namePart.substring(0, 2).toUpperCase();
    }

    if (email) {
      const [localPart, domainPart] = email.split('@');
      const firstChar = localPart?.[0] || '';
      const secondChar = domainPart?.[0] || '';

      return (firstChar + secondChar).toUpperCase();
    }

    return 'NA';
  };

  const getUserAccessNameByKey = (key?: number) => {
    if (!key) return usersAccessKeys.none;

    const keys = Object.keys(
      usersAccessKeys
    ) as (keyof typeof userAccessNamesKeys)[];

    return keys.find((item) => usersAccessKeys[item] === key);
  };

  const getUserAccessLabelByKey = (key?: number) => {
    if (!key) return t('options:accessRights.none');

    const name = getUserAccessNameByKey(key);

    return t(`options:accessRights.${name}`);
  };

  const renderPersonAvatar = ({
    avatarImage,
    avatarHash,
    personType,
    thumbnail,
    size = '75px',
    ...rest
  }: PersonBasicWithAvatar) => {
    const initials = getPersonInitials({
      ...rest,
    });

    const getContent = () => {
      if (avatarImage && avatarImage !== '') {
        const pathPrefix = `${source}${personType}`;
        const path = `${pathPrefix}${
          thumbnail ? `/thumbnail/` : `/`
        }${avatarImage}${avatarHash !== '' ? `?${avatarHash}` : ''}`;

        return (
          <img
            src={path}
            alt={initials}
            loading="lazy"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        );
      }

      return initials;
    };

    return (
      <Paper
        variant="outlined"
        sx={{
          width: size,
          height: size,
          borderRadius: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {getContent()}
      </Paper>
    );
  };

  return {
    getPersonName,
    getPersonInitials,
    getUserAccessNameByKey,
    getUserAccessLabelByKey,
    renderPersonAvatar,
  };
};
