import { ModelActions } from '../types';
import { ModelNames } from '@model';

export const useUserActions = (
  model: ModelNames | undefined
): { actions: ModelActions } => {
  // TODO
  // Nedělat to teď podle modelu, ale podle typu modelu - rozdělit ty modely do skupiny - [system, settings, company, content, ...]

  if (model) console.log('actions by model', model);

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
