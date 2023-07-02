export interface NavItemProps {
  title: string;
  videoUrl: string;
  linkUrl: string;
  isButton?: boolean;
  action?: () => void;
}

export interface ApiGetItemResponse<T> {
  data: T;
}