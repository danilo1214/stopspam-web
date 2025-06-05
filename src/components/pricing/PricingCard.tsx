import { useEffect, useMemo, useState } from "react";
import Button from "../generic/Button";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { cards } from "~/const";
import { toast } from "react-toastify";
import classNames from "classnames";
import { Badge } from "~/components/generic/Badge";

export type TPricingCard = {
  type: string;
  price: number;
  name: string;
  rank: number;
  productId: string;
  benefits: string[];
};

export interface PricingCardProps {
  type: string;
  rank: number;
  price: number;
  name: string;
  productId: string;
  benefits: string[];
}

enum BUTTON_ACTION {
  BUY = "BUY",
  DOWNGRADE = "DOWNGRADE",
  UPGRADE = "UPGRADE",
  STAY = "STAY",
}

const buttonMap = {
  [BUTTON_ACTION.STAY]: "",
  [BUTTON_ACTION.BUY]: "Buy Now",
  [BUTTON_ACTION.UPGRADE]: "Upgrade",
  [BUTTON_ACTION.DOWNGRADE]: "Downgrade",
};

export default function PricingCard({
  type,
  price,
  name,
  benefits,
  productId,
  rank,
}: PricingCardProps) {
  const { data } = useSession();

  const [url, setUrl] = useState("");

  const utils = api.useUtils();
  const paymentApi = api.payments.checkout.useMutation();
  const { data: subscription, isLoading: isSubscriptionLoading } =
    api.subscriptions.getCurrent.useQuery({});
  const { data: proration, isLoading: isProrationLoading } =
    api.subscriptions.getProrationPreview.useQuery(
      { newPriceId: productId },
      {
        enabled: !!subscription && subscription.productId !== productId,
      },
    );

  const matchingRank = subscription?.productId
    ? cards.find((c) => c.productId === subscription.productId)
    : null;

  const buttonAction = useMemo(() => {
    if (!matchingRank) {
      return BUTTON_ACTION.BUY;
    }

    if (matchingRank.rank > rank) {
      return BUTTON_ACTION.DOWNGRADE;
    }

    if (matchingRank.rank === rank) {
      return BUTTON_ACTION.STAY;
    }

    return BUTTON_ACTION.UPGRADE;
  }, [matchingRank, rank]);

  const updateSubscription =
    api.subscriptions.changeSubscriptionProduct.useMutation();

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await paymentApi.mutateAsync({ productId });
      setUrl(url);
    };

    void fetchUrl();
  }, []);

  const handlePaymentClick = async () => {
    if (!data?.user) {
      await signIn("facebook", {
        callbackUrl: "http://localhost:3000/pricing",
      });
      return;
    }

    window.open(url);
  };

  const handlePlanChange = async () => {
    try {
      await updateSubscription.mutateAsync({ newPriceId: productId });
      setTimeout(() => {
        void utils.subscriptions.getCurrent.invalidate();
        toast("Successfully changed subscription plan");
      }, 2000);
    } catch (err) {
      toast("Failed to change subscription");
    }
  };

  const handleButtonClick = async () => {
    if (buttonAction === BUTTON_ACTION.BUY) {
      await handlePaymentClick();
    } else {
      await handlePlanChange();
    }
  };

  const color = useMemo(() => {
    if (buttonAction === BUTTON_ACTION.DOWNGRADE) {
      return "bg-secondary-600 hover:bg-secondary-400";
    } else if (buttonAction === BUTTON_ACTION.UPGRADE) {
      return "bg-tertiary-600 hover:bg-tertiary-400";
    } else {
      return "bg-primary-600 hover:bg-primary-400";
    }
  }, [buttonAction]);

  const isLoading =
    isSubscriptionLoading || updateSubscription.isPending || isProrationLoading;

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
      <div className="flex w-full flex-col items-center justify-center align-middle">
        {buttonAction === BUTTON_ACTION.STAY && (
          <Badge className="bg-primary-600 px-4 py-2" label="Current Plan" />
        )}

        {(!subscription || subscription.productId !== productId) && (
          <Button
            disabled={isLoading}
            onClick={handleButtonClick}
            label={buttonMap[buttonAction]}
            className={classNames(
              "py- mx-10 flex w-[60%] items-center justify-center rounded-md border border-transparent  px-5 text-base font-medium text-white  shadow-lg transition duration-150 ease-in-out hover:bg-primary-500 focus:outline-none",
              color,
            )}
          ></Button>
        )}
        {buttonAction === BUTTON_ACTION.UPGRADE && proration && (
          <div className="mt-2 text-sm text-gray-600">
            You’ll be charged{" "}
            <span className="font-semibold">
              ${(proration.amountDue / 100).toFixed(2)}{" "}
              {proration.currency.toUpperCase()}
            </span>{" "}
            immediately.
          </div>
        )}
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
