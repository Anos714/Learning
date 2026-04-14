export interface signupRes {
  success: boolean;
  message: string;
  user: {
    username: string;
    email: string;
    role: string;
    isUserVerified: boolean;
    twoFactorEnabled: boolean;
  };
}

export interface googleLoginRes {
  success: boolean;
  message: string;
  accessToken: string;
  user: {
    username: string;
    email: string;
    role: string;
    isUserVerified: boolean;
    twoFactorEnabled: boolean;
  };
}
