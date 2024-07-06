import Link from "next/link";

export const CTABanner: React.FC = () => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-primary-800/70 to-secondary-800/70 px-4 py-5 text-textSecondary-100 shadow-md">
      <h2 className="text-2xl">Unlock Full Access to Insta Admin</h2>
      <p className="mb-1 mt-3 text-lg">
        Subscribe now to make the most out of our service.
      </p>
      <Link
        href="/pricing"
        className=" rounded-lg font-bold text-white transition duration-300 ease-in-out "
      >
        View Pricing Plans
      </Link>
    </div>
  );
};
