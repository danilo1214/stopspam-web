import { AccountList } from "~/components/accounts/AccountList";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";
import { api } from "~/utils/api";

export default function Connect() {
  const { data: subscription, isLoading: isSubscriptionLoading } =
    api.subscriptions.getCurrent.useQuery({});

  return (
    <main>
      {(!isSubscriptionLoading && !subscription) ||
        (subscription?.status === "cancelled" && (
          <div className="mx-10">
            <CTABanner />
          </div>
        ))}
      <AccountList />
    </main>
  );
}
