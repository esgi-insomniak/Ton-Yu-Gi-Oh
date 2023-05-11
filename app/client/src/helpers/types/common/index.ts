export interface NavItemProps {
  title: string;
  videoUrl: string;
  linkUrl: string;
}

export interface ApiGetItemResponse<T> {
  data: T;
}