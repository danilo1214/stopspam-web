import { useEffect, useMemo, useState } from "react";
import Button from "../generic/Button";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { cards } from "~/const";
import { toast } from "react-toastify";
import classNames from "classnames";
import { Badge } from "~/components/generic/Badge";
import { Modal } from "../generic/Modal";

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
      const url = await paymentApi.mutateAsync({ productId, trialDays: 7 });
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
      setIsDeleteModalOpen(true);
    }
  };

  const handlePricingCardAction = async () => {
    await handlePlanChange();
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isLoading =
    isSubscriptionLoading || updateSubscription.isPending || isProrationLoading;

  const showDiscount = false;

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
      <Modal
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handlePricingCardAction}
        open={isDeleteModalOpen}
        title={buttonMap[buttonAction]}
        description={`This will ${buttonMap[buttonAction].toLocaleLowerCase()} your plan`}
      />
      <div
        className=" bg-[radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(128,0,128,0.80) 0%, rgba(75,0,160,0.60) 50%, rgba(72,61,139,0.40) 100%)]
 pointer-events-none absolute h-full w-full"
      ></div>

      <div className=" px-6 py-8 sm:p-10 sm:pb-6 dark:bg-gray-800">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full px-4  text-sm font-semibold uppercase leading-5 tracking-wide text-textPrimary-800 dark:text-white">
            {name}
          </span>
        </div>

        {buttonAction === BUTTON_ACTION.BUY && (
          <div className="ml-1 mt-4 text-center  text-lg font-semibold    text-textPrimary-900 ">
            7-day free trial
          </div>
        )}
        <div className="mt-4 flex flex-col items-center text-textPrimary-800 dark:text-white">
          {/* Discount badge */}
          {showDiscount && (
            <div className="mb-1 rounded-full bg-secondary-500 px-3 py-1 text-xs font-semibold text-white shadow">
              50% OFF for 3 months
            </div>
          )}

          {/* Price with strikethrough original */}
          <div className="flex items-end text-2xl font-bold leading-none">
            {showDiscount && (
              <span className="mr-2 text-textPrimary-500 line-through">
                ${price}
              </span>
            )}
            <span className="text-textPrimary-800">
              ${showDiscount ? Math.ceil(price * 0.5) : price}
            </span>
            <span className="ml-1 text-sm font-normal text-textPrimary-700 dark:text-textPrimary-300">
              / {type}
            </span>
          </div>

          {showDiscount && (
            <div className="mt-1 text-sm text-textPrimary-500 dark:text-textPrimary-400">
              First 3 months
            </div>
          )}
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
