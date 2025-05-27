export const validateMedia = (data: string[]) => data.length >= 5;

export const validateTime = (data: string) => {
  if (!data) return true; // Time is optional

  const regex = /^(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  return regex.test(data);
};

export const validateAcademicEmail = async (
  email: string
): Promise<boolean> => {
  if (!email) return false;

  const res = await fetch('https://api.apyhub.com/validate/email/academic', {
    method: 'POST',
    headers: {
      'apy-token': process.env.ACADEMIC_EMAIL_API_TOKEN as string,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const { data }: { data: boolean } = await res.json();
  return data;
};
