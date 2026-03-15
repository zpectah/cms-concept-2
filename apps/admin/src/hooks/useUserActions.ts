import { useMemo } from 'react';
import {
  usersAccessKeys,
  redactionModelKeysArray,
  organizationModelKeysArray,
  entitiesModelKeysArray,
  feedbackModelKeysArray,
  systemModelKeysArray,
  ModelNames,
  ModelGroups,
} from '@model';
import { ModelActions } from '../types';
import { useProfile } from './useProfile';

const modelToGroupMap: Record<string, ModelGroups> = {
  ...Object.fromEntries(redactionModelKeysArray.map((m) => [m, 'redaction'])),
  ...Object.fromEntries(
    organizationModelKeysArray.map((m) => [m, 'organization'])
  ),
  ...Object.fromEntries(entitiesModelKeysArray.map((m) => [m, 'entities'])),
  ...Object.fromEntries(feedbackModelKeysArray.map((m) => [m, 'feedback'])),
  ...Object.fromEntries(systemModelKeysArray.map((m) => [m, 'system'])),
};

const getGroupByModel = (model?: ModelNames): ModelGroups | null => {
  if (!model) return null;
  return (modelToGroupMap[model] as ModelGroups) || null;
};

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
  entities: usersAccessKeys.manager,
  system: usersAccessKeys.admin,
};

interface UseUserActionsReturn {
  model: ModelActions;
  groups: Record<ModelGroups, ModelActions>;
  modelGroup: ModelGroups | null;
  getGroupByModel: (model?: ModelNames) => ModelGroups | null;
  isLoaded: boolean;
}

export const useUserActions = (model?: ModelNames): UseUserActionsReturn => {
  const { user, isLoaded } = useProfile();
  const userAccess = user?.access_rights ?? 0;

  const groupsPermissions = useMemo(() => {
    const result = {} as Record<ModelGroups, ModelActions>;

    (Object.keys(groupAccessLevel) as ModelGroups[]).forEach((group) => {
      const requiredAccess = groupAccessLevel[group];
      result[group] =
        userAccess >= requiredAccess ? buildActions(userAccess) : emptyActions;
    });

    return result;
  }, [userAccess]);

  const activeGroupName = useMemo(() => getGroupByModel(model), [model]);

  return {
    model: activeGroupName ? groupsPermissions[activeGroupName] : emptyActions,
    groups: groupsPermissions,
    modelGroup: activeGroupName,
    getGroupByModel,
    isLoaded,
  };
};
