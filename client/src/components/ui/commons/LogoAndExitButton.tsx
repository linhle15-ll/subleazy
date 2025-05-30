import subleazy_logo from '@/public/subleazy_logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function LogoAndExitButton() {
  return (
    <div className="flex flex-col items-start gap-0">
      <div className="form-brand-logo">
        <Image src={subleazy_logo} alt="subleazy logo" />
      </div>
      <Link href="/" className="btn-secondary absolute top-6 right-6">
        Exit
      </Link>
    </div>
  );
}
