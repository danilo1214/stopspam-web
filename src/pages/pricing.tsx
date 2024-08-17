import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import PricingCard from "~/components/pricing/PricingCard";
import { authOptions } from "~/server/auth";
import { helpers } from "~/server/helpers";
import { api } from "~/utils/api";

export default function Pricing() {
  const { data } = useSession();
  const paymentApi = api.payments.checkout.useMutation();

  const cards = [
    {
      name: "Standard Plan",
      price: 7.99,
      type: "month",
      checkoutId: "436646",
      benefits: [
        "AI comments",
        "Guaranteed 1 hour response times",
        "Multi language support",
      ],
    },

    {
      name: "Pro Plan",
      price: 9.99,
      type: "month",
      checkoutId: "436647",
      benefits: [
        "AI comments",
        "Guaranteed 4 hour response times",
        "Multi language support",
      ],
    },
  ];

  const buyProduct = async (productId: string) => {
    if (!data?.user) {
      await signIn("facebook", {
        callbackUrl: "http://localhost:3000/pricing",
      });
      return;
    }

    const newWindow = window.open("about:blank", "_blank")!;
    paymentApi.mutate(
      { productId },
      { onSuccess: (data) => (newWindow.location.href = data) },
    );
  };

  return (
    <div>
      <h1 className="mb-10 mt-14 text-center text-3xl font-semibold">
        Affordable pricing for all businesses.
      </h1>
      <div className="flex w-full flex-col justify-center gap-x-10 gap-y-5 px-16 py-4 align-middle md:flex-row lg:px-10">
        {cards.map((item, key) => (
          <PricingCard
            key={key}
            type={item.type}
            name={item.name}
            benefits={item.benefits}
            price={item.price}
            checkoutId={item.checkoutId}
            onClick={() => buyProduct(item.checkoutId)}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
