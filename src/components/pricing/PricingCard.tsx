import Button from "../generic/Button";

export type TPricingCard = {
  type: string;
  price: number;
  name: string;
  productId: string;
  benefits: string[];
};

export interface PricingCardProps {
  type: string;
  price: number;
  name: string;
  productId: string;
  benefits: string[];
  onClick: () => void;
}

export default function PricingCard({
  type,
  price,
  name,
  benefits,
  onClick,
}: PricingCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
      <div
        className=" bg-[radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(128,0,128,0.80) 0%, rgba(75,0,160,0.60) 50%, rgba(72,61,139,0.40) 100%)]
 pointer-events-none absolute h-full w-full"
      ></div>

      <div className=" px-6 py-8 sm:p-10 sm:pb-6 dark:bg-gray-800">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full px-4 py-1 text-sm font-semibold uppercase leading-5 tracking-wide text-textPrimary-800 dark:text-white">
            {name}
          </span>
        </div>
        <div className="mt-4 flex justify-center text-3xl  leading-none text-textPrimary-900 dark:text-white">
          ${price}
          <span className="ml-1  pt-0.5 text-sm  leading-8 text-textPrimary-800 ">
            per {type}
          </span>
        </div>
      </div>
      <div className="flex w-full justify-center align-middle">
        <Button
          onClick={onClick}
          label="Buy now"
          className="py- mx-10 flex w-[60%] items-center justify-center rounded-md border border-transparent bg-primary-600 px-5 text-base font-medium text-white  shadow-lg transition duration-150 ease-in-out hover:bg-primary-500 focus:outline-none"
        ></Button>
      </div>
      <div className="mt-3 bg-white px-6 pb-8 pt-6 sm:p-10 sm:pt-6 dark:bg-gray-800">
        <ul>
          {benefits.map((benefit, key) => (
            <li className="mt-4 flex items-start" key={key}>
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-secondary-800"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="ml-3 text-base leading-6 text-textPrimary-700 dark:text-textPrimary-200">
                {benefit}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
