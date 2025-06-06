import Image from 'next/image';
import logo from '@/public/subleazy_logo.png';
import {
  DropdownUser,
  DropdownHeader,
} from '@/components/ui/dropdown/dropdown-menu';

export default function Header() {
  return (
    <div className="bg-white py-3">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="/home">
              <span className="sr-only">Home</span>
              <Image
                src={logo}
                alt="Subleazy Logo"
                className="h-7 w-auto"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="navbar-text" href="/about">
                    About
                  </a>
                </li>

                <li>
                  <a className="navbar-text" href="/home">
                    Home
                  </a>
                </li>

                <li>
                  <a className="navbar-text" href="/community">
                    Community
                  </a>
                </li>

                <li>
                  <a className="btn-primary" href="/sublease">
                    Sublease your space
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex flex-row items-center gap-4">
              {/* Dropdown Menu for Small Screens */}
              <div className="block md:hidden">
                <DropdownHeader />
              </div>

              <DropdownUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
