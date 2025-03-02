import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { assertString } from "../utils/asserts";
import { fetchLogin } from "../states/login/loginSlice";

interface LoginPageProps {
  loginSuccess: (token: string) => void;
}

function LoginPage({ loginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { token, status } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (status === "succeeded") {
      assertString(token);
      loginSuccess(token);
      setEmail("");
      setPassword("");
    }
  }, [dispatch, token, loginSuccess, status]);

  const onEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(event.target.value);
  };

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchLogin({ email, password }));
  };

  return (
    <main className="flex flex-1 p-4 justify-center items-center">
      <form
        onSubmit={onLogin}
        className="max-w-md w-full bg-white p-6 rounded-lg border-2 border-gray-300"
      >
        <h1 className="text-base/7 font-semibold text-gray-900">Login</h1>
        <div className="sm:col-span-4 mt-4">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onEmailChangeHandler}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-4 mt-4">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onPasswordChangeHandler}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="Password"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
        <div className="mt-2 flex justify-end">
          <p>
            Didn't have account?{" "}
            <Link className="text-indigo-600" to="/register">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

export default LoginPage;
