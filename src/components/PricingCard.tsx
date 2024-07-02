import { MouseEventHandler } from "react";
import Button from "./generic/Button";

export interface PricingCardProps {
  type: string;
  price: number;
  name: string;
  checkoutId: string;
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
    <div className="overflow-hidden rounded-lg shadow-lg">
      <div className="bg-white px-6 py-8 sm:p-10 sm:pb-6 dark:bg-gray-800">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full px-4 py-1 text-sm font-semibold uppercase leading-5 tracking-wide dark:text-white">
            {name}
          </span>
        </div>
        <div className="mt-4 flex justify-center text-6xl font-extrabold leading-none dark:text-white">
          ${price}
          <span className="ml-1 pt-8 text-2xl font-medium leading-8 text-gray-500 dark:text-gray-400">
            /{type}
          </span>
        </div>
      </div>
      <div className="flex w-full justify-center align-middle">
        <Button
          onClick={onClick}
          label="Buy now"
          className="focus:shadow-outline flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-sky-500 focus:outline-none"
        ></Button>
      </div>
      <div className="mt-5 bg-white px-6 pb-8 pt-6 sm:p-10 sm:pt-6 dark:bg-gray-800">
        <ul>
          {benefits.map((benefit, key) => (
            <li className="mt-4 flex items-start" key={key}>
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-teal-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                {benefit}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
