export type TruckSortField = 'licensePlate' | 'brand' | 'model' | 'year' | 'createdAt';
export type TruckSortOrder = 'asc' | 'desc';

export type TruckSort = Partial<{
  field: TruckSortField;
  order: TruckSortOrder;
}>;
