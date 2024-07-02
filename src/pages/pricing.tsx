import { signIn, useSession } from "next-auth/react";
import PricingCard from "~/components/PricingCard";
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
        "Guaranteed 2 hour response times",
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
        "Weekend support",
      ],
    },
  ];

  const buyProduct = async (productId: string) => {
    const newWindow = window.open("about:blank", "_blank")!;
    if (!data?.user) {
      await signIn("google", { callbackUrl: "http://localhost:3000/pricing" });
      return;
    }
    paymentApi.mutate(
      { productId },
      { onSuccess: (data) => (newWindow.location.href = data) },
    );
  };

  return (
    <div className="w-ful flex flex-col items-center justify-center gap-x-5 gap-y-5 px-10 py-4 align-middle md:flex-row">
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
  );
}
