export interface SignupRes {
  success: boolean;
  message: string;
  user: {
    username: string;
    email: string;
    role: "user" | "admin";
    isUserVerified: boolean;
    twoFactorEnabled: boolean;
  };
}
