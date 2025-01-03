export const validateFields = (fields) => {
  const errors = {};

  for (const field of fields) {
    const { name, value, minLength, required } = field;

    if (required && !value.trim()) {
      errors[name] = `${name} is required.`;
    } else if (minLength && value.trim().length < minLength) {
      errors[name] = `${name} must be at least ${minLength} characters long.`;
    }
  }

  return errors;
};
