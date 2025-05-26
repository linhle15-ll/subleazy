'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  checkPasswordStrength,
  validateConfirmPassword,
} from '@/lib/utils/authValidation';

import { useUserStore } from '@/lib/stores/user.store';
import { handleAuthenFormChange } from '@/lib/stores/user.store';

export default function AuthForm() {
  const pathname = usePathname();
  const isSignUp = pathname === '/sign-up';

  const { authenFormData } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const passwordError = checkPasswordStrength(authenFormData.password);
    const confirmPasswordError = validateConfirmPassword(
      authenFormData.password,
      authenFormData.confirmPassword
    );
    if (authenFormData.password.length > 0) {
      setError(passwordError.join('\n'));
      if (authenFormData.confirmPassword.length > 0 && confirmPasswordError) {
        setError(confirmPasswordError);
      } else {
        setError(null);
      }
    }
  }, [authenFormData.password, authenFormData.confirmPassword]);

  return (
    <div>
      <form
        className="flex flex-col gap-4 justify-start"
        onSubmit={(e) => {
          if (error) {
            e.preventDefault();
            return;
          }
        }}
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
                value={authenFormData.firstName}
                onChange={(e) =>
                  handleAuthenFormChange('firstName', e.target.value)
                }
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
                value={authenFormData.lastName}
                onChange={(e) =>
                  handleAuthenFormChange('lastName', e.target.value)
                }
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
              id="firstName"
              type="text"
              placeholder="University of California, Berkeley"
              value={authenFormData.institution}
              onChange={(e) =>
                handleAuthenFormChange('institution', e.target.value)
              }
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
            placeholder="jdoe@edu.com"
            value={authenFormData.email}
            onChange={(e) => handleAuthenFormChange('email', e.target.value)}
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
            value={authenFormData.password}
            onChange={(e) => handleAuthenFormChange('password', e.target.value)}
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
              value={authenFormData.confirmPassword}
              onChange={(e) =>
                handleAuthenFormChange('confirmPassword', e.target.value)
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
          {isSignUp ? 'Already have an account' : "Don't have an account?"}
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
