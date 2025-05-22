export const validateMedia = (data: string[]) => data.length >= 5;

export const validateTime = (data: string) => {
  if (!data) return true; // Time is optional

  const regex = /^(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  return regex.test(data);
};
