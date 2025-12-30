import { useMemo } from 'react';
import { modelGroups, usersAccessKeys, ModelNames, ModelGroups } from '@model';
import { ModelActions } from '../types';
import { useProfile } from './useProfile';

interface UseUserActionsReturn {
  model: ModelActions;
  groups: {
    redaction: ModelActions;
    organization: ModelActions;
    feedback: ModelActions;
    entities: ModelActions;
    system: ModelActions;
  };
}

const emptyActions: ModelActions = {
  view: false,
  create: false,
  modify: false,
  delete: false,
  deletePermanent: false,
  approve: false,
};

const buildActions = (access: number): ModelActions => {
  if (access >= usersAccessKeys.admin) {
    return {
      view: true,
      create: true,
      modify: true,
      delete: true,
      deletePermanent: true,
      approve: true,
    };
  }

  if (access >= usersAccessKeys.manager) {
    return {
      view: true,
      create: true,
      modify: true,
      delete: true,
      deletePermanent: false,
      approve: true,
    };
  }

  if (access >= usersAccessKeys.redactor) {
    return {
      view: true,
      create: true,
      modify: true,
      delete: false,
      deletePermanent: false,
      approve: false,
    };
  }

  return emptyActions;
};

const groupAccessLevel: Record<ModelGroups, number> = {
  redaction: usersAccessKeys.redactor,
  organization: usersAccessKeys.manager,
  feedback: usersAccessKeys.manager,
  entities: usersAccessKeys.admin,
  system: usersAccessKeys.admin,
};

export const useUserActions = (model?: ModelNames): UseUserActionsReturn => {
  const { user } = useProfile();
  const userAccess = user.accessRights;

  const permissions = useMemo(() => {
    const result = {} as UseUserActionsReturn['groups'];

    (Object.keys(groupAccessLevel) as ModelGroups[]).forEach((group) => {
      const requiredAccess = groupAccessLevel[group];

      result[group] =
        userAccess >= requiredAccess ? buildActions(userAccess) : emptyActions;
    });

    return result;
  }, [userAccess]);

  const getGroupNameByModel = (name?: ModelNames): ModelGroups | null => {
    if (!name) return null;

    for (const [group, models] of Object.entries(modelGroups)) {
      if ((models as readonly string[]).includes(name)) {
        return group as ModelGroups;
      }
    }

    return null;
  };

  const activeGroup = getGroupNameByModel(model);

  return {
    model: activeGroup ? permissions[activeGroup] : emptyActions,
    groups: permissions,
  };
};
