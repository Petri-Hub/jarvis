export type ValidationErrorItem = {
  pointer: string;
  detail: string;
};

export type ErrorResponseData = {
  code: string;
  title: string;
  description: string;
  status: number;
  metadata?: object;
  errors?: ValidationErrorItem[];
};
