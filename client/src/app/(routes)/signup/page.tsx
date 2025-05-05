import '@/app/globals.css';
import { SignUpForm } from '@/components/layout/signup-form';
import Image from 'next/image';
import loginImg from '@/public/login_image.png';
export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            {/* <div className="flex items-center justify-center rounded-md bg-primary text-primary-foreground">
              <img src="/subleazy_logo.png" alt="Logo" className="h-8 w-36" />
            </div> */}
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-hidden lg:block">
        <Image
          src={loginImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
