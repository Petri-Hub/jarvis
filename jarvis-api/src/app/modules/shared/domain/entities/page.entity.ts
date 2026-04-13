export type PageNavigation = {
  hasNext: boolean;
  hasPrevious: boolean;
};

export type PageTotals = {
  items: number;
  pages: number;
};

export type Page<T> = {
  content: T[];
  current: number;
  size: number;
  navigation: PageNavigation;
  totals: PageTotals;
};
