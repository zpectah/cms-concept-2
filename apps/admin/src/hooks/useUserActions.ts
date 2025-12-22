import { useEffect } from 'react';
import {
  entitiesModelKeysArray,
  feedbackModelKeysArray,
  organizationModelKeysArray,
  redactionModelKeysArray,
  systemModelKeysArray,
  ModelNames,
} from '@model';
import { ModelActions } from '../types';

export const useUserActions = (
  model: ModelNames | undefined
): { actions: ModelActions } => {
  // TODO
  // Nedělat to teď podle modelu, ale podle typu modelu - rozdělit ty modely do skupiny - [system, settings, company, content, ...]

  const accessTypes = {
    redaction: redactionModelKeysArray, // redactor
    organization: organizationModelKeysArray, // manager
    feedback: feedbackModelKeysArray, // manager
    entities: entitiesModelKeysArray, // admin
    system: systemModelKeysArray, // super admin
  };

  useEffect(() => {
    if (model) console.log('actions by model', model);
    console.log('accessTypes', accessTypes);
  }, []);

  return {
    actions: {
      view: true,
      create: true,
      modify: true,
      delete: true,
      deletePermanent: true,
      approve: true,
    },
  };
};
