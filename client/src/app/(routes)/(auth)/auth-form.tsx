'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  checkPasswordStrength,
  validateConfirmPassword,
} from '@/lib/utils/auth-validator';
import { useUserStore } from '@/lib/stores/user.store';
import { AuthFormStore } from '@/lib/stores/user.store';

export default function AuthForm() {
  const pathname = usePathname();
  const isSignUp = pathname === '/sign-up';

  const router = useRouter();

  const {
    authForm,
    updateAuthForm,
    resetAuthForm,
    setAccessToken,
  } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignUp) {
      setError(null);
      return;
    }

    if (authForm.password.length > 0) {
      const passwordError = checkPasswordStrength(authForm.password);
      if (passwordError.length > 0) {
        setError(passwordError.join('\n'));
        return;
      }
    }

    if (authForm.confirmPassword.length > 0) {
      const confirmPasswordError = validateConfirmPassword(
        authForm.password,
        authForm.confirmPassword
      );

      if (confirmPasswordError) {
        setError(confirmPasswordError);
        return;
      }
    }

    setError(null);
  }, [isSignUp, authForm.password, authForm.confirmPassword]);

  const handleSubmit = async (e: React.FormEvent, formData: AuthFormStore) => {
    e.preventDefault();
    setError(null);

    try {
      const url = isSignUp
        ? 'http://localhost:5001/api/auth/signup'
        : 'http://localhost:5001/api/auth/signin';

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Redirect to dashboard or home page (?) on successful sign up/sign in
      // After implementing sending email verification link, successful sign up should redirect to sign in page
      if (res.ok) {
        setAccessToken(data.accessToken);
        resetAuthForm();
        router.push('/');

        return;
      } else {
        setError(data?.error || 'An error occurred. Please try again.');
        return;
      }

    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 justify-start"
        onSubmit={(e) => handleSubmit(e, authForm)}
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
                className="input-field"
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
                className="input-field"
              />
            </div>
          )}
        </div>

        {isSignUp && (
          <div className="grid gap-1">
            {/* <Label htmlFor="institution">Institution Full Name</Label> */}
            <label className="font-medium">Institution Full Name</label>
            <input
              id="institution"
              type="text"
              placeholder="University of California, Berkeley"
              value={authForm.institution}
              onChange={(e) => updateAuthForm('institution', e.target.value)}
              required
              className="input-field"
            />
          </div>
        )}

        <div className="grid gap-1">
          <label className="font-medium">Academic email address</label>
          <input
            id="email"
            type="email"
            placeholder="jdoe@college.edu"
            value={authForm.email}
            onChange={(e) => updateAuthForm('email', e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="grid gap-1">
          <label className="font-medium">
            {' '}
            {isSignUp ? 'New password' : 'Password'}{' '}
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={authForm.password}
            onChange={(e) => updateAuthForm('password', e.target.value)}
            required
            className="input-field"
          />
        </div>

        {isSignUp && (
          <div className="grid gap-1">
            <label className="font-medium">Confirm new password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={authForm.confirmPassword}
              onChange={(e) =>
                updateAuthForm('confirmPassword', e.target.value)
              }
              required
              className="input-field"
            />
          </div>
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
