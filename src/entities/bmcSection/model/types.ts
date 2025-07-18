export type IconName = 'user' | 'diamond' | 'truck' | 'hand' | 'database' | 'chat' | 'link' | 'card' | 'dollar' | 'map';

export interface BmcSectionInfo {
  id: string;
  icon: IconName;
  title: string;
  step: string;
  description: string;
}

export interface BmcNavItemProps extends BmcSectionInfo {
  isActive: boolean;
  isCompleted: boolean;
}