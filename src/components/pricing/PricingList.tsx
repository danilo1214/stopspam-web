import PricingCard, {
  type TPricingCard,
} from "~/components/pricing/PricingCard";

export const PricingList = ({ cards }: { cards: TPricingCard[] }) => {
  return (
    <div>
      <h1 className="mb-6 mt-14 text-center text-3xl font-semibold text-textPrimary-900">
        Affordable pricing for your business
      </h1>

      <div className="flex w-full flex-col justify-center gap-x-10 gap-y-5 px-4 py-4 align-middle md:flex-row lg:px-10">
        {cards.map((item, key) => (
          <PricingCard
            key={key}
            rank={item.rank}
            type={item.type}
            name={item.name}
            benefits={item.benefits}
            price={item.price}
            productId={item.productId}
          />
        ))}
      </div>
    </div>
  );
};
