import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { PricingList } from "~/components/pricing/PricingList";
import { cards } from "~/const";
import { authOptions } from "~/server/auth";
import { helpers } from "~/server/helpers";

export default function Pricing() {
  return (
    <div>
      <PricingList cards={cards} />
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
