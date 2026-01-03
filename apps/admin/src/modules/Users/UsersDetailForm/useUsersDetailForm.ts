import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, usersAccessKeys, UsersDetail } from '@model';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { getOptionValue } from '../../../helpers';
import { IUsersDetailForm } from './types';
import { usersDetailFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';
import {
  useProfile,
  useResponseMessage,
  useSelectOptions,
} from '../../../hooks';
import { useUsersQuery } from '../../../query';
import { OptionItem } from '../../../components';

export const useUsersDetailForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { user } = useProfile();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions } = useSelectOptions();
  const form = useForm<IUsersDetailForm>({
    resolver: zodResolver(usersDetailFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const {
    usersQuery,
    usersDetailQuery,
    usersCreateMutation,
    usersPatchMutation,
    usersDeleteMutation,
  } = useUsersQuery({ id });

  const { refetch } = usersQuery;
  const { data: detail } = usersDetailQuery;
  const { mutate: onCreate } = usersCreateMutation;
  const { mutate: onPatch } = usersPatchMutation;
  const { mutate: onDelete } = usersDeleteMutation;

  const getAccessRightsFieldOptions = () => {
    const keys = Object.keys(usersAccessKeys);
    const tmpItems: OptionItem[] = [];

    keys.forEach((item) => {
      const value = (usersAccessKeys as Record<string, number>)[item];
      tmpItems.push({
        id: String(item),
        value,
        label: getOptionValue(String(item), 'accessRights'),
        disabled: value > user.access_rights,
      });
    });

    return tmpItems;
  };

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm());
  };

  const createHandler = (master: UsersDetail) => {
    onCreate(master, {
      onSuccess: ({ id }) => {
        closeHandler();
        addToast({
          title: t('message.success.create', { count: id ? 1 : 0 }),
          severity: 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const patchHandler = (master: UsersDetail) => {
    onPatch(master, {
      onSuccess: ({ rows }) => {
        closeHandler();
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const submitHandler = (data: IUsersDetailForm) => {
    if (!data) return;

    // TODO: unique validation

    const master = formDataToMaster(data);

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  const deleteHandler = (id: number) => {
    if (!id) return;

    const master = [Number(id)];

    onDelete(master, {
      onSuccess: ({ rows }) => {
        closeHandler();
        addToast({
          title: t('message.success.delete', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const avatarUpdateHandler = (filename: string) => {
    form.setValue('avatar_image', filename);

    addToast({
      title: t('message.info.avatar_updated'),
      severity: 'info',
      autoclose: true,
    });
  };

  const drawerTitle = useMemo(() => {
    return id === 'new' ? t('views:users.new') : detail?.email;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  const resetHandler = useCallback(() => {
    if (id === 'new') {
      form.reset(defaultDataToForm());
    } else if (detail) {
      form.reset(detailDataToForm(detail));
    }
  }, [id, detail, form]);

  useEffect(() => {
    if (id || detail) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  return {
    id,
    form,
    title: drawerTitle,
    // Actions
    onSubmit: submitHandler,
    onClose: closeHandler,
    onReset: resetHandler,
    onDelete: deleteHandler,
    onAvatarUpdate: avatarUpdateHandler,
    // Options
    options: {
      type: getTypeFieldOptions(modelKeys.users),
      accessRights: getAccessRightsFieldOptions(),
    },
    // Live values
    uid: form.watch('uid'),
    avatarImage: form.getValues('avatar_image'),
  };
};
