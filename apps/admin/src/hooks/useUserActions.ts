import { ModelActions } from '../types';

export const useUserActions = (): { actions: ModelActions } => {
  // TODO
  // Nedělat to teď podle modelu, ale podle typu modelu - rozdělit ty modely do skupiny - [system, settings, company, content, ...]

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
