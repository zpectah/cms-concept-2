import { useMemo } from 'react';
import { modelGroups, ModelNames, ModelGroups } from '@model';
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

const accessBase = Object.assign({
  view: false,
  create: false,
  modify: false,
  delete: false,
  deletePermanent: false,
  approve: false,
});

export const useUserActions = (
  model: ModelNames | undefined
): UseUserActionsReturn => {
  const { user } = useProfile();

  const userAccess: number = user.accessRights;

  const permissions = useMemo(() => {
    const base = accessBase;
    const redactor = { ...base, view: true, create: true, modify: true };
    const manager = {
      ...base,
      view: true,
      create: true,
      modify: true,
      delete: true,
      approve: true,
    };
    const admin = {
      ...base,
      view: true,
      create: true,
      modify: true,
      delete: true,
      deletePermanent: true,
      approve: true,
    };

    return {
      redaction:
        userAccess >= 7
          ? admin
          : userAccess >= 5
          ? manager
          : userAccess >= 1
          ? redactor
          : base,
      organization:
        userAccess >= 7
          ? admin
          : userAccess >= 5
          ? manager
          : userAccess >= 1
          ? redactor
          : base,
      feedback: userAccess >= 7 ? admin : userAccess >= 5 ? manager : base,
      entities: userAccess >= 7 ? admin : base,
      system: userAccess >= 9 ? admin : base,
    };
  }, [userAccess]);

  const getGroupNameByModel = (
    name: ModelNames | undefined
  ): ModelGroups | null => {
    if (!name) return null;

    for (const [group, models] of Object.entries(modelGroups)) {
      if ((models as readonly string[]).includes(name))
        return group as ModelGroups;
    }

    return null;
  };

  const activeGroup = getGroupNameByModel(model);
  const currentModelPermissions = activeGroup
    ? permissions[activeGroup]
    : accessBase;

  return {
    model: currentModelPermissions,
    groups: permissions,
  };
};
