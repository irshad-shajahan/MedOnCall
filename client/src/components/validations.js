/* eslint-disable import/prefer-default-export */

export const validatePhone = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};


export const isValidName=(name)=> {
  const regex = /^[a-zA-Z\s'-]+$/;
  return regex.test(name);
}

export const isValidEmail=(email)=> {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinimumLength = password.length >= 8;

  if (!hasUppercase) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!hasNumber) {
    return 'Password must contain at least one number';
  }

  if (!hasSpecialChar) {
    return 'Password must contain at least one special character';
  }

  if (!hasMinimumLength) {
    return 'Password must be at least 8 characters long';
  }

  return null;
}