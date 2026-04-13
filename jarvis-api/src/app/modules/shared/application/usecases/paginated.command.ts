export type OffsetPaginatedCommand = {
  page: number;
  size: number;
};

export type CursorPaginatedCommand = {
  cursor: string;
  size: number;
};
