import { Request, Response } from 'express';

export const handleLogOut = async (
  req: Request,
  res: Response
): Promise<void> => {
  // On client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(204); // No content
    return;
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    //secure: true, // Uncomment in production to send only over HTTPS
    //sameSite: [Options] // Consider based on app's needs
  });
  res.status(200).json({ message: 'Logged out successfully' });
  return;
};
