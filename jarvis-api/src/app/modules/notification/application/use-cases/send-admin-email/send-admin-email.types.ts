export type SendAdminEmailCommand = {
  subject: string;
  body: string;
};

export type SendAdminEmailResult = {
  success: boolean;
};
