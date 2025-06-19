import Link from 'next/link';

export default function ContractPage() {
  return (
    <div className="flex flex-col gap-10 lg:gap-20 text-base lg:mt-12 mt-8 w-full px-25">
      <div className="flex flex-col flex-wrap gap-6 lg:gap-3 justify-start items-start mb-6">
        <div className="text-3xl font-medium">
          Let us walk you through{' '}
          <span className="text-primaryOrange"> Contract Process! </span>
        </div>
        <div className="text-lg font-medium">
          We understand that contract process is a "sore", so let Subleazy make
          it easy for you.
        </div>
        <div className="text-base">
          As a <span className="font-medium"> sublessor </span>, you have the
          right to set up the contract before sending out to your sublessees.{' '}
          <br />
          Start this process by choosing which way do you like to proceed with
          your contract setup.
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="text-2xl items-center font-semibold mb-5">
          Start your contract process with:
        </div>
        {/* Options */}
        <div className="flex lg:flex-row flex-col lg:gap-20 gap-5 justify-center align-middle items-center">
          <button className="btn-primary">
            <Link href="/contract/edit">Contract template</Link>
          </button>

          <button className="btn-primary">
            <Link href="/contract/scan">Scan your contract</Link>
          </button>

          <button className="btn-primary">
            <Link href="/contract/edit">Write your contract</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
