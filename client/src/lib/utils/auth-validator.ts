export function checkPasswordStrength (password: string) {
  const error: string[] = [];

  if (password.length < 8) {
    error.push('Password must be at least 8 characters long.');
  }

  if (!/[a-z]/.test(password)) {
    error.push('Password must contain at least one lowercase letter.');
  }

  if (!/[A-Z]/.test(password)) {
    error.push('Password must contain at least one uppercase letter.');
  }

  if (!/[0-9]/.test(password)) {
    error.push('Password must contain at least one number.');
  }

  if (!/[@$!%*?&]/.test(password)) {
    error.push('Password must contain at least one special character.');
  }

  return error;
};

export function validateConfirmPassword (
  password: string,
  confirmPassword: string
) {
  if (password != confirmPassword) {
    return 'Passwords must match.';
  }
};
