interface ProjectLocalesItem {
  label: string;
  format: { date: string; time: string };
  ltr: boolean;
}

export type ProjectLocales = Record<string, ProjectLocalesItem>;
