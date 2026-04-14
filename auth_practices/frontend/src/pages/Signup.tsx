import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "../features/auth/schemas/auth.schema";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = (data: SignupInput) => {
    console.log(data);
    reset();
  };
  return (
    <div>
      <div></div>
      <div>
        <form onSubmit={handleSubmit(handleSignup)}>
          {/* username field */}
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register("username")} />
            {errors.username && (
              <p className="text-red-500 text-s">{errors.username.message}</p>
            )}
          </div>

          {/* email field */}
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-s">{errors.email.message}</p>
            )}
          </div>

          {/* password field */}
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-s">{errors.password.message}</p>
            )}
          </div>

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
