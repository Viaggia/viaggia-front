export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ValidateTokenRequestDTO {
  token: string;
}

export interface ResetPasswordRequestDTO {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
