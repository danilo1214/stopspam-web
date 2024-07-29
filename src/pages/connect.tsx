import { useSession } from "next-auth/react";
import { AccountList } from "~/components/accounts/AccountList";
import { AccessDenied } from "~/components/generic/AccessDenied";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";
import { api } from "~/utils/api";

export default function Connect() {
  const { data: subscription, isLoading: isSubscriptionLoading } =
    api.subscriptions.getCurrent.useQuery({});

  const { status } = useSession();

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

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
