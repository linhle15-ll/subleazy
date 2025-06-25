export function checkPasswordStrength(password: string) {
  const isLongEnough = password?.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);

  if (
    !isLongEnough ||
    !hasLowerCase ||
    !hasUpperCase ||
    !hasNumber ||
    !hasSpecialChar
  ) {
    return 'Password must be at least 8 characters long, contains at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.';
  }
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
) {
  if (password !== confirmPassword) {
    return 'Passwords must match.';
  }
}
