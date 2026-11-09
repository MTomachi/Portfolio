import type { Project } from './validate-content';

export const statusLabels: Record<Project['status'], string> = {
  unconfirmed: 'Status unconfirmed',
  'in-progress': 'In progress',
  unfinished: 'Unfinished',
  complete: 'Complete',
};
