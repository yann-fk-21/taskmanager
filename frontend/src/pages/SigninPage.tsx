import React, { useState } from 'react';
import { toast } from '../../app/components/ui/toast';
import type { UserCredentials } from '../types/types';

import logo from '../assets/logo.png';
import { Button } from '../../app/components/ui/button';
import { PiEyeSlashThin } from 'react-icons/pi';
import { LiaEyeSolid } from 'react-icons/lia';
import type { ErrorForm } from '../types/types-ui';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { saveTokenInLocalStorage } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValidity: ErrorForm = checkInputValidity();

    if (inputValidity.status === false) {
      inputValidity.message.usernameMessage &&
        toast.add({
          title: inputValidity.message.usernameMessage,
          type: 'error',
        });
      inputValidity.message.emailMessage &&
        toast.add({ title: inputValidity.message.emailMessage, type: 'error' });
      inputValidity.message.passwordMessage &&
        toast.add({
          title: inputValidity.message.passwordMessage,
          type: 'error',
        });
      return;
    }

    setIsSubmitting(true);

    const userCredentials: UserCredentials = {
      username,
      password,
    };

    const response = await loginUser(userCredentials);
    if (!response.ok) {
      toast.add({
        title: 'Login failed. Please check your credentials and try again.',
        type: 'error',
      });
      setIsSubmitting(false);
    } else {
      toast.add({
        title: 'Login successful!',
        type: 'success',
      });
      const data = await response.json();
      saveTokenInLocalStorage(data.token);
      // console.log('Login response data:', data);
      navigate('/my-tasks');
    }
    setIsSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const checkInputValidity = (): ErrorForm => {
    const usernameOk = username.trim().length >= 3;
    const passwordOk = password.length >= 6;

    setIsUsernameValid(usernameOk);
    setIsPasswordValid(passwordOk);

    const errorForm: ErrorForm = {
      status: true,
      message: {},
    };

    if (!usernameOk || !passwordOk) {
      errorForm.status = false;
      errorForm.message.usernameMessage = usernameOk
        ? ''
        : 'Username must be at least 3 characters long.';
      errorForm.message.passwordMessage = passwordOk
        ? ''
        : 'Password must be at least 6 characters long.';
      return errorForm;
    }

    return errorForm;
  };
  return (
    <React.Fragment>
      <div className="absolute -left-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(74,222,128,0.55),_rgba(34,197,94,0.24),_transparent_72%)] blur-3xl" />
      <div className="absolute -right-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(74,222,128,0.55),_rgba(34,197,94,0.24),_transparent_72%)] blur-3xl" />
      <div className="flex flex-col justify-start items-center h-screen py-12">
        <div>
          <a href="/">
            <img src={logo} alt="Logo" className="h-12" />
          </a>
        </div>

        <div className="space-y-2 mt-6">
          <h2 className="text-4xl font-bold text-center">Welcome Back.</h2>
          <p className="text-center text-lg">
            New to Task Manager?{' '}
            <Link to="/signup" className="underline font-bold">
              Sign up
            </Link>
          </p>
        </div>

        <form
          onSubmit={loginHandler}
          className="flex flex-col gap-4 mt-4 md:w-2/5"
        >
          <div>
            <label htmlFor="username" className="text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 text-sm text-semibold rounded-xl bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <LiaEyeSolid className="pointer-events-none" />
                ) : (
                  <PiEyeSlashThin className="pointer-events-none" />
                )}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full px-6 pr-12 py-2 text-sm text-semibold rounded-xl bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full py-5 px-6 ${isSubmitting ? 'bg-black/50' : 'bg-black'} font-bold text-white rounded-xl`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SigninPage;
