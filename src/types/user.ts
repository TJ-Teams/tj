export type RegisterDto = {
  first_name: string;
  second_name: string;
  email: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type AuthResponseDto = {
  access_token: string;
};

export type UserInfoDto = {
  first_name: string;
  second_name: string;
  email: string;
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
};
