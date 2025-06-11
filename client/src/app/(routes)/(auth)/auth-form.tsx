'use client';
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import {
  checkPasswordStrength,
  validateConfirmPassword,
} from '@/lib/utils/auth-validator';
import { useUserStore } from '@/lib/stores/user.store';
import api from '@/services/api';

export default function AuthForm() {
  const pathname = usePathname();
  const isSignUp = pathname === '/sign-up';

  const router = useRouter();

  const { setUser, setAccessToken } = useUserStore();

  const [authForm, setAuthForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateAuthForm = (field: keyof typeof authForm, value: string) => {
    setAuthForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordBlur = () => {
    if (!isSignUp) return;
    setPasswordError(checkPasswordStrength(authForm.password) ?? null);
    if (!passwordError && !confirmPasswordError) setError(null);
  };

  const handleConfirmPasswordBlur = () => {
    if (!isSignUp) return;
    setConfirmPasswordError(
      validateConfirmPassword(authForm.password, authForm.confirmPassword) ??
        null
    );
    if (!passwordError && !confirmPasswordError) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (passwordError || confirmPasswordError) {
      setError('Please fix the errors before submitting.');
      return;
    }

    try {
      const url = isSignUp ? 'auth/signup' : 'auth/signin';
      const res = await api.post(url, authForm);

      const data = res.data;
      if (!isSignUp) {
        setAccessToken(data.accessToken);
        setUser(data.user);

        router.push('/home');
      } else {
        router.push('/sign-in');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;

      const message =
        axiosError.response?.data?.error ||
        'An error occurred. Please try again.';

      setError(message);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 justify-start"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-2 text-left mb-5">
          <h1 className="text-3xl font-medium">
            {isSignUp ? "Let's get started!" : 'Welcome back!'}
          </h1>
          <p className="text-balance font-medium text-sm text-muted-foreground">
            {isSignUp
              ? 'Sign up with your school email to get started.'
              : 'Sign in with your school email to access your account.'}
          </p>
        </div>
        <div className="grid gap-3">
          {isSignUp && (
            <div className="grid gap-1">
              <label className="font-medium"> First name </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                value={authForm.firstName}
                onChange={(e) => updateAuthForm('firstName', e.target.value)}
                required
                className="auth-input-field"
              />
            </div>
          )}
          {isSignUp && (
            <div className="grid gap-1">
              <label className="font-medium">Last name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={authForm.lastName}
                onChange={(e) => updateAuthForm('lastName', e.target.value)}
                required
                className="auth-input-field"
              />
            </div>
          )}
        </div>

        <div className="grid gap-1">
          <label className="font-medium">Academic email address</label>
          <input
            id="email"
            type="email"
            placeholder="jdoe@college.edu"
            value={authForm.email}
            onChange={(e) => updateAuthForm('email', e.target.value)}
            required
            className="auth-input-field"
          />
        </div>

        <div className="grid gap-1">
          <label className="font-medium">
            {' '}
            {isSignUp ? 'New password' : 'Password'}{' '}
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={authForm.password}
              onChange={(e) => updateAuthForm('password', e.target.value)}
              onBlur={() => [handlePasswordBlur(), handleConfirmPasswordBlur()]}
              required
              className="auth-input-field w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1 text-gray-600 hover:text-gray-900 pl-10"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {passwordError && (
          <p className="text-sm text-red-500 whitespace-pre-wrap">
            {passwordError}
          </p>
        )}

        {isSignUp && (
          <div className="grid gap-1">
            <label className="font-medium">Confirm new password</label>
            <div className="relative w-full">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={authForm.confirmPassword}
                onChange={(e) =>
                  updateAuthForm('confirmPassword', e.target.value)
                }
                onBlur={() => handleConfirmPasswordBlur()}
                required
                className="auth-input-field w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
                className="absolute right-3 top-1 text-gray-600 hover:text-gray-900 pl-10"
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
        )}

        {confirmPasswordError && (
          <p className="text-sm text-red-500 whitespace-pre-wrap">
            {confirmPasswordError}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500 whitespace-pre-wrap">{error}</p>
        )}

        <button type="submit" className="btn-primary">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-lightGray" />
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <div className="text-center text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <a
            href={isSignUp ? '/sign-in' : '/sign-up'}
            className="ml-2 underline underline-offset-4 hover:text-primaryOrange"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </a>
        </div>
      </form>
    </div>
  );
}
