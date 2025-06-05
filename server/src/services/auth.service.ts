import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authService = {
  generateAccessToken: (userId: string, userEmail: string): string => {
    const accessToken = jwt.sign(
      { id: userId, email: userEmail },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '30m' }
    );
    return accessToken;
  },

  generateRefreshToken: (userId: string, userEmail: string): string => {
    const refreshToken = jwt.sign(
      { id: userId, email: userEmail },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );
    return refreshToken;
  },

  hashPassword: async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  },

  comparePassword: async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // validateAcademicEmail: async (email: string): Promise<boolean> => {
  //   if (!email) return false;
  //   const res = await fetch('https://api.apyhub.com/validate/email/academic', {
  //     method: 'POST',
  //     headers: {
  //       'apy-token': process.env.ACADEMIC_EMAIL_API_TOKEN as string,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email }),
  //   });

  //   const { data }: { data: boolean } = await res.json();
  //   return data;
  // },
  validateAcademicEmail: async (email: string): Promise<boolean> => {
    if (!email) return false;
    return email.toLowerCase().endsWith('.edu');
  },
};

export default authService;
