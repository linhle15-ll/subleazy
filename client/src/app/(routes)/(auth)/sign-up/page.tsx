import '@/app/globals.css';
import AuthForm from '../auth-form';
import Image from 'next/image';
import authenImg from '@/public/authenImg.jpg';
import RedirectIfAuthenticated from '@/components/auth/redirect-if-auth';

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <RedirectIfAuthenticated />
      {/* Left: Form */}
      <div className="flex items-center justify-center bg-white px-4 py-8">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
      {/* Right: Image */}
      <div className="relative hidden lg:block">
        <Image
          alt="Sign in image"
          src={authenImg}
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </div>
  );
}
