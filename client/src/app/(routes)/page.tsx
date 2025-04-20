import Image from 'next/image';
import bannerImage from '@/public/bannerImg.jpg';
import SearchFilterBar from '@/components/ui/searchFilterBar';

export const LandingPage = () => {
  return (
    <div className="flex flex-col gap-12 justify-center">
      <section className="flex flex-row justify-between bg-lightestOrange pl-12">
        {/* Left content */}
        <div className="flex flex-col justify-content gap-3 pt-15 sm:px-6 lg:px-8 max-w-2xl">
          <div className="font-semibold text-4xl">
            We make<span className="text-primaryOrange"> Sublease Eazy </span>!
          </div>

          <p className="text-lg">
            Find your next sublease in just a few clicks. <br />
            We make it easy to connect with the right subleasors <br /> and find
            the perfect place to stay.
          </p>
          <div className="absolute z-10 mt-50">
            <SearchFilterBar />
          </div>
        </div>

        {/* Right content */}
        <div>
          <Image
            src={bannerImage}
            alt="banner image"
            className="h-96 w-[35rem] object-cover opacity-90"
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-11">
        <div className="flex flex-col items-center font-medium text-4xl">
          <span>
            {' '}
            Discover a place of{' '}
            <span className="text-primaryOrange"> comfort </span>{' '}
          </span>
          <span className="italic"> Wherever you go </span>
        </div>

        <div className="flex flex-row gap-30 justify-between items-center">
          <button className="btn-secondary">
            <a href="/community">Join community</a>
          </button>

          <button className="btn-primary">
            <a href="/sublease-form">Match housemates</a>
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
