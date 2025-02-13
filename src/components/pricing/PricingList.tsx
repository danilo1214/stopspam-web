import { signIn, useSession } from "next-auth/react";
import PricingCard, {
  type TPricingCard,
} from "~/components/pricing/PricingCard";
import { api } from "~/utils/api";

export const PricingList = ({ cards }: { cards: TPricingCard[] }) => {
  const { data } = useSession();
  const paymentApi = api.payments.checkout.useMutation();

  const buyProduct = async (productId: string) => {
    if (!data?.user) {
      await signIn("facebook", {
        callbackUrl: "http://localhost:3000/pricing",
      });
      return;
    }

    const newWindow = window.open("about:blank", "_blank")!;
    const url = await paymentApi.mutateAsync({ productId });
    newWindow.location.href = url;
  };

  return (
    <div>
      <h1 className="mb-6 mt-14 text-center text-3xl font-semibold text-textPrimary-900">
        Affordable pricing for your business
      </h1>

      <div className="flex w-full flex-col justify-center gap-x-10 gap-y-5 px-4 py-4 align-middle md:flex-row lg:px-10">
        {cards.map((item, key) => (
          <PricingCard
            key={key}
            type={item.type}
            name={item.name}
            benefits={item.benefits}
            price={item.price}
            productId={item.productId}
            onClick={() => buyProduct(item.productId)}
          />
        ))}
      </div>
    </div>
  );
};
